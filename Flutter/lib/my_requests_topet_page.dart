import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';

class MyPetRequestsPage extends StatefulWidget {
  const MyPetRequestsPage({super.key});

  @override
  State<MyPetRequestsPage> createState() => _MyPetRequestsPageState();
}

class _MyPetRequestsPageState extends State<MyPetRequestsPage> {
  List orders = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchMyRequests();
  }

  Future<void> fetchMyRequests() async {
    try {
      final res = await dio.get('$baseUrl/api/orders/buyer/$usrid');
      setState(() {
        orders = res.data ?? [];
        loading = false;
      });
    } catch (e) {
      debugPrint("Fetch Orders Error: $e");
      setState(() => loading = false);
    }
  }

  Future<void> updateOrderStatus(String orderId, String status) async {
    try {
      await dio.put(
        '$baseUrl/api/order/$orderId',
        data: {"status": status},
      );
      fetchMyRequests();
    } catch (e) {
      debugPrint("Update Status Error: $e");
    }
  }

  Color _statusBg(String status) {
    switch (status) {
      case "Approved":
        return const Color(0xffdcfce7);
      case "Rejected":
        return const Color(0xfffee2e2);
      case "Delivered":
        return const Color(0xffe0f2fe);
      case "Pending":
      default:
        return const Color(0xfffef3c7);
    }
  }

  Color _statusText(String status) {
    switch (status) {
      case "Approved":
        return const Color(0xff166534);
      case "Rejected":
        return const Color(0xff991b1b);
      case "Delivered":
        return const Color(0xff075985);
      case "Pending":
      default:
        return const Color(0xff92400e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text(
          "My Requests",
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new,
              color: Color.fromARGB(250, 218, 98, 17)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : orders.isEmpty
              ? const Center(child: Text("No requests found"))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: orders.length,
                  itemBuilder: (context, index) {
                    final o = orders[index];
                    final pet = o["petId"];

                    return Container(
                      margin: const EdgeInsets.only(bottom: 16),
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.05),
                            blurRadius: 8,
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Pet name
                          Text(
                            pet?["name"] ?? "Unknown Pet",
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                          const SizedBox(height: 6),

                          // Status badge
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 12, vertical: 6),
                            decoration: BoxDecoration(
                              color: _statusBg(o["status"]),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              "Status: ${o["status"]}",
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 13,
                                color: _statusText(o["status"]),
                              ),
                            ),
                          ),

                          const SizedBox(height: 14),

                          // ACTION BUTTONS
                          Row(
                            children: [
                              if (o["status"] == "Pending")
                                Expanded(
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor:
                                          const Color(0xfffee2e2),
                                      foregroundColor:
                                          const Color(0xffef4444),
                                      shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(12),
                                      ),
                                    ),
                                    onPressed: () => updateOrderStatus(
                                        o["_id"], "Cancelled"),
                                    child: const Text(
                                      "Cancel",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ),

                              if (o["status"] == "Approved")
                                Expanded(
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor:
                                          const Color(0xffdcfce7),
                                      foregroundColor:
                                          const Color(0xff166534),
                                      shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(12),
                                      ),
                                    ),
                                    onPressed: () => updateOrderStatus(
                                        o["_id"], "Delivered"),
                                    child: const Text(
                                      "Delivered",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
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
