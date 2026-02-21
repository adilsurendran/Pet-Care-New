import 'package:flutter/material.dart';

class Orderhistory extends StatelessWidget {
  const Orderhistory({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Order Details'),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(255, 6, 105, 205),
      ),
      body: ListView.builder(
        itemCount: 5,
        itemBuilder: (context, index) {
          return Card(
            margin: const EdgeInsets.all(8),
            child: ListTile(
              leading: Image.network(
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTXg4tIKeg0Bnc0O_Zf-ozGmZHhYnHkGUU6A&s',
                width: 60,
                height: 60,
                fit: BoxFit.cover,
              ),
              title: const Text(''),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  SizedBox(height: 4),
                  Text('Name'),
                  Text('Details'),
                ],
              ),
              trailing: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  backgroundColor: Colors.blue,
                  foregroundColor: Colors.white,
                ),
                onPressed: () {},
                child: const Text('Complete'),
              ),
            ),
          );
        },
      ),
    );
  }
}
