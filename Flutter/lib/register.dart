
// import 'package:dio/dio.dart';
// import 'package:flutter/material.dart';
// import 'package:petcareapp/api_config.dart';

// class Register extends StatefulWidget {
//   const Register({super.key});

//   @override
//   State<Register> createState() => _RegisterState();
// }

// // 🔹 Dio instance & base URL
// // final Dio dio = Dio();
// // const String baseUrl = 'http://192.168.1.72:5000';

// class _RegisterState extends State<Register> {
//   // 🔹 Controllers
//   final TextEditingController nameController = TextEditingController();
//   final TextEditingController emailController = TextEditingController();
//   final TextEditingController phoneController = TextEditingController();
//   final TextEditingController ageController = TextEditingController();
//   final TextEditingController passwordController = TextEditingController();
//   final TextEditingController confirmPasswordController = TextEditingController();
//   final TextEditingController city = TextEditingController();
//   final TextEditingController state = TextEditingController();
//   final TextEditingController pin = TextEditingController();

//   String? selectedGender;
//   bool isLoading = false;

//   // 🔹 API CALL
//   Future<void> registerApi() async {
//     if (passwordController.text != confirmPasswordController.text) {
//       showSnackBar("Passwords do not match");
//       return;
//     }

//     if (selectedGender == null) {
//       showSnackBar("Please select gender");
//       return;
//     }

//     try {
//       setState(() => isLoading = true);

//       final response = await dio.post(
//         '$baseUrl/api/userregistration',
//         data: {
//           "userFullname": nameController.text.trim(),
//           "userEmail": emailController.text.trim(),
//           "phone": phoneController.text.trim(),
//           "age": ageController.text.trim(),
//           "gender": selectedGender,
//           "userPassword": passwordController.text,
//           'city':city.text,
//           'state':state.text,
//           'pincode':pin.text
//         },
//       );
//       print(response.data);
//       if(response.statusCode==200 || response.statusCode==201){
//         ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Registration completed")));
//       }
//     else{
//            ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Registration Failed")));
//     }
     
//     } on DioException catch (e) {
//       showSnackBar(
//         e.response?.data["message"] ?? "Registration failed",
//       );
//     }
//     finally {
//     // ⭐ THIS IS THE FIX
//     setState(() => isLoading = false);
//     }
//   }

//   void showSnackBar(String message) {
//     ScaffoldMessenger.of(context)
//         .showSnackBar(SnackBar(content: Text(message)));
//   }

//   // 🔹 Dispose controllers
//   @override
//   void dispose() {
//     nameController.dispose();
//     emailController.dispose();
//     phoneController.dispose();
//     ageController.dispose();
//     passwordController.dispose();
//     confirmPasswordController.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.grey.shade100,

//       appBar: AppBar(
//         backgroundColor: Colors.white,
//         elevation: 1,
//         centerTitle: true,
//         leading: IconButton(
//           icon: const Icon(Icons.arrow_back_ios_new,
//               color: Color.fromARGB(250, 218, 98, 17)),
//           onPressed: () => Navigator.pop(context),
//         ),
//         title: const Text(
//           'Register',
//           style: TextStyle(
//             color: Color.fromARGB(250, 218, 98, 17),
//             fontSize: 22,
//             fontWeight: FontWeight.bold,
//             fontFamily: 'Pacifico',
//           ),
//         ),
//       ),

//       body: SingleChildScrollView(
//         padding: const EdgeInsets.all(16),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.stretch,
//           children: [
//             buildTextField('Name', controller: nameController),
//             const SizedBox(height: 14),

//             buildTextField('Email',
//                 controller: emailController,
//                 keyboardType: TextInputType.emailAddress),
//             const SizedBox(height: 14),

//             buildTextField('Phone',
//                 controller: phoneController,
//                 keyboardType: TextInputType.phone),
//             const SizedBox(height: 14),

//             buildTextField('Age',
//                 controller: ageController,
//                 keyboardType: TextInputType.number),
//             const SizedBox(height: 18),

