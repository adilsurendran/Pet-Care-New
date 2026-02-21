import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:petcareapp/login.dart';

/// 🔥 GLOBALS (USED BY ALL FILES)
String baseUrl = "";           // <-- dynamically set
final Dio dio = Dio();

/// 🔧 IP SETUP PAGE
class IpSetupPage extends StatefulWidget {
  const IpSetupPage({super.key});

  @override
  State<IpSetupPage> createState() => _IpSetupPageState();
}

class _IpSetupPageState extends State<IpSetupPage> {
  final TextEditingController ipController = TextEditingController();
  final TextEditingController portController = TextEditingController();

  // void apply() {
  //   if (ipController.text.isEmpty || portController.text.isEmpty) {
  //     ScaffoldMessenger.of(context).showSnackBar(
  //       const SnackBar(content: Text("IP and Port are required")),
  //     );
  //     Navigator.pushReplacement(
  //       context,
  //       MaterialPageRoute(builder: (context) => LoginPage()),
  //     );
  //     return;
  //   }

  //   // 🔥 SET GLOBAL BASE URL
  //   baseUrl = "http://${ipController.text.trim()}:${portController.text.trim()}";

  //   ScaffoldMessenger.of(context).showSnackBar(
  //     SnackBar(content: Text("Base URL set to $baseUrl")),
  //   );

  //   Navigator.pop(context);
  // }

//   void apply() {
//   if (ipController.text.isEmpty || portController.text.isEmpty) {
//     ScaffoldMessenger.of(context).showSnackBar(
//       const SnackBar(content: Text("IP and Port are required")),
//     );
//     return; // ✅ STOP HERE — NO NAVIGATION
//   }

//   // 🔥 SET GLOBAL BASE URL
//   baseUrl =
//       "http://${ipController.text.trim()}:${portController.text.trim()}";

//   ScaffoldMessenger.of(context).showSnackBar(
//     SnackBar(content: Text("Base URL set to $baseUrl")),
//   );

//   Navigator.pop(context); // ✅ SAFE: page was pushed before
// }

void apply() {
  if (ipController.text.isEmpty || portController.text.isEmpty) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("IP and Port are required")),
    );
    return;
  }

  // 🔥 SET GLOBAL BASE URL
  baseUrl =
      "http://${ipController.text.trim()}:${portController.text.trim()}";

  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(content: Text("Base URL set to $baseUrl")),
  );

  // ✅ REPLACE ROOT PAGE
  Navigator.pushReplacement(
    context,
    MaterialPageRoute(builder: (_) => const LoginPage()),
  );
}



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Server IP Setup"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextFormField(
              controller: ipController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: "IPv4 Address",
                hintText: "192.168.1.72",
              ),
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: portController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: "Port",
                hintText: "5000",
              ),
            ),
            const SizedBox(height: 30),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton(
                onPressed: apply,
                child: const Text("Apply"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
