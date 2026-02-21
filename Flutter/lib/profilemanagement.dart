import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';

class ProfileManagement extends StatefulWidget {
  const ProfileManagement({super.key});

  @override
  State<ProfileManagement> createState() => _ProfileManagementState();
}

class _ProfileManagementState extends State<ProfileManagement> {
  bool isEditing = false;
  bool isLoading = true;

  File? _profileImage;
  final ImagePicker _picker = ImagePicker();

  // 🔹 Controllers (EMPTY – API FILLS THEM)
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final phoneController = TextEditingController();
  final genderController = TextEditingController();
  final picontroller = TextEditingController();
  final citycontroller = TextEditingController();
  final statecontroller = TextEditingController();
  final agecontroller = TextEditingController();

  // 🔹 PICK IMAGE (optional – UI only)
  Future<void> _pickImage() async {
    final XFile? pickedFile = await _picker.pickImage(
      source: ImageSource.gallery,
    );
    if (pickedFile != null) {
      setState(() {
        _profileImage = File(pickedFile.path);
      });
    }
  }

  // 🔹 PROFILE API
  Future<void> profileApi() async {
    try {
      final response = await dio.get('$baseUrl/api/users/profile/$usrid');

      final data = response.data;

      setState(() {
        nameController.text = data['userFullname'] ?? '';
        emailController.text = data['userEmail'] ?? '';
        phoneController.text = data['phone'] ?? '';
        genderController.text = data['gender'] ?? '';
        picontroller.text = data['pincode'] ?? '';
        citycontroller.text = data['city'] ?? '';
        statecontroller.text = data['state'] ?? '';
        agecontroller.text = data['age'].toString();
        isLoading = false;
      });
    } catch (e) {
      debugPrint('Profile API error: $e');
      setState(() => isLoading = false);
    }
  }

  @override
  void initState() {
    super.initState();
    profileApi();
  }

  Future<void> updateProfileApi() async {
    print("Hiiiiiiiiii");
    try {
      final response = await dio.put(
        '$baseUrl/api/users/profile/$usrid',
        data: {
          'userFullname': nameController.text.trim(),
          'userEmail': emailController.text.trim(),
          'city': citycontroller.text.trim(),
          'state': statecontroller.text.trim(),
          'pincode': picontroller.text.trim(),
          'age': agecontroller.text.trim(),
          'gender': genderController.text.trim(),
          'phone': phoneController.text.trim(),
        },
      );
      print(response.data);
    } catch (e) {
      print(e);
    }
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    phoneController.dispose();
    genderController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F7),

