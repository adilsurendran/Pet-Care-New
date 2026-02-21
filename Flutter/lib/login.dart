// import 'package:flutter/material.dart';
// import 'package:petcareapp/api_config.dart';
// import 'package:petcareapp/homescreen.dart';
// import 'package:petcareapp/register.dart';

// class LoginPage extends StatefulWidget {

//   const LoginPage({super.key});

//   @override
//   State<LoginPage> createState() => _LoginPageState();
// }
//   String? lid;

//   String? usrid;
//   String? userFullname;
//   String role = "user";
// class _LoginPageState extends State<LoginPage> {
  

//   final TextEditingController usernameController = TextEditingController();

//   final TextEditingController passwordController = TextEditingController();

//   final formkey = GlobalKey<FormState>();

// Future<void> Loginapi(BuildContext context) async {
//   try {
//     final response = await dio.post(
//       '$baseUrl/api/login',
//       data: {
//         "username": usernameController.text.trim(),
//         "password": passwordController.text.trim(),
//       },
//     );

//     // print(response.data);

//     if (response.statusCode == 200 || response.statusCode == 201) {
//       final responseData = response.data['data'];

//       // Defensive null checks
//       if (responseData == null || responseData['userDetails'] == null) {
//         ScaffoldMessenger.of(context).showSnackBar(
//           const SnackBar(content: Text("Invalid server response")),
//         );
//         return;
//       }

//       lid = responseData['id'];
//       usrid = responseData['userDetails']['_id'];
//       userFullname = responseData['userDetails']['userFullname'];

//       // print(lid);
//       print(usrid);
//       print(userFullname);
//       print(role);

//       Navigator.pushReplacement(
//         context,
//         MaterialPageRoute(builder: (context) => HomePage()),
//       );

//       ScaffoldMessenger.of(context).showSnackBar(
//         const SnackBar(content: Text("Login Successful")),
//       );
//     } else {
//       ScaffoldMessenger.of(context).showSnackBar(
//         const SnackBar(content: Text("Login Failed")),
//       );
//     }
//   } catch (e) {
//     print(e);
//     ScaffoldMessenger.of(context).showSnackBar(
//       const SnackBar(content: Text("Something went wrong")),
//     );
//   }
// }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Login page'),
//         centerTitle: true,
//         backgroundColor: const Color.fromARGB(255, 192, 143, 128),
//       ),
//       body: Padding(
//         padding: const EdgeInsets.all(8.0),
//         child: Center(
//           child: Form(
//             key: formkey,
//             child: Column(
//               mainAxisAlignment: .center,
//               spacing: 10,
//               children: [
//                 TextFormField(
//                   controller: usernameController,
//                   validator: (value) {
//                     if (value == null || value.isEmpty) {
//                       return 'Please enter username ';
//                     }
//                     return null;
//                   },
//                   decoration: InputDecoration(
//                     labelText: 'usename',
//                     border: OutlineInputBorder(
//                       borderRadius: BorderRadius.circular(12),
//                     ),
//                   ),
//                 ),
//                 TextFormField(
//                   controller: passwordController,
//                   validator: (value) {
//                     if (value == null || value.isEmpty) {
//                       return 'please enter password';
//                     }
//                     return null;
//                   },
//                   decoration: InputDecoration(
//                     labelText: 'Password',
//                     border: OutlineInputBorder(
//                       borderRadius: BorderRadius.circular(12),
//                     ),
//                   ),
//                 ),
//                 SizedBox(height: 20),
//                 ElevatedButton(
//                   style: ElevatedButton.styleFrom(
//                     shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadiusGeometry.circular(8),
//                     ),
//                     backgroundColor: Colors.blue,
//                     foregroundColor: const Color.fromARGB(255, 255, 255, 255),
//                   ),
//                   onPressed: () {
//                     if (formkey.currentState!.validate()) {
//                       Loginapi(context);
//                     }
//                   },
//                   child: Text('login'),
//                 ),
//               ],
//             ),
//           ),
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/homescreen.dart';
import 'package:petcareapp/register.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

String? lid;
String? usrid;
String? userFullname;
String role = "user";

class _LoginPageState extends State<LoginPage> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  final formkey = GlobalKey<FormState>();

  Future<void> Loginapi(BuildContext context) async {
    try {
      final response = await dio.post(
        '$baseUrl/api/login',
        data: {
          "username": usernameController.text.trim(),
          "password": passwordController.text.trim(),
        },
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final responseData = response.data['data'];

        if (responseData == null || responseData['userDetails'] == null) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text("Invalid server response")),
          );
          return;
        }

        lid = responseData['id'];
        usrid = responseData['userDetails']['_id'];
        userFullname = responseData['userDetails']['userFullname'];

        print(usrid);
        print(userFullname);
        print(role);

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => HomePage()),
        );

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Login Successful")),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Login Failed")),
        );
      }
    } catch (e) {
      print(e);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Something went wrong")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login page'),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(255, 192, 143, 128),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Center(
          child: Form(
            key: formkey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              spacing: 10,
              children: [
                TextFormField(
                  controller: usernameController,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter username ';
                    }
                    return null;
                  },
                  decoration: InputDecoration(
                    labelText: 'usename',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),

                TextFormField(
                  controller: passwordController,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'please enter password';
                    }
                    return null;
                  },
                  decoration: InputDecoration(
                    labelText: 'Password',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),

                SizedBox(height: 20),

                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadiusGeometry.circular(8),
                    ),
                    backgroundColor: Colors.blue,
                    foregroundColor: const Color.fromARGB(255, 255, 255, 255),
                  ),
                  onPressed: () {
                    if (formkey.currentState!.validate()) {
                      Loginapi(context);
                    }
                  },
                  child: Text('login'),
                ),

                // 🔥 NEW REGISTER BUTTON (ONLY ADDITION)
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const Register()),
                    );
                  },
                  child: const Text(
                    "Register as New User",
                    style: TextStyle(fontSize: 15),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}