import 'package:flutter/material.dart';
import 'package:petcareapp/service_models.dart';
import 'package:petcareapp/chat_screen.dart';
import 'package:url_launcher/url_launcher.dart';

class DoctorDetailPage extends StatefulWidget {
  final Doctor doctor;

  const DoctorDetailPage({super.key, required this.doctor});

  @override
  State<DoctorDetailPage> createState() => _DoctorDetailPageState();
}

class _DoctorDetailPageState extends State<DoctorDetailPage> {
  Future<void> _makePhoneCall(String phoneNumber) async {
    // print("phno: " + phoneNumber);
    final Uri launchUri = Uri(scheme: 'tel', path: phoneNumber);
    await launchUrl(launchUri);
  }

  initState() {
    super.initState();
    print("Doctor Object: ${widget.doctor.phone}");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            backgroundColor: Colors.white,
            leading: IconButton(
              icon: const CircleAvatar(
                backgroundColor: Colors.white,
                child: Icon(
                  Icons.arrow_back_ios_new,
                  color: Color.fromARGB(250, 218, 98, 17),
                ),
              ),
              onPressed: () => Navigator.pop(context),
            ),
            flexibleSpace: FlexibleSpaceBar(
              background: Image.network(widget.doctor.image, fit: BoxFit.cover),
            ),
          ),
          SliverList(
            delegate: SliverChildListDelegate([
              Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            widget.doctor.name,
                            style: const TextStyle(
                              fontSize: 26,
                              fontWeight: FontWeight.bold,
                              color: Colors.black87,
                            ),
                          ),
                        ),
                        // Container(
                        //   padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        //   decoration: BoxDecoration(
                        //     color: Colors.orange.withOpacity(0.1),
                        //     borderRadius: BorderRadius.circular(20),
                        //   ),
                        //   child: Row(
                        //     children: [
                        //       const Icon(Icons.star, color: Colors.orange, size: 18),
                        //       const SizedBox(width: 4),
                        //       Text(
                        //         doctor.rating.toString(),
                        //         style: const TextStyle(
                        //           fontWeight: FontWeight.bold,
                        //           fontSize: 16,
                        //           color: Colors.orange,
                        //         ),
                        //       ),
                        //     ],
                        //   ),
                        // ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      widget.doctor.qualification,
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey.shade600,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      widget.doctor.location,
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey.shade500,
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Info Cards
                    Row(
                      children: [
                        _infoCard("Experience", widget.doctor.experience),
                        const SizedBox(width: 14),
                        // _infoCard("Patients", "1000+"),
                      ],
                    ),

                    const SizedBox(height: 20),
                    const Text(
                      "About Doctor",
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      widget.doctor.description.isEmpty
                          ? "Dedicated professional committed to providing the best care for your pets."
                          : widget.doctor.description,
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey.shade600,
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 100), // Space for bottom button
                  ],
                ),
              ),
            ]),
          ),
        ],
      ),
      bottomSheet: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, -5),
            ),
          ],
        ),
        child: Row(
          children: [
            // CALL BUTTON
            Expanded(
              child: SizedBox(
                height: 55,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color.fromARGB(250, 218, 98, 17),
                    side: const BorderSide(
                      color: Color.fromARGB(250, 218, 98, 17),
                      width: 1.5,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 0,
                  ),
                  icon: const Icon(Icons.call),
                  label: const Text(
                    "Call",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  onPressed: () {
                    // print("Doctor data: ${}");
                    print("Name: ${widget.doctor.name}");
                    print("Phone: ${widget.doctor.phone}");
                    print("ID: ${widget.doctor.id}");

                    _makePhoneCall(widget.doctor.phone);
                  },
                ),
              ),
            ),

            if (!widget.doctor.isVet) ...[
              const SizedBox(width: 16),
              // CHAT BUTTON
              Expanded(
                child: SizedBox(
                  height: 55,
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromARGB(250, 218, 98, 17),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 5,
                    ),
                    icon: const Icon(Icons.chat_bubble_outline),
                    label: const Text(
                      "Chat",
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) => ChatScreen(
                            name: widget.doctor.name,
                            image: widget.doctor.image,
                            type: 'doctor',
                            id: widget.doctor.id,
                            docloginId: widget.doctor.docloginId,
                            fromProfile: true,
                          ),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _infoCard(String title, String value) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.grey.shade50,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.shade200),
        ),
        child: Column(
          children: [
            Text(
              value,
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(250, 218, 98, 17),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              title,
              style: TextStyle(fontSize: 14, color: Colors.grey.shade600),
            ),
          ],
        ),
      ),
    );
  }
}
