import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';

class MyComplaintsPage extends StatefulWidget {
  const MyComplaintsPage({super.key});

  @override
  State<MyComplaintsPage> createState() => _MyComplaintsPageState();
}

class _MyComplaintsPageState extends State<MyComplaintsPage> {
  bool loading = true;
  String error = "";
  List complaints = [];

  @override
  void initState() {
    super.initState();
    fetchComplaints();
  }

  Future<void> fetchComplaints() async {
    try {
      final res = await dio.get("$baseUrl/api/getreply/$usrid");

      if (res.data["success"] == true) {
        setState(() {
          complaints = res.data["complaints"];
          loading = false;
        });
      } else {
        setState(() {
          error = "Failed to fetch complaints";
          loading = false;
        });
      }
    } catch (e) {
      setState(() {
        error = "Something went wrong. Please try again.";
        loading = false;
      });
    }
  }

  Color statusColor(bool replied) =>
      replied ? Colors.green.shade600 : Colors.orange.shade700;

  Color statusBg(bool replied) =>
      replied ? Colors.green.shade100 : Colors.orange.shade100;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,

      /// 🔹 APP BAR
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,
        title: const Text(
          "My Complaints",
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: ElevatedButton.icon(
              onPressed: () {
                Navigator.pushNamed(context, "/sendComplaint");
              },
              icon: const Icon(Icons.add, size: 18),
              label: const Text("New"),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color.fromARGB(250, 218, 98, 17),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
            ),
          )
        ],
      ),

      /// 🔹 BODY
      body: loading
          ? const Center(
              child: SpinKitFadingCircle(
                color: Color.fromARGB(250, 218, 98, 17),
                size: 45,
              ),
            )
          : error.isNotEmpty
              ? Center(
                  child: Text(
                    error,
                    style: const TextStyle(color: Colors.red),
                  ),
                )
              : complaints.isEmpty
                  ? _emptyState()
                  : ListView.builder(
                      padding: const EdgeInsets.all(16),
                      itemCount: complaints.length,
                      itemBuilder: (_, i) {
                        final c = complaints[i];
                        final bool replied = c["reply"] != null;

                        return AnimatedContainer(
                          duration: const Duration(milliseconds: 400),
                          margin: const EdgeInsets.only(bottom: 18),
                          padding: const EdgeInsets.all(20),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.05),
                                blurRadius: 14,
                                offset: const Offset(0, 6),
                              ),
                            ],
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              /// DATE + STATUS
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      const Icon(Icons.calendar_today,
                                          size: 16, color: Colors.grey),
                                      const SizedBox(width: 6),
                                      Text(
                                        DateTime.parse(c["date"])
                                            .toLocal()
                                            .toString()
                                            .split(" ")
                                            .first,
                                        style: const TextStyle(
                                            color: Colors.grey),
                                      ),
                                    ],
                                  ),
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 14, vertical: 6),
                                    decoration: BoxDecoration(
                                      color: statusBg(replied),
                                      borderRadius: BorderRadius.circular(20),
                                    ),
                                    child: Text(
                                      replied ? "Replied" : "Pending",
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        color: statusColor(replied),
                                      ),
                                    ),
                                  ),
                                ],
                              ),

                              const SizedBox(height: 14),

                              /// ISSUE
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(Icons.report_problem,
                                      color: Colors.red),
                                  const SizedBox(width: 10),
                                  Expanded(
                                    child: Text(
                                      c["issue"],
                                      style: const TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ],
                              ),

                              /// ADMIN REPLY
                              if (replied) ...[
                                const SizedBox(height: 16),
                                Container(
                                  padding: const EdgeInsets.all(16),
                                  decoration: BoxDecoration(
                                    color: Colors.grey.shade50,
                                    borderRadius: BorderRadius.circular(16),
                                    border: Border(
                                      left: BorderSide(
                                        color: const Color.fromARGB(
                                            250, 218, 98, 17),
                                        width: 4,
                                      ),
                                    ),
                                  ),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: const [
                                          Icon(Icons.reply,
                                              color: Color.fromARGB(
                                                  250, 218, 98, 17),
                                              size: 18),
                                          SizedBox(width: 6),
                                          Text(
                                            "Admin Reply",
                                            style: TextStyle(
                                              fontWeight: FontWeight.bold,
                                              color: Color.fromARGB(
                                                  250, 218, 98, 17),
                                            ),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 10),
                                      Text(
                                        c["reply"]["message"],
                                        style: const TextStyle(height: 1.5),
                                      ),
                                      const SizedBox(height: 8),
                                      Text(
                                        "Replied on: ${DateTime.parse(c["reply"]["repliedAt"]).toLocal()}",
                                        style: const TextStyle(
                                            fontSize: 12,
                                            color: Colors.grey),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ],
                          ),
                        );
                      },
                    ),
    );
  }

  /// 🔹 EMPTY STATE
  Widget _emptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          Icon(Icons.inbox, size: 80, color: Colors.grey),
          SizedBox(height: 20),
          Text(
            "No complaints found",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 6),
          Text(
            "Have an issue? Raise a ticket.",
            style: TextStyle(color: Colors.grey),
          ),
        ],
      ),
    );
  }
}
