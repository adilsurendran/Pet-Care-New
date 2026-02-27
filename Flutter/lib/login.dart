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

        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text("Login Successful")));
      } else {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text("Login Failed")));
      }
    } catch (e) {
      print(e);
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Something went wrong")));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color.fromARGB(255, 255, 255, 255),
              Color.fromARGB(255, 255, 245, 235),
            ],
          ),
        ),
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 30),
            child: Form(
              key: formkey,
              child: Column(
                children: [
                  const SizedBox(height: 100),
                  // 🐾 Top Icon
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 255, 235, 210),
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: const Color.fromARGB(
                            250,
                            218,
                            98,
                            17,
                          ).withOpacity(0.2),
                          blurRadius: 20,
                          offset: const Offset(0, 10),
                        ),
                      ],
                    ),
                    child: const Icon(
                      Icons.pets,
                      color: Color.fromARGB(250, 218, 98, 17),
                      size: 60,
                    ),
                  ),
                  const SizedBox(height: 20),
                  // 📝 Title
                  const Text(
                    "Welcome Back",
                    style: TextStyle(
                      color: Color.fromARGB(250, 218, 98, 17),
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Pacifico',
                    ),
                  ),
                  const Text(
                    "Login to your pet's world",
                    style: TextStyle(
                      color: Colors.grey,
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 50),

                  // 👤 Username Field
                  TextFormField(
                    controller: usernameController,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter username';
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                      hintText: 'Username',
                      prefixIcon: const Icon(
                        Icons.person_outline,
                        color: Color.fromARGB(250, 218, 98, 17),
                      ),
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: const BorderSide(
                          color: Color.fromARGB(250, 218, 98, 17),
                          width: 1.5,
                        ),
                      ),
                      contentPadding: const EdgeInsets.symmetric(vertical: 20),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // 🔒 Password Field
                  TextFormField(
                    controller: passwordController,
                    obscureText: true,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter password';
                      }
                      return null;
                    },
                    decoration: InputDecoration(
                      hintText: 'Password',
                      prefixIcon: const Icon(
                        Icons.lock_outline,
                        color: Color.fromARGB(250, 218, 98, 17),
                      ),
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: const BorderSide(
                          color: Color.fromARGB(250, 218, 98, 17),
                          width: 1.5,
                        ),
                      ),
                      contentPadding: const EdgeInsets.symmetric(vertical: 20),
                    ),
                  ),
                  const SizedBox(height: 40),

                  // 🚀 Login Button
                  GestureDetector(
                    onTap: () {
                      if (formkey.currentState!.validate()) {
                        Loginapi(context);
                      }
                    },
                    child: Container(
                      width: double.infinity,
                      height: 60,
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [
                            Color.fromARGB(250, 218, 98, 17),
                            Color.fromARGB(255, 255, 140, 0),
                          ],
                        ),
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: const Color.fromARGB(
                              250,
                              218,
                              98,
                              17,
                            ).withOpacity(0.3),
                            blurRadius: 15,
                            offset: const Offset(0, 8),
                          ),
                        ],
                      ),
                      child: const Center(
                        child: Text(
                          "Login",
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 30),

                  // 🆕 Register Link
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        "Don't have an account? ",
                        style: TextStyle(
                          color: Colors.grey,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => const Register(),
                            ),
                          );
                        },
                        child: const Text(
                          "Register",
                          style: TextStyle(
                            color: Color.fromARGB(250, 218, 98, 17),
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 50),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
