
import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:petcareapp/api_config.dart';
import 'package:url_launcher/url_launcher.dart';

class GuidePage extends StatefulWidget {
  const GuidePage({super.key});

  @override
  State<GuidePage> createState() => _GuidePageState();
}

class _GuidePageState extends State<GuidePage> {
  final Dio dio = Dio();
  bool loading = true;
  List guides = [];


  @override
  void initState() {
    super.initState();
    fetchGuides();
  }

  Future<void> fetchGuides() async {
    try {
      final response = await dio.get("$baseUrl/api/viewguides");
      setState(() {
        guides = response.data["guides"] ?? [];
        loading = false;
      });
    } catch (e) {
      loading = false;
      debugPrint("Error fetching guides: $e");
    }
  }

  Future<void> openVideo(String url) async {
    final uri = Uri.parse(url);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication)) {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Pet Guides"),
        centerTitle: true,
        foregroundColor: Color.fromARGB(250, 218, 98, 17),
        backgroundColor: const Color.fromARGB(255, 255, 255, 255), // SAME AS PREVIOUS
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(12),
              child: ListView.builder(
  itemCount: guides.length,
  itemBuilder: (context, index) {
    final guide = guides[index];
    final doctor = guide["docId"];

    return Card(
      elevation: 4,
      margin: const EdgeInsets.symmetric(vertical: 10),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min, // 🔑 IMPORTANT
          children: [
            /// TAG + DATE
            Row(
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.orange.shade50,
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: const Text(
                    "Tutorial",
                    style: TextStyle(
                      color: Colors.deepOrange,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Text(
                  guide["createdAt"] != null
                      ? DateTime.parse(guide["createdAt"])
                          .toLocal()
                          .toString()
                          .split(" ")
                          .first
                      : "",
                  style: const TextStyle(
                    color: Colors.grey,
                    fontSize: 12,
                  ),
                ),
              ],
            ),

            const SizedBox(height: 12),

            /// TITLE
            Text(
              guide["title"] ?? "No title",
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Color(0xff1e293b),
              ),
            ),

            const SizedBox(height: 8),

            /// DESCRIPTION (wraps naturally)
            Text(
              guide["description"] ?? "No description available.",
              style: const TextStyle(
                color: Colors.grey,
                height: 1.5,
              ),
            ),

            const SizedBox(height: 16),
            const Divider(),

            /// DOCTOR INFO
            Row(
              children: [
                const Icon(Icons.account_circle,
                    size: 40, color: Colors.grey),
                const SizedBox(width: 10),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      doctor?["doctorName"] ?? "Doctor",
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    Text(
                      doctor?["doctorQualification"] ?? "Specialist",
                      style: const TextStyle(
                        fontSize: 12,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ],
            ),

            const SizedBox(height: 16),

            /// BUTTON (no Spacer)
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: guide["videoUrl"] != null
                    ? () => openVideo(guide["videoUrl"])
                    : null,
                icon: const Icon(Icons.play_circle),
                label: const Text("Watch Video"),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red.shade50,
                  foregroundColor: Colors.red,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  },
)

              // child: GridView.builder(
              //   itemCount: guides.length,
              //   gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              //     crossAxisCount: 1,
              //     childAspectRatio: 0.9,
              //   ),
              //   itemBuilder: (context, index) {
              //     final guide = guides[index];
              //     final doctor = guide["docId"];

              //     return Card(
              //       elevation: 4,
              //       shape: RoundedRectangleBorder(
              //         borderRadius: BorderRadius.circular(20),
              //       ),
              //       child: Padding(
              //         padding: const EdgeInsets.all(20),
              //         child: Column(
              //           crossAxisAlignment: CrossAxisAlignment.start,
              //           children: [
              //             /// TAG + DATE
              //             Row(
              //               children: [
              //                 Container(
              //                   padding: const EdgeInsets.symmetric(
              //                       horizontal: 12, vertical: 6),
              //                   decoration: BoxDecoration(
              //                     color: Colors.orange.shade50,
              //                     borderRadius: BorderRadius.circular(15),
              //                   ),
              //                   child: const Text(
              //                     "Tutorial",
              //                     style: TextStyle(
              //                       color: Colors.deepOrange,
              //                       fontWeight: FontWeight.bold,
              //                       fontSize: 12,
              //                     ),
              //                   ),
              //                 ),
              //                 const SizedBox(width: 10),
              //                 Text(
              //                   guide["createdAt"] != null
              //                       ? DateTime.parse(guide["createdAt"])
              //                           .toLocal()
              //                           .toString()
              //                           .split(" ")
              //                           .first
              //                       : "",
              //                   style: const TextStyle(
              //                     color: Colors.grey,
              //                     fontSize: 12,
              //                   ),
              //                 ),
              //               ],
              //             ),

              //             const SizedBox(height: 15),

              //             /// TITLE
              //             Text(
              //               guide["title"] ?? "No title",
              //               style: const TextStyle(
              //                 fontSize: 20,
              //                 fontWeight: FontWeight.bold,
              //                 color: Color(0xff1e293b),
              //               ),
              //             ),

              //             const SizedBox(height: 10),

              //             /// DESCRIPTION
              //             Text(
              //               guide["description"] ??
              //                   "No description available.",
              //               style: const TextStyle(
              //                 color: Colors.grey,
              //                 height: 1.5,
              //               ),
              //             ),

              //             const SizedBox(height: 20),
              //             const Divider(),

              //             /// DOCTOR INFO
              //             Row(
              //               children: [
              //                 const Icon(Icons.account_circle,
              //                     size: 40, color: Colors.grey),
              //                 const SizedBox(width: 10),
              //                 Column(
              //                   crossAxisAlignment: CrossAxisAlignment.start,
              //                   children: [
              //                     Text(
              //                       doctor?["doctorName"] ?? "Doctor",
              //                       style: const TextStyle(
              //                         fontWeight: FontWeight.bold,
              //                       ),
              //                     ),
              //                     Text(
              //                       doctor?["doctorQualification"] ??
              //                           "Specialist",
              //                       style: const TextStyle(
              //                         fontSize: 12,
              //                         color: Colors.grey,
              //                       ),
              //                     ),
              //                   ],
              //                 ),
              //               ],
              //             ),

              //             const Spacer(),

              //             /// WATCH VIDEO BUTTON
              //             SizedBox(
              //               width: double.infinity,
              //               child: ElevatedButton.icon(
              //                 onPressed: guide["videoUrl"] != null
              //                     ? () => openVideo(guide["videoUrl"])
              //                     : null,
              //                 icon: const Icon(Icons.play_circle),
              //                 label: const Text("Watch Video"),
              //                 style: ElevatedButton.styleFrom(
              //                   backgroundColor: Colors.red.shade50,
              //                   foregroundColor: Colors.red,
              //                   shape: RoundedRectangleBorder(
              //                     borderRadius: BorderRadius.circular(12),
              //                   ),
              //                   padding:
              //                       const EdgeInsets.symmetric(vertical: 14),
              //                 ),
              //               ),
              //             ),
              //           ],
              //         ),
              //       ),
              //     );
              //   },
              // ),
            ),
    );
  }
}
