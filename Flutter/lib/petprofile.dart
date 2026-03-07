import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';

import 'pet_manager.dart';

class Petprofile extends StatefulWidget {
  final Pet? pet; // null → add | not null → edit

  const Petprofile({super.key, this.pet});

  @override
  State<Petprofile> createState() => _PetprofileState();
}

class _PetprofileState extends State<Petprofile> {
  String? selectedGender;
  String selectedWeightUnit = "kg";

  File? mobileImage; // Android / iOS
  Uint8List? webImageBytes; // Web

  DateTime? selectedDate;
  DateTime? lastVaccinationDate;

  final picker = ImagePicker();

  final TextEditingController nameController = TextEditingController();
  final TextEditingController typeController = TextEditingController();
  final TextEditingController breedController = TextEditingController();
  final TextEditingController weightController = TextEditingController();
  final TextEditingController dobController = TextEditingController();
  final TextEditingController notesController = TextEditingController();
  final TextEditingController lastvaccinationController =
      TextEditingController();

  @override
  void initState() {
    super.initState();

    if (widget.pet != null) {
      final pet = widget.pet!;
      nameController.text = pet.name;
      typeController.text = pet.type;
      breedController.text = pet.breed;
      weightController.text = pet.weight.toString();
      selectedWeightUnit = pet.weightUnit;
      selectedGender = pet.gender;
      selectedDate = pet.dob;
      dobController.text = _formatDate(pet.dob);
      notesController.text = pet.notes;

      if (pet.lastVaccination != null) {
        lastVaccinationDate = pet.lastVaccination;
        lastvaccinationController.text = _formatDate(pet.lastVaccination!);
      }

      mobileImage = pet.image; // mobile preview only
    }
  }

  // ---------------- IMAGE PICKER ----------------
  Future<void> pickImage() async {
    final XFile? picked = await picker.pickImage(source: ImageSource.gallery);

    if (picked == null) return;

    if (kIsWeb) {
      webImageBytes = await picked.readAsBytes();
    } else {
      mobileImage = File(picked.path);
    }

    setState(() {});
  }

  // ---------------- ADD PET ----------------
  Future<void> addpetApi() async {
    try {
      final formData = await _buildFormData();

      await dio.post(
        '$baseUrl/api/pets/add/$usrid',
        data: formData,
        options: Options(headers: {'Content-Type': 'multipart/form-data'}),
      );
    } catch (e) {
      debugPrint("Add Pet Error: $e");
    }
  }

  // ---------------- UPDATE PET ----------------
  Future<void> updatepetApi() async {
    try {
      final formData = await _buildFormData();

      final resi = await dio.put(
        '$baseUrl/api/pets/${widget.pet!.id}',
        data: formData,
        options: Options(headers: {'Content-Type': 'multipart/form-data'}),
      );
      if (resi.statusCode == 200 || resi.statusCode == 201) {
        getPetdetailsApi();
      }
    } catch (e) {
      debugPrint("Update Pet Error: $e");
    }
  }

  // ---------------- FORM DATA BUILDER ----------------
  Future<FormData> _buildFormData() async {
    return FormData.fromMap({
      'name': nameController.text.trim(),
      'petType': typeController.text.trim(),
      'breed': breedController.text.trim(),
      'sex': selectedGender,
      'purchaseDate': dobController.text.trim(),
      'lastVaccination': lastvaccinationController.text.trim(),
      'weight': weightController.text.trim(),
      'weightUnit': selectedWeightUnit,
      'notes': notesController.text.trim(),

      if (!kIsWeb && mobileImage != null)
        'image': await MultipartFile.fromFile(
          mobileImage!.path,
          filename: mobileImage!.path.split('/').last,
        ),

      if (kIsWeb && webImageBytes != null)
        'image': MultipartFile.fromBytes(
          webImageBytes!,
          filename: 'pet_image.png',
        ),
    });
  }

