// import 'dart:io';
// import 'package:flutter/material.dart';
// import 'package:image_picker/image_picker.dart';
// import 'package:dio/dio.dart';
// import 'package:petcareapp/login.dart';
// import 'package:petcareapp/register.dart';

// class AddPetForSale extends StatefulWidget {
//   const AddPetForSale({super.key});

//   @override
//   State<AddPetForSale> createState() => _AddPetForSaleState();
// }

// class _AddPetForSaleState extends State<AddPetForSale> {
//   final _formKey = GlobalKey<FormState>();

//   final TextEditingController nameCtrl = TextEditingController();
//   final TextEditingController breedCtrl = TextEditingController();
//   final TextEditingController ageCtrl = TextEditingController();
//   final TextEditingController priceCtrl = TextEditingController();

//   File? image;
//   bool loading = false;

//   final ImagePicker picker = ImagePicker();

//   /* ======================
//      PICK IMAGE
//   ====================== */
//   Future<void> pickImage() async {
//     final XFile? picked =
//         await picker.pickImage(source: ImageSource.gallery);

//     if (picked != null) {
//       setState(() {
//         image = File(picked.path);
//       });
//     }
//   }

//   /* ======================
//      SUBMIT PET
//   ====================== */
//   Future<void> submitPet() async {
//     if (!_formKey.currentState!.validate()) return;
//     if (image == null) {
//       ScaffoldMessenger.of(context).showSnackBar(
//         const SnackBar(content: Text("Please select an image")),
//       );
//       return;
//     }

//     setState(() => loading = true);

//     try {
//       final formData = FormData.fromMap({
//         "name": nameCtrl.text.trim(),
//         "breed": breedCtrl.text.trim(),
//         "age": ageCtrl.text.trim(),
//         "price": priceCtrl.text.trim(),
//         "image": await MultipartFile.fromFile(image!.path),
//       });

//       await dio.post(
//         "$baseUrl/api/sell/$usrid",
//         data: formData,
//         options: Options(headers: {
//           "Content-Type": "multipart/form-data",
//         }),
//       );

//       ScaffoldMessenger.of(context).showSnackBar(
//         const SnackBar(content: Text("Pet added successfully")),
//       );

//       Navigator.pop(context);
//     } catch (e) {
//       print(e);
//       ScaffoldMessenger.of(context).showSnackBar(
//         const SnackBar(content: Text("Failed to add pet")),
//       );
//     } finally {
//       setState(() => loading = false);
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.grey.shade100,

//       appBar: AppBar(
//         backgroundColor: Colors.white,
//         elevation: 1,
//         leading: IconButton(
//           icon: const Icon(Icons.arrow_back_ios_new,
//               color: Color.fromARGB(250, 218, 98, 17)),
//           onPressed: () => Navigator.pop(context),
//         ),
//         title: const Text(
//           "Add Pet for Sale",
//           style: TextStyle(
//             color: Color.fromARGB(250, 218, 98, 17),
//             fontWeight: FontWeight.bold,
//           ),
//         ),
//         centerTitle: true,
//       ),

//       body: SingleChildScrollView(
//         padding: const EdgeInsets.all(20),
//         child: Form(
//           key: _formKey,
//           child: Column(
//             children: [
//               // 🖼 IMAGE PICKER
//               GestureDetector(
//                 onTap: pickImage,
//                 child: Container(
//                   height: 200,
//                   width: double.infinity,
//                   decoration: BoxDecoration(
//                     color: Colors.white,
//                     borderRadius: BorderRadius.circular(18),
//                     border: Border.all(color: Colors.grey.shade300),
//                   ),
//                   child: image == null
//                       ? Column(
//                           mainAxisAlignment: MainAxisAlignment.center,
//                           children: const [
//                             Icon(Icons.add_a_photo,
//                                 size: 40, color: Colors.grey),
//                             SizedBox(height: 8),
//                             Text("Tap to add pet image",
//                                 style: TextStyle(color: Colors.grey)),
//                           ],
//                         )
//                       : ClipRRect(
//                           borderRadius: BorderRadius.circular(18),
//                           child: Image.file(
//                             image!,
//                             fit: BoxFit.cover,
//                             width: double.infinity,
//                           ),
//                         ),
//                 ),
//               ),

//               const SizedBox(height: 25),

//               // 🐶 NAME
//               TextFormField(
//                 controller: nameCtrl,
//                 decoration: _inputDecoration("Pet Name"),
//                 validator: (v) =>
//                     v == null || v.isEmpty ? "Name required" : null,
//               ),

//               const SizedBox(height: 15),

//               // 🐕 BREED
//               TextFormField(
//                 controller: breedCtrl,
//                 decoration: _inputDecoration("Breed"),
//                 validator: (v) =>
//                     v == null || v.isEmpty ? "Breed required" : null,
//               ),

//               const SizedBox(height: 15),

//               // 🎂 AGE
//               TextFormField(
//                 controller: ageCtrl,
//                 decoration: _inputDecoration("Age"),
//                 keyboardType: TextInputType.number,
//               ),

//               const SizedBox(height: 15),

//               // 💰 PRICE
//               TextFormField(
//                 controller: priceCtrl,
//                 decoration: _inputDecoration("Price"),
//                 keyboardType: TextInputType.number,
//                 validator: (v) =>
//                     v == null || v.isEmpty ? "Price required" : null,
//               ),

//               const SizedBox(height: 30),