//             // 🔘 Gender
//             Text(
//               "Gender",
//               style: TextStyle(
//                 fontSize: 14,
//                 fontWeight: FontWeight.w600,
//                 color: Colors.grey.shade700,
//               ),
//             ),
//             const SizedBox(height: 6),
//             Row(
//               children: [
//                 compactRadio("Male"),
//                 const SizedBox(width: 20),
//                 compactRadio("Female"),
//               ],
//             ),

//             const SizedBox(height: 18),

//             buildTextField(
//               'Password',
//               controller: passwordController,
//               obscure: true,
//             ),
//             const SizedBox(height: 14),

//             buildTextField(
//               'Confirm Password',
//               controller: confirmPasswordController,
//               obscure: true,
//             ),
//             const SizedBox(height: 14),
//             buildTextField('city', controller:city ),
//             const SizedBox(height: 14),
//             buildTextField('state', controller: state),
//             const SizedBox(height: 14),
//             buildTextField('pincode', controller: pin),
//             const SizedBox(height: 26),

//             // ✅ REGISTER BUTTON
//             SizedBox(
//               height: 50,
//               child: ElevatedButton(
//                 style: ElevatedButton.styleFrom(
//                   backgroundColor:
//                       const Color.fromARGB(250, 218, 98, 17),
//                   shape: RoundedRectangleBorder(
//                     borderRadius: BorderRadius.circular(12),
//                   ),
//                 ),
//                 onPressed: isLoading ? null : registerApi,
//                 child: isLoading
//                     ? const CircularProgressIndicator(color: Colors.white)
//                     : const Text(
//                         'Register',
//                         style: TextStyle(
//                           fontSize: 16,
//                           fontWeight: FontWeight.w600,
//                           color: Colors.white,
//                         ),
//                       ),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   // 🔘 Radio
//   Widget compactRadio(String value) {
//     return InkWell(
//       onTap: () => setState(() => selectedGender = value),
//       child: Row(
//         mainAxisSize: MainAxisSize.min,
//         children: [
//           Transform.scale(
//             scale: 0.85,
//             child: Radio<String>(
//               value: value,
//               groupValue: selectedGender,
//               activeColor: const Color.fromARGB(250, 218, 98, 17),
//               onChanged: (val) =>
//                   setState(() => selectedGender = val),
//             ),
//           ),
//           Text(value, style: const TextStyle(fontSize: 14)),
//         ],
//       ),
//     );
//   }

//   // 🔹 TextField
//   Widget buildTextField(
//     String label, {
//     required TextEditingController controller,
//     bool obscure = false,
//     TextInputType keyboardType = TextInputType.text,
//   }) {
//     return TextFormField(
//       controller: controller,
//       obscureText: obscure,
//       keyboardType: keyboardType,
//       decoration: inputDecoration(label),
//     );
//   }

//   InputDecoration inputDecoration(String label) {
//     return InputDecoration(
//       labelText: label,
//       filled: true,
//       fillColor: const Color.fromARGB(255, 233, 233, 233),
//       border: OutlineInputBorder(
//         borderRadius: BorderRadius.circular(12),
//       ),
//       enabledBorder: OutlineInputBorder(
//         borderRadius: BorderRadius.circular(12),
//         borderSide: BorderSide(color: Colors.grey.shade300),
//       ),
//       focusedBorder: OutlineInputBorder(
//         borderRadius: BorderRadius.circular(12),
//         borderSide: const BorderSide(
//           color: Color.fromARGB(250, 218, 98, 17),
//           width: 1.5,
//         ),
//       ),
//     );
//   }
// }

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => _RegisterState();
}

class _RegisterState extends State<Register> {

  final _formKey = GlobalKey<FormState>();

  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController ageController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  final TextEditingController city = TextEditingController();
  final TextEditingController state = TextEditingController();
  final TextEditingController pin = TextEditingController();

  String? selectedGender;
  bool isLoading = false;

