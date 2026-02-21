// import 'package:dio/dio.dart';
// import 'package:flutter/material.dart';
// import 'package:image_picker/image_picker.dart';
// import 'package:petcareapp/login.dart';
// import 'package:petcareapp/register.dart';

// class CreatePostSheet extends StatefulWidget {
//   const CreatePostSheet({super.key});

//   @override
//   State<CreatePostSheet> createState() => _CreatePostSheetState();
// }

// class _CreatePostSheetState extends State<CreatePostSheet> {
//   final titleCtrl = TextEditingController();
//   final descCtrl = TextEditingController();
//   XFile? image;

//   Future<void> submit() async {
//     try {
//       final data = FormData.fromMap({
//       "title": titleCtrl.text,
//       "description": descCtrl.text,
//       "userId": usrid,
//       "userFullname": userFullname,
//       "role": role,
//       if (image != null)
//         "image": await MultipartFile.fromFile(image!.path),
//     });

//     final res = await dio.post("$baseUrl/api/community/post", data: data);
//     print(res);
//     Navigator.pop(context);
//     } catch (e) {
//       print(e);
//     }
    
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Padding(
//       padding: MediaQuery.of(context).viewInsets.add(const EdgeInsets.all(16)),
//       child: Column(
//         mainAxisSize: MainAxisSize.min,
//         children: [
//           TextField(controller: titleCtrl, decoration: const InputDecoration(labelText: "Title")),
//           TextField(controller: descCtrl, decoration: const InputDecoration(labelText: "Description")),
//           TextButton.icon(
//             icon: const Icon(Icons.image),
//             label: const Text("Add Image"),
//             onPressed: () async {
//               image = await ImagePicker().pickImage(source: ImageSource.gallery);
//               setState(() {});
//             },
//           ),
//           ElevatedButton(
//             onPressed: submit,
//             child: const Text("Post"),
//           ),
//         ],
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

class CreatePostSheet extends StatefulWidget {
  const CreatePostSheet({super.key});

  @override
  State<CreatePostSheet> createState() => _CreatePostSheetState();
}

class _CreatePostSheetState extends State<CreatePostSheet> {
  final TextEditingController titleCtrl = TextEditingController();
  final TextEditingController descCtrl = TextEditingController();

  File? mobileImage;
  Uint8List? webImageBytes;
  String? fileName;

  bool loading = false;

  // ---------------- PICK IMAGE ----------------
  Future<void> pickImage() async {
    final picked =
        await ImagePicker().pickImage(source: ImageSource.gallery);
    if (picked == null) return;

    if (kIsWeb) {
      webImageBytes = await picked.readAsBytes();
      fileName = picked.name;
    } else {
      mobileImage = File(picked.path);
      fileName = picked.path.split('/').last;
    }

    setState(() {});
  }

  // ---------------- SUBMIT ----------------
  Future<void> submitPostApi() async {
    if (titleCtrl.text.trim().isEmpty ||
        descCtrl.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Title & Description required")),
      );
      return;
    }

    try {
      setState(() => loading = true);

      final formData = await _buildFormData();

      final res = await dio.post(
        '$baseUrl/api/community/post',
        data: formData,
        options: Options(headers: {
          'Content-Type': 'multipart/form-data',
        }),
      );

      if (res.statusCode == 200 || res.statusCode == 201) {
        Navigator.pop(context, true);
      }
    } catch (e) {
      debugPrint("Create Post Error: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to create post")),
      );
    } finally {
      setState(() => loading = false);
    }
  }

  // ---------------- FORM DATA BUILDER ----------------
  Future<FormData> _buildFormData() async {
    return FormData.fromMap({
      "title": titleCtrl.text.trim(),
      "description": descCtrl.text.trim(),
      "userId": usrid,
      "userFullname": userFullname,
      "role": role,

      // ✅ MOBILE
      if (!kIsWeb && mobileImage != null)
        "image": await MultipartFile.fromFile(
          mobileImage!.path,
          filename: mobileImage!.path.split('/').last,
        ),

      // ✅ WEB
      if (kIsWeb && webImageBytes != null)
        "image": MultipartFile.fromBytes(
          webImageBytes!,
          filename: fileName ?? "post_image.png",
        ),
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding:
          MediaQuery.of(context).viewInsets.add(const EdgeInsets.all(16)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Create Community Post",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),

          TextField(
            controller: titleCtrl,
            decoration: const InputDecoration(
              labelText: "Post Title",
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 12),

          TextField(
            controller: descCtrl,
            maxLines: 4,
            decoration: const InputDecoration(
              labelText: "Description",
              border: OutlineInputBorder(),
            ),
          ),

          // 📎 FILE NAME DISPLAY
          if (fileName != null) ...[
            const SizedBox(height: 8),
            Text(
              "Selected file: $fileName",
              style: const TextStyle(
                fontSize: 13,
                color: Colors.grey,
              ),
            ),
          ],

          const SizedBox(height: 12),

          Row(
            children: [
              TextButton.icon(
                icon: const Icon(Icons.image),
                label: const Text("Choose Image"),
                onPressed: pickImage,
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: loading ? null : submitPostApi,
                style: ElevatedButton.styleFrom(
                  backgroundColor:
                      const Color.fromARGB(250, 218, 98, 17),
                ),
                child: loading
                    ? const SizedBox(
                        width: 18,
                        height: 18,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          color: Colors.white,
                        ),
                      )
                    : const Text(
                        "Post",
                        style: TextStyle(color: Colors.white),
                      ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