      // 🔹 APP BAR
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        // leading: IconButton(
        //   icon: const CircleAvatar(
        //     backgroundColor: Colors.white,
        //     child: Icon(
        //       Icons.arrow_back_ios_new,
        //       color: Color.fromARGB(250, 218, 98, 17),
        //       size: 20,
        //     ),
        //   ),
        //   onPressed: () => Navigator.pop(context),
        // ),
        title: const Text(
          'Profile',
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontSize: 24,
            fontWeight: FontWeight.bold,
            fontFamily: 'Pacifico',
          ),
        ),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            decoration: const BoxDecoration(
              color: Colors.white,
              shape: BoxShape.circle,
            ),
            child: IconButton(
              icon: Icon(
                isEditing ? Icons.check : Icons.edit,
                color: const Color.fromARGB(250, 218, 98, 17),
              ),
              onPressed: () async {
                if (isEditing) {
                  // Tick pressed → Save changes
                  await updateProfileApi();
                }

                setState(() {
                  isEditing = !isEditing;
                });
              },
            ),
          ),
        ],
      ),

      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              const SizedBox(height: 10),

              // 👤 PROFILE HEADER
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 30),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      const Color.fromARGB(250, 218, 98, 17),
                      Colors.orange.shade300,
                    ],
                  ),
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.orange.withOpacity(0.3),
                      blurRadius: 15,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Stack(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(4),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.white, width: 3),
                          ),
                          child: CircleAvatar(
                            radius: 45,
                            backgroundColor: Colors.white,
                            backgroundImage: _profileImage != null
                                ? FileImage(_profileImage!)
                                : null,
                            child: _profileImage == null
                                ? Text(
                                    nameController.text.isNotEmpty
                                        ? nameController.text[0].toUpperCase()
                                        : '',
                                    style: const TextStyle(
                                      fontSize: 36,
                                      fontWeight: FontWeight.bold,
                                      color: Color.fromARGB(250, 218, 98, 17),
                                    ),
                                  )
                                : null,
                          ),
                        ),
                        if (isEditing)
                          Positioned(
                            bottom: 0,
                            right: 0,
                            child: GestureDetector(
                              onTap: _pickImage,
                              child: Container(
                                padding: const EdgeInsets.all(8),
                                decoration: const BoxDecoration(
                                  color: Colors.white,
                                  shape: BoxShape.circle,
                                ),
                                child: const Icon(
                                  Icons.camera_alt,
                                  color: Color.fromARGB(250, 218, 98, 17),
                                  size: 20,
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    isEditing
                        ? Container(
                            width: 200,
                            padding: const EdgeInsets.symmetric(
                              horizontal: 10,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.white24,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: _editHeaderField(nameController),
                          )
                        : Text(
                            nameController.text,
                            style: const TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                    const SizedBox(height: 4),
                    Text(
                      emailController.text,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.white.withOpacity(0.9),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 30),

              _profileTile(
                Icons.email_outlined,
                'Email',
                emailController,
                isReadOnly: true,
              ),
              _profileTile(Icons.phone_outlined, 'Phone', phoneController),
              _profileTile(
                Icons.person_outline_rounded,
                'Gender',
                genderController,
              ),
              _profileTile(Icons.numbers, 'Pincode', picontroller),
              _profileTile(Icons.numbers, 'city', citycontroller),
              _profileTile(Icons.numbers, 'state', statecontroller),
              _profileTile(Icons.numbers, 'age', agecontroller),

              const SizedBox(height: 30),

              if (isEditing)
                SizedBox(
                  height: 55,
                  width: double.infinity,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromARGB(250, 218, 98, 17),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(18),
                      ),
                    ),
                    // onPressed: () {
                    //   setState(() {
                    //     updateProfileApi();
                    //     isEditing = false;
                    //   });

                    // },
                    onPressed: () async {
                      await updateProfileApi();
                      setState(() {
                        isEditing = false;
                      });
                    },
                    child: const Text(
                      'Save Changes',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),

              const SizedBox(height: 30),
            ],
          ),
        ),
      ),
    );
  }

  // 🔹 PROFILE TILE
  Widget _profileTile(
    IconData icon,
    String label,
    TextEditingController controller, {
    bool isReadOnly = false,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.08),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: const Color.fromARGB(250, 218, 98, 17).withOpacity(0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icon, color: const Color.fromARGB(250, 218, 98, 17)),
        ),
        title: Text(
          label,
          style: TextStyle(
            fontSize: 14,
            color: Colors.grey.shade500,
            fontWeight: FontWeight.w500,
          ),
        ),
        subtitle: (isEditing && !isReadOnly)
            ? TextField(
                controller: controller,
                decoration: const InputDecoration(border: InputBorder.none),
              )
            : Padding(
                padding: const EdgeInsets.only(top: 4),
                child: Text(
                  controller.text,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
      ),
    );
  }

  // 🔹 EDIT NAME FIELD
  Widget _editHeaderField(TextEditingController controller) {
    return TextField(
      controller: controller,
      textAlign: TextAlign.center,
      style: const TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
      cursorColor: Colors.white,
      decoration: const InputDecoration(border: InputBorder.none),
    );
  }
}
