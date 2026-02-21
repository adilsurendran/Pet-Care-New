import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';

class MyPetRequestsPage extends StatefulWidget {
  const MyPetRequestsPage({super.key});

  @override
  State<MyPetRequestsPage> createState() => _MyPetRequestsPageState();
}

class _MyPetRequestsPageState extends State<MyPetRequestsPage> {
  List<dynamic> requests = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchRequests();
  }

  /* =========================
     FETCH SELLER REQUESTS
  ========================= */
  Future<void> fetchRequests() async {
    try {
      final res = await dio.get('$baseUrl/api/orders/seller/$usrid');

      setState(() {
        requests = res.data ?? [];
        loading = false;
      });
    } catch (e) {
      debugPrint("Fetch Requests Error: $e");
      setState(() => loading = false);
    }
  }

  /* =========================
     UPDATE REQUEST STATUS
  ========================= */
  Future<void> updateStatus(String orderId, String status) async {
    try {
      await dio.put(
        '$baseUrl/api/order/$orderId',
        data: {"status": status},
      );

      fetchRequests(); // refresh list
    } catch (e) {
      debugPrint("Update Status Error: $e");
    }
  }

  /* =========================
     CONFIRM DIALOG
  ========================= */
  void confirmAction(String orderId, String status) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text(
          status == "Approved" ? "Accept Request?" : "Reject Request?",
        ),
        content: Text(
          status == "Approved"
              ? "Do you want to accept this pet request?"
              : "Do you want to reject this pet request?",
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor:
                  status == "Approved" ? Colors.green : Colors.red,
            ),
            onPressed: () {
              Navigator.pop(context);
              updateStatus(orderId, status);
            },
            child: const Text("Continue"),
          ),
        ],
      ),
    );
  }

  /* =========================
     UI
  ========================= */
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
          "Pet Requests",
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : requests.isEmpty
              ? const Center(
                  child: Text(
                    "No requests available",
                    style: TextStyle(color: Colors.grey),
                  ),
                )
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: requests.length,
                  itemBuilder: (context, index) {
                    final req = requests[index];
                    final pet = req["petId"];
                    final buyer = req["buyerId"];

                    return Container(
                      margin: const EdgeInsets.only(bottom: 14),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(18),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.05),
                            blurRadius: 10,
                            offset: const Offset(0, 5),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // 🐶 PET NAME
                          Text(
                            pet?["name"] ?? "Unknown Pet",
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),

                          const SizedBox(height: 6),

                          // 👤 BUYER
                          Text(
                            "Requested by: ${buyer?["userFullname"] ?? "User"}",
                            style: const TextStyle(
                                fontSize: 13, color: Colors.grey),
                          ),

                          const SizedBox(height: 10),

                          // 📌 STATUS
                          Row(
                            children: [
                              const Text(
                                "Status: ",
                                style: TextStyle(fontWeight: FontWeight.w600),
                              ),
                              Text(
                                req["status"],
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: req["status"] == "Pending"
                                      ? Colors.orange
                                      : req["status"] == "Approved"
                                          ? Colors.green
                                          : Colors.red,
                                ),
                              ),
                            ],
                          ),

                          const SizedBox(height: 14),

                          // 🔘 ACTION BUTTONS
                          if (req["status"] == "Pending")
                            Row(
                              children: [
                                Expanded(
                                  child: ElevatedButton(
                                    onPressed: () => confirmAction(
                                        req["_id"], "Approved"),
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.green,
                                      shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(12),
                                      ),
                                    ),
                                    child: const Text("Accept"),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: ElevatedButton(
                                    onPressed: () => confirmAction(
                                        req["_id"], "Rejected"),
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.red,
                                      shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(12),
                                      ),
                                    ),
                                    child: const Text("Reject"),
                                  ),
                                ),
                              ],
                            ),
                        ],
                      ),
                    );
                  },
                ),
    );
  }
}
