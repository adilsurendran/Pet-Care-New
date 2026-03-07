// import 'dart:convert';
// import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
// import 'package:petcareapp/login.dart';
// import 'package:petcareapp/register.dart';

// class MyOrdersPage extends StatefulWidget {
//   const MyOrdersPage({super.key});

//   @override
//   State<MyOrdersPage> createState() => _MyOrdersPageState();
// }

// class _MyOrdersPageState extends State<MyOrdersPage> {
//   List<dynamic> orders = [];
//   bool loading = true;

//   @override
//   void initState() {
//     super.initState();
//     fetchOrders();
//   }

//   Future<void> fetchOrders() async {
//     try {
//       final res = await dio.get("$baseUrl/api/ordersbyuser/$usrid");
//     print(res.data);
//     final data = jsonDecode(res.data);

//     setState(() {
//       orders = data["orders"] ?? [];
//       loading = false;
//     });
//     } catch (e) {
//       print(e);
//     }
//     // final userId = "USER_ID_FROM_STORAGE";

//   }

//   Future<void> cancelOrder(String id) async {
//     await dio.post("$baseUrl/cancelorder/$id");
//     fetchOrders();
//   }

//   Future<void> markDelivered(String id) async {
//     await dio.post("$baseUrl/deliverorder/$id");
//     fetchOrders();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text("My Orders"),
//         backgroundColor: Colors.white,
//         elevation: 0,
//         leading: BackButton(color: Colors.orange),
//       ),
//       body: loading
//           ? const Center(child: CircularProgressIndicator())
//           : orders.isEmpty
//               ? const Center(child: Text("No orders found"))
//               : ListView.builder(
//                   padding: const EdgeInsets.all(16),
//                   itemCount: orders.length,
//                   itemBuilder: (_, i) {
//                     final o = orders[i];
//                     return Card(
//                       margin: const EdgeInsets.only(bottom: 16),
//                       shape: RoundedRectangleBorder(
//                           borderRadius: BorderRadius.circular(16)),
//                       child: ListTile(
//                         title: Text(o["productId"]["ProductName"]),
//                         subtitle: Text("Qty: ${o["quantity"]}"),
//                         trailing: Column(
//                           mainAxisAlignment: MainAxisAlignment.center,
//                           children: [
//                             Text(o["status"]),
//                             const SizedBox(height: 6),
//                             if (o["status"] == "pending" ||
//                                 o["status"] == "confirmed")
//                               TextButton(
//                                 onPressed: () => cancelOrder(o["_id"]),
//                                 child: const Text("Cancel"),
//                               ),
//                             if (o["status"] == "confirmed")
//                               TextButton(
//                                 onPressed: () => markDelivered(o["_id"]),
//                                 child: const Text("Mark Delivered"),
//                               ),
//                           ],
//                         ),
//                       ),
//                     );
//                   },
//                 ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';

// import 'login.dart'; // where dio, baseUrl, usrid are defined

class MyOrdersPage extends StatefulWidget {
  const MyOrdersPage({super.key});

  @override
  State<MyOrdersPage> createState() => _MyOrdersPageState();
}

class _MyOrdersPageState extends State<MyOrdersPage> {
  List<dynamic> orders = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchOrders();
  }

  // =========================
  // FETCH ORDERS
  // =========================
  Future<void> fetchOrders() async {
    try {
      final res = await dio.get("$baseUrl/api/ordersbyuser/$usrid");

      // ✅ Dio already returns Map
      final data = res.data;

      setState(() {
        orders = data["orders"] ?? [];
        loading = false;
      });
    } catch (e) {
      loading = false;
      debugPrint("FETCH ORDERS ERROR: $e");
    }
  }

  // =========================
  // CANCEL ORDER
  // =========================
  Future<void> cancelOrder(String orderId) async {
    try {
      await dio.post("$baseUrl/api/cancelorder/$orderId");
      fetchOrders();
    } catch (e) {
      debugPrint("CANCEL ERROR: $e");
    }
  }

  void _confirmCancel(BuildContext context, String orderId) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text(
          "Cancel Order",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        content: const Text("Are you sure you want to cancel this order?"),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text(
              "Cancel",
              style: TextStyle(color: Colors.black54),
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              foregroundColor: Colors.white,
            ),
            onPressed: () {
              Navigator.pop(context);
              cancelOrder(orderId);
            },
            child: const Text("Proceed"),
          ),
        ],
      ),
    );
  }

  // =========================
  // MARK DELIVERED
  // =========================
  Future<void> markDelivered(String orderId) async {
    try {
      await dio.post("$baseUrl/api/deliverorder/$orderId");
      fetchOrders();
    } catch (e) {
      debugPrint("DELIVER ERROR: $e");
    }
  }

  void _confirmDeliver(BuildContext context, String orderId) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text(
          "Mark Delivered",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        content: const Text(
          "Are you sure you want to mark this order as delivered?",
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("No", style: TextStyle(color: Colors.black54)),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.green,
              foregroundColor: Colors.white,
            ),
            onPressed: () {
              Navigator.pop(context);
              markDelivered(orderId);
            },
            child: const Text("Yes"),
          ),
        ],
      ),
    );
  }

  // =========================
  // UI
  // =========================
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text("My Orders"),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: const BackButton(color: Colors.orange),
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : orders.isEmpty
          ? const Center(child: Text("No orders found"))
          : ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: orders.length,
              itemBuilder: (_, index) {
                final o = orders[index];
                final product = o["productId"];

                return Card(
                  margin: const EdgeInsets.only(bottom: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      children: [
                        // PRODUCT IMAGE
                        ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Image.network(
                            "$baseUrl/uploads/${product["screenshots"][0]}",
                            width: 70,
                            height: 70,
                            fit: BoxFit.cover,
                          ),
                        ),
                        const SizedBox(width: 16),

                        // PRODUCT INFO
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                product["ProductName"],
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                              const SizedBox(height: 6),
                              Text(
                                "Qty: ${o["quantity"]}",
                                style: const TextStyle(color: Colors.grey),
                              ),
                              const SizedBox(height: 6),
                              _statusBadge(o["status"]),
                            ],
                          ),
                        ),

                        // ACTIONS
                        Column(
                          children: [
                            if (o["status"] == "pending" ||
                                o["status"] == "confirmed")
                              TextButton(
                                onPressed: () =>
                                    _confirmCancel(context, o["_id"]),
                                child: const Text(
                                  "Cancel",
                                  style: TextStyle(color: Colors.red),
                                ),
                              ),
                            if (o["status"] == "confirmed")
                              TextButton(
                                onPressed: () =>
                                    _confirmDeliver(context, o["_id"]),
                                child: const Text(
                                  "Mark Delivered",
                                  style: TextStyle(color: Colors.green),
                                ),
                              ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
    );
  }

  // =========================
  // STATUS BADGE
  // =========================
  Widget _statusBadge(String status) {
    Color bg;
    Color fg;

    switch (status) {
      case "delivered":
        bg = Colors.green.shade100;
        fg = Colors.green.shade800;
        break;
      case "cancelled":
        bg = Colors.red.shade100;
        fg = Colors.red.shade800;
        break;
      default:
        bg = Colors.blue.shade100;
        fg = Colors.blue.shade800;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        status,
        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: fg),
      ),
    );
  }
}
