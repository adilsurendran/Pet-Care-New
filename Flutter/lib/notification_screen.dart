import 'package:flutter/material.dart';

class NotificationScreen extends StatefulWidget {
  const NotificationScreen({super.key});

  @override
  State<NotificationScreen> createState() => _NotificationScreenState();
}

class _NotificationScreenState extends State<NotificationScreen> {
  // Mock Data
  final List<Map<String, dynamic>> _friendRequests = [
    {
      'id': '1',
      'name': 'Rahul Sharma',
      'image': 'https://i.pravatar.cc/150?img=11',
      'time': '2 hrs ago',
    },
    {
      'id': '2',
      'name': 'Priya Patel',
      'image': 'https://i.pravatar.cc/150?img=5',
      'time': '5 hrs ago',
    },
  ];

  final List<Map<String, dynamic>> _alerts = [
    {
      'id': '1',
      'title': 'Appointment Confirmed',
      'message': 'Your appointment with Dr. Alex is confirmed for tomorrow at 10:00 AM.',
      'time': '1 day ago',
      'type': 'Doctor',
      'icon': Icons.medical_services_rounded,
      'color': Colors.blue,
    },
    {
      'id': '2',
      'title': 'Order Shipped',
      'message': 'Your order #12345 from AKB Pet Shop has been shipped.',
      'time': '2 days ago',
      'type': 'Shop',
      'icon': Icons.local_shipping_rounded,
      'color': Colors.green,
    },
    {
      'id': '3',
      'title': 'System maintenance',
      'message': 'We will be undergoing maintenance tonight from 2 AM to 4 AM.',
      'time': '3 days ago',
      'type': 'Admin',
      'icon': Icons.admin_panel_settings_rounded,
      'color': Colors.orange,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text(
          "Notifications",
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Color.fromARGB(250, 218, 98, 17)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // 👥 FRIEND REQUESTS
          if (_friendRequests.isNotEmpty) ...[
            const Text(
              "Friend Requests",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            ..._friendRequests.map((req) => _buildFriendRequestCard(req)),
            const SizedBox(height: 24),
          ],

          // 🔔 ALERTS
          const Text(
            "Recent Updates",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          ..._alerts.map((alert) => _buildAlertCard(alert)),
        ],
      ),
    );
  }

  Widget _buildFriendRequestCard(Map<String, dynamic> req) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4, offset: const Offset(0, 2)),
        ],
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundImage: NetworkImage(req['image']),
            radius: 24,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  req['name'],
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
                Text(
                  "Sent you a friend request • ${req['time']}",
                  style: TextStyle(color: Colors.grey.shade600, fontSize: 12),
                ),
              ],
            ),
          ),
          Row(
            children: [
              _actionButton(Icons.check, Colors.green, () {
                setState(() {
                  _friendRequests.remove(req);
                  // Logic to accept friend
                });
              }),
              const SizedBox(width: 8),
              _actionButton(Icons.close, Colors.red, () {
                setState(() {
                  _friendRequests.remove(req);
                  // Logic to decline friend
                });
              }),
            ],
          )
        ],
      ),
    );
  }

  Widget _actionButton(IconData icon, Color color, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(30),
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          shape: BoxShape.circle,
        ),
        child: Icon(icon, color: color, size: 20),
      ),
    );
  }

  Widget _buildAlertCard(Map<String, dynamic> alert) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 4, offset: const Offset(0, 2)),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: (alert['color'] as Color).withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(alert['icon'], color: alert['color'], size: 24),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      alert['title'],
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    Text(
                      alert['time'],
                      style: TextStyle(color: Colors.grey.shade400, fontSize: 12),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  alert['message'],
                  style: TextStyle(color: Colors.grey.shade600, height: 1.4),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
