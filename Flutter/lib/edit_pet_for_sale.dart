import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:dio/dio.dart';
import 'package:petcareapp/api_config.dart';

class EditPetForSale extends StatefulWidget {
  final Map pet;

  const EditPetForSale({super.key, required this.pet});

  @override
  State<EditPetForSale> createState() => _EditPetForSaleState();
}

class _EditPetForSaleState extends State<EditPetForSale> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController nameCtrl;
  late TextEditingController breedCtrl;
  late TextEditingController ageCtrl;
  late TextEditingController priceCtrl;

  File? mobileImage;
  Uint8List? webImageBytes;

  @override
  void initState() {
    super.initState();
    nameCtrl = TextEditingController(text: widget.pet["name"]);
    breedCtrl = TextEditingController(text: widget.pet["breed"]);
    ageCtrl = TextEditingController(text: widget.pet["age"] ?? "");
    priceCtrl =
        TextEditingController(text: widget.pet["price"].toString());
  }

  Future<void> pickImage() async {
    final picked =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (picked == null) return;

    if (kIsWeb) {
      webImageBytes = await picked.readAsBytes();
    } else {
      mobileImage = File(picked.path);
    }
    setState(() {});
  }

  Future<void> updatePet() async {
    if (!_formKey.currentState!.validate()) return;

    final formData = FormData.fromMap({
      "name": nameCtrl.text.trim(),
      "breed": breedCtrl.text.trim(),
      "age": ageCtrl.text.trim(),
      "price": priceCtrl.text.trim(),
      if (!kIsWeb && mobileImage != null)
        "image": await MultipartFile.fromFile(mobileImage!.path),
      if (kIsWeb && webImageBytes != null)
        "image":
            MultipartFile.fromBytes(webImageBytes!, filename: "pet.png"),
    });

    await dio.put(
      '$baseUrl/api/sell/${widget.pet["_id"]}',
      data: formData,
    );

    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Edit Pet"),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              GestureDetector(
                onTap: pickImage,
                child: CircleAvatar(
                  radius: 60,
                  backgroundImage: mobileImage != null
                      ? FileImage(mobileImage!)
                      : NetworkImage(
                          '$baseUrl/uploads/${widget.pet["image"]}')
                          as ImageProvider,
                ),
              ),
              const SizedBox(height: 20),
              TextFormField(
                  controller: nameCtrl,
                  decoration:
                      const InputDecoration(labelText: "Pet Name")),
              TextFormField(
                  controller: breedCtrl,
                  decoration:
                      const InputDecoration(labelText: "Breed")),
              TextFormField(
                  controller: ageCtrl,
                  decoration:
                      const InputDecoration(labelText: "Age")),
              TextFormField(
                  controller: priceCtrl,
                  decoration:
                      const InputDecoration(labelText: "Price")),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: updatePet,
                child: const Text("Update"),
              )
            ],
          ),
        ),
      ),
    );
  }
}