  Future<void> registerApi() async {

    if (!_formKey.currentState!.validate()) return;

    if (selectedGender == null) {
      showSnackBar("Please select gender");
      return;
    }

    try {
      setState(() => isLoading = true);

      final response = await dio.post(
        '$baseUrl/api/userregistration',
        data: {
          "userFullname": nameController.text.trim(),
          "userEmail": emailController.text.trim(),
          "phone": phoneController.text.trim(),
          "age": ageController.text.trim(),
          "gender": selectedGender,
          "userPassword": passwordController.text,
          'city': city.text,
          'state': state.text,
          'pincode': pin.text
        },
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        ScaffoldMessenger.of(context)
            .showSnackBar(const SnackBar(content: Text("Registration completed")));
            // Clear fields
_formKey.currentState!.reset();
nameController.clear();
emailController.clear();
phoneController.clear();
ageController.clear();
passwordController.clear();
confirmPasswordController.clear();
city.clear();
state.clear();
pin.clear();
selectedGender = null;

// Navigate back to login
Navigator.pop(context);
      } else {
        ScaffoldMessenger.of(context)
            .showSnackBar(const SnackBar(content: Text("Registration Failed")));
      }

    } on DioException catch (e) {
      showSnackBar(e.response?.data["message"] ?? "Registration failed");
    } finally {
      setState(() => isLoading = false);
    }
  }

  void showSnackBar(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,

      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new,
              color: Color.fromARGB(250, 218, 98, 17)),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Register',
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontSize: 22,
            fontWeight: FontWeight.bold,
            fontFamily: 'Pacifico',
          ),
        ),
      ),

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [

              buildTextField('Name', controller: nameController,
                validator: (v)=>v!.length<3?"Min 3 characters":null),

              buildTextField('Email', controller: emailController,
                validator: (v)=>!RegExp(r'^[\w-.]+@([\w-]+\.)+[\w]{2,4}$').hasMatch(v!)?"Invalid email":null),

              buildTextField('Phone', controller: phoneController,
                validator: (v)=>!RegExp(r'^[0-9]{10}$').hasMatch(v!)?"10 digit phone required":null),

              buildTextField('Age', controller: ageController,
                keyboardType: TextInputType.number,
                validator: (v){
                  int? age=int.tryParse(v!);
                  if(age==null||age<1||age>100)return"Invalid age";
                  return null;
                }),

              const SizedBox(height: 12),

              Row(children:[
                compactRadio("Male"),
                const SizedBox(width:20),
                compactRadio("Female")
              ]),

              buildTextField('Password', controller: passwordController, obscure:true,
                validator:(v)=>v!.length<6?"Min 6 chars":null),

              buildTextField('Confirm Password', controller: confirmPasswordController, obscure:true,
                validator:(v)=>v!=passwordController.text?"Password mismatch":null),

              buildTextField('City', controller: city,
                validator:(v)=>v!.isEmpty?"Required":null),

              buildTextField('State', controller: state,
                validator:(v)=>v!.isEmpty?"Required":null),

              buildTextField('Pincode', controller: pin,
                validator:(v)=>!RegExp(r'^[0-9]{6}$').hasMatch(v!)?"6 digit pincode":null),

              const SizedBox(height: 20),

              SizedBox(
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(250, 218, 98, 17),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: isLoading?null:registerApi,
                  child: isLoading
                      ? const CircularProgressIndicator(color: Colors.white)
                      : const Text('Register',style: TextStyle(color:Colors.white)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget compactRadio(String value) {
    return Row(children:[
      Radio(value:value,groupValue:selectedGender,onChanged:(v)=>setState(()=>selectedGender=v)),
      Text(value)
    ]);
  }

  Widget buildTextField(String label,{
    required TextEditingController controller,
    bool obscure=false,
    TextInputType keyboardType=TextInputType.text,
    String? Function(String?)? validator,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom:14),
      child: TextFormField(
        controller: controller,
        obscureText: obscure,
        keyboardType: keyboardType,
        validator: validator,
        decoration: inputDecoration(label),
      ),
    );
  }

  InputDecoration inputDecoration(String label) {
    return InputDecoration(
      labelText: label,
      filled: true,
      fillColor: const Color.fromARGB(255, 233, 233, 233),
      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
    );
  }
}