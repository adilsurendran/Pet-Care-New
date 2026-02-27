import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:petcareapp/login.dart';

/// 🔥 GLOBALS (USED BY ALL FILES)
String baseUrl = ""; // <-- dynamically set
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

  void apply() {
    if (ipController.text.isEmpty || portController.text.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("IP and Port are required")));
      return;
    }

    // 🔥 SET GLOBAL BASE URL
    baseUrl =
        "http://${ipController.text.trim()}:${portController.text.trim()}";

    ScaffoldMessenger.of(
      context,
    ).showSnackBar(SnackBar(content: Text("Base URL set to $baseUrl")));

    // ✅ REPLACE ROOT PAGE
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => const LoginPage()),
    );
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
            child: Column(
              children: [
                const SizedBox(height: 100),
                // 🌐 Network Icon
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
                    Icons.settings_ethernet_rounded,
                    color: Color.fromARGB(250, 218, 98, 17),
                    size: 60,
                  ),
                ),
                const SizedBox(height: 20),
                // 📝 Title
                const Text(
                  "Server Setup",
                  style: TextStyle(
                    color: Color.fromARGB(250, 218, 98, 17),
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Pacifico',
                  ),
                ),
                const Text(
                  "Configure your backend connection",
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 50),

                // 📶 IP Address Field
                TextFormField(
                  controller: ipController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'IPv4 Address (e.g., 192.168.1.72)',
                    prefixIcon: const Icon(
                      Icons.lan_outlined,
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
                    contentPadding: const EdgeInsets.symmetric(
                      vertical: 20,
                      horizontal: 15,
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                // 🔢 Port Field
                TextFormField(
                  controller: portController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'Port (e.g., 5000)',
                    prefixIcon: const Icon(
                      Icons.numbers_rounded,
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
                    contentPadding: const EdgeInsets.symmetric(
                      vertical: 20,
                      horizontal: 15,
                    ),
                  ),
                ),
                const SizedBox(height: 40),

                // 🚀 Apply Button
                GestureDetector(
                  onTap: apply,
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
                        "Apply Configuration",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 50),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
