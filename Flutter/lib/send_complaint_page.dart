import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';   // usrid
// dio, baseUrl

class SendComplaintPage extends StatefulWidget {
  const SendComplaintPage({super.key});

  @override
  State<SendComplaintPage> createState() => _SendComplaintPageState();
}

class _SendComplaintPageState extends State<SendComplaintPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController issueCtrl = TextEditingController();

  bool loading = false;
  String? message;
  bool success = false;

  @override
  void dispose() {
    issueCtrl.dispose();
    super.dispose();
  }

  Future<void> submitComplaint() async {
    if (!_formKey.currentState!.validate()) return;

    if (usrid == null || usrid!.isEmpty) {
      setState(() {
        message = "User not found. Please login again.";
        success = false;
      });
      return;
    }

    setState(() {
      loading = true;
      message = null;
    });

    try {
      final res = await dio.post(
        "$baseUrl/api/sendComplaint/$usrid",
        data: {
          "issue": issueCtrl.text.trim(),
        },
      );

      if (res.data["success"] == true) {
        setState(() {
          success = true;
          message = "Complaint sent successfully!";
          issueCtrl.clear();
        });

        // Auto go back after success
        Future.delayed(const Duration(seconds: 2), () {
          if (mounted) Navigator.pop(context);
        });
      } else {
        setState(() {
          success = false;
          message = "Failed to send complaint.";
        });
      }
    } catch (e) {
      print(e);
      setState(() {
        success = false;
        message = "Error sending complaint. Please try again.";
      });
    } finally {
      setState(() => loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,

      appBar: AppBar(
        title: const Text(
          "Send Complaint",
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios_new,
            color: Color.fromARGB(250, 218, 98, 17),
          ),
          onPressed: () => Navigator.pop(context),
        ),
      ),

      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 520),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                /// HEADER
                Column(
                  children: const [
                    Icon(
                      Icons.report_problem_rounded,
                      size: 60,
                      color: Color.fromARGB(250, 218, 98, 17),
                    ),
                    SizedBox(height: 12),
                    Text(
                      "Submit a Complaint",
                      style: TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 6),
                    Text(
                      "We’re here to help. Describe your issue below.",
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.grey),
                    ),
                  ],
                ),

                const SizedBox(height: 30),

                /// CARD
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(24),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.06),
                        blurRadius: 20,
                        offset: const Offset(0, 8),
                      )
                    ],
                  ),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        /// MESSAGE
                        if (message != null)
                          Container(
                            padding: const EdgeInsets.all(14),
                            margin: const EdgeInsets.only(bottom: 20),
                            decoration: BoxDecoration(
                              color: success
                                  ? const Color(0xffdcfce7)
                                  : const Color(0xfffee2e2),
                              borderRadius: BorderRadius.circular(14),
                            ),
                            child: Text(
                              message!,
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontWeight: FontWeight.w600,
                                color: success
                                    ? const Color(0xff166534)
                                    : const Color(0xff991b1b),
                              ),
                            ),
                          ),

                        /// ISSUE FIELD
                        const Text(
                          "Describe Issue",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                        ),
                        const SizedBox(height: 10),
                        TextFormField(
                          controller: issueCtrl,
                          maxLines: 6,
                          validator: (v) =>
                              v == null || v.trim().isEmpty
                                  ? "Issue cannot be empty"
                                  : null,
                          decoration: InputDecoration(
                            hintText:
                                "E.g. I had an issue with my recent order...",
                            filled: true,
                            fillColor: Colors.grey.shade100,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(16),
                              borderSide: BorderSide.none,
                            ),
                            contentPadding: const EdgeInsets.all(16),
                          ),
                        ),

                        const SizedBox(height: 28),

                        /// SUBMIT BUTTON
                        SizedBox(
                          height: 56,
                          child: ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor:
                                  const Color.fromARGB(250, 218, 98, 17),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                              elevation: 6,
                            ),
                            icon: loading
                                ? const SizedBox(
                                    width: 22,
                                    height: 22,
                                    child: CircularProgressIndicator(
                                      strokeWidth: 2.5,
                                      color: Colors.white,
                                    ),
                                  )
                                : const Icon(Icons.send_rounded),
                            label: Text(
                              loading ? "Sending..." : "Send Complaint",
                              style: const TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            onPressed: loading ? null : submitComplaint,
                          ),
                        ),
                      ],
                    ),
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