//               // ✅ SUBMIT BUTTON
//               SizedBox(
//                 width: double.infinity,
//                 height: 55,
//                 child: ElevatedButton(
//                   onPressed: loading ? null : submitPet,
//                   style: ElevatedButton.styleFrom(
//                     backgroundColor:
//                         const Color.fromARGB(250, 218, 98, 17),
//                     shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(16),
//                     ),
//                   ),
//                   child: loading
//                       ? const CircularProgressIndicator(color: Colors.white)
//                       : const Text(
//                           "Add Pet",
//                           style: TextStyle(
//                               fontSize: 18,
//                               fontWeight: FontWeight.bold,
//                               color: Colors.white),
//                         ),
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }

//   InputDecoration _inputDecoration(String label) {
//     return InputDecoration(
//       labelText: label,
//       filled: true,
//       fillColor: Colors.white,
//       border: OutlineInputBorder(
//         borderRadius: BorderRadius.circular(14),
//         borderSide: BorderSide.none,
//       ),
//     );
//   }
// }

import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';

class AddPetForSale extends StatefulWidget {
  const AddPetForSale({super.key});

  @override
  State<AddPetForSale> createState() => _AddPetForSaleState();
}

class _AddPetForSaleState extends State<AddPetForSale> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController nameCtrl = TextEditingController();
  final TextEditingController breedCtrl = TextEditingController();
  final TextEditingController ageCtrl = TextEditingController();
  final TextEditingController priceCtrl = TextEditingController();

  File? mobileImage;              // Android / iOS
  Uint8List? webImageBytes;       // Web

  bool loading = false;

  final ImagePicker picker = ImagePicker();

  /* ======================
     PICK IMAGE (WEB + MOBILE)
  ====================== */
  Future<void> pickImage() async {
    final XFile? picked =
        await picker.pickImage(source: ImageSource.gallery);

    if (picked == null) return;

    if (kIsWeb) {
      webImageBytes = await picked.readAsBytes();
    } else {
      mobileImage = File(picked.path);
    }

    setState(() {});
  }

  /* ======================
     SUBMIT PET
  ====================== */
  Future<void> submitPet() async {
    if (!_formKey.currentState!.validate()) return;

    if (!kIsWeb && mobileImage == null ||
        kIsWeb && webImageBytes == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Please select an image")),
      );
      return;
    }

    setState(() => loading = true);

    try {
      final formData = FormData.fromMap({
        "name": nameCtrl.text.trim(),
        "breed": breedCtrl.text.trim(),
        "age": ageCtrl.text.trim(),
        "price": priceCtrl.text.trim(),

        if (!kIsWeb && mobileImage != null)
          "image": await MultipartFile.fromFile(
            mobileImage!.path,
            filename: mobileImage!.path.split('/').last,
          ),

        if (kIsWeb && webImageBytes != null)
          "image": MultipartFile.fromBytes(
            webImageBytes!,
            filename: "pet_image.png",
          ),
      });

      await dio.post(
        "$baseUrl/api/sell/$usrid",
        data: formData,
        options: Options(headers: {
          "Content-Type": "multipart/form-data",
        }),
      );

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Pet added successfully")),
      );

      Navigator.pop(context);
    } catch (e) {
      debugPrint("Add Pet Error: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to add pet")),
      );
    } finally {
      setState(() => loading = false);
    }
  }

  /* ======================
     UI
  ====================== */
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,

      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios_new,
            color: Color.fromARGB(250, 218, 98, 17),
          ),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          "Add Pet for Sale",
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              // 🖼 IMAGE PICKER
              GestureDetector(
                onTap: pickImage,
                child: Container(
                  height: 200,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: Colors.grey.shade300),
                  ),
                  child: _buildImagePreview(),
                ),
              ),

              const SizedBox(height: 25),

              TextFormField(
                controller: nameCtrl,
                decoration: _inputDecoration("Pet Name"),
                validator: (v) =>
                    v == null || v.isEmpty ? "Name required" : null,
              ),

              const SizedBox(height: 15),

              TextFormField(
                controller: breedCtrl,
                decoration: _inputDecoration("Breed"),
                validator: (v) =>
                    v == null || v.isEmpty ? "Breed required" : null,
              ),

              const SizedBox(height: 15),

              TextFormField(
                controller: ageCtrl,
                decoration: _inputDecoration("Age"),
                keyboardType: TextInputType.number,
              ),

              const SizedBox(height: 15),

              TextFormField(
                controller: priceCtrl,
                decoration: _inputDecoration("Price"),
                keyboardType: TextInputType.number,
                validator: (v) =>
                    v == null || v.isEmpty ? "Price required" : null,
              ),

              const SizedBox(height: 30),

              SizedBox(
                width: double.infinity,
                height: 55,
                child: ElevatedButton(
                  onPressed: loading ? null : submitPet,
                  style: ElevatedButton.styleFrom(
                    backgroundColor:
                        const Color.fromARGB(250, 218, 98, 17),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: loading
                      ? const CircularProgressIndicator(color: Colors.white)
                      : const Text(
                          "Add Pet",
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  /* ======================
     HELPERS
  ====================== */
  Widget _buildImagePreview() {
    if (kIsWeb && webImageBytes != null) {
      return ClipRRect(
        borderRadius: BorderRadius.circular(18),
        child: Image.memory(
          webImageBytes!,
          fit: BoxFit.cover,
          width: double.infinity,
        ),
      );
    } else if (!kIsWeb && mobileImage != null) {
      return ClipRRect(
        borderRadius: BorderRadius.circular(18),
        child: Image.file(
          mobileImage!,
          fit: BoxFit.cover,
          width: double.infinity,
        ),
      );
    } else {
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Icon(Icons.add_a_photo, size: 40, color: Colors.grey),
          SizedBox(height: 8),
          Text("Tap to add pet image",
              style: TextStyle(color: Colors.grey)),
        ],
      );
    }
  }

  InputDecoration _inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      filled: true,
      fillColor: Colors.white,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide.none,
      ),
    );
  }
}