  // ---------------- UI ----------------
  @override
  Widget build(BuildContext context) {
    final bool isEditing = widget.pet != null;

    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: Text(
          isEditing ? "Edit Pet" : "Add Pet",
          style: const TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios_new,
            color: Color.fromARGB(250, 218, 98, 17),
          ),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            GestureDetector(
              onTap: pickImage,
              child: CircleAvatar(
                radius: 70,
                backgroundColor: Colors.grey.shade200,
                child: _buildImageContent(),
              ),
            ),
            const SizedBox(height: 30),

            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
              ),
              child: Column(
                children: [
                  buildTextField("Pet Name", controller: nameController),
                  const SizedBox(height: 20),
                  buildTextField("Pet Type", controller: typeController),
                  const SizedBox(height: 20),
                  buildTextField("Breed", controller: breedController),
                  const SizedBox(height: 20),
                  _datePicker(
                    label: "Last Vaccination",
                    controller: lastvaccinationController,
                    onPick: (d) => lastVaccinationDate = d,
                  ),
                  const SizedBox(height: 20),
                  _genderSelector(),
                  const SizedBox(height: 20),
                  _datePicker(
                    label: "Date of Birth",
                    controller: dobController,
                    onPick: (d) => selectedDate = d,
                  ),
                  const SizedBox(height: 20),
                  buildTextField("Weight", controller: weightController),
                  const SizedBox(height: 20),
                  buildTextField(
                    "Notes",
                    controller: notesController,
                    maxLines: 3,
                  ),
                ],
              ),
            ),

            const SizedBox(height: 30),

            SizedBox(
              width: double.infinity,
              height: 55,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color.fromARGB(250, 218, 98, 17),
                ),
                onPressed: () async {
                  if (nameController.text.trim().isEmpty ||
                      typeController.text.trim().isEmpty ||
                      breedController.text.trim().isEmpty ||
                      selectedGender == null ||
                      dobController.text.trim().isEmpty ||
                      weightController.text.trim().isEmpty ||
                      notesController.text.trim().isEmpty) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text(
                          "Please fill all fields",
                        ),
                        backgroundColor: Colors.red,
                      ),
                    );
                    return;
                  }

                  if (isEditing) {
                    await updatepetApi();
                  } else {
                    await addpetApi();
                  }
                  Navigator.pop(context);
                },
                child: Text(
                  isEditing ? "Save Changes" : "Add Pet",
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ---------------- HELPERS ----------------
  Widget _buildImageContent() {
    if (kIsWeb && webImageBytes != null) {
      return ClipOval(
        child: Image.memory(
          webImageBytes!,
          width: 140,
          height: 140,
          fit: BoxFit.cover,
        ),
      );
    } else if (!kIsWeb && mobileImage != null) {
      return ClipOval(
        child: Image.file(
          mobileImage!,
          width: 140,
          height: 140,
          fit: BoxFit.cover,
        ),
      );
    } else {
      return const Icon(Icons.add_a_photo, size: 40);
    }
  }

  Widget _genderSelector() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: ["Male", "Female"].map((g) {
        return Row(
          children: [
            Radio<String>(
              value: g,
              groupValue: selectedGender,
              onChanged: (v) => setState(() => selectedGender = v),
            ),
            Text(g),
          ],
        );
      }).toList(),
    );
  }

  Widget _datePicker({
    required String label,
    required TextEditingController controller,
    required Function(DateTime) onPick,
  }) {
    return GestureDetector(
      onTap: () async {
        final picked = await showDatePicker(
          context: context,
          initialDate: DateTime.now(),
          firstDate: DateTime(2000),
          lastDate: DateTime.now(),
        );
        if (picked != null) {
          controller.text = _formatDate(picked);
          onPick(picked);
        }
      },
      child: AbsorbPointer(
        child: buildTextField(
          label,
          controller: controller,
          icon: Icons.calendar_today,
        ),
      ),
    );
  }

  Widget buildTextField(
    String label, {
    TextEditingController? controller,
    int maxLines = 1,
    IconData? icon,
  }) {
    return TextFormField(
      controller: controller,
      maxLines: maxLines,
      decoration: InputDecoration(
        labelText: label,
        suffixIcon: icon != null ? Icon(icon) : null,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
      ),
    );
  }

  String _formatDate(DateTime d) =>
      "${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}";
}
