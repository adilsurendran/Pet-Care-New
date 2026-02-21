// import 'package:flutter/material.dart';
// import 'package:petcareapp/login.dart';
// import 'package:petcareapp/register.dart';
// import 'package:petcareapp/service_manager.dart';
// import 'package:petcareapp/user_profile_page.dart';
// import 'package:petcareapp/details/doctor_detail_page.dart';
// import 'package:petcareapp/details/shop_detail_page.dart';

// class ChatScreen extends StatefulWidget {
//   final String name;
//   final String image;
//   final String type; // 'doctor', 'shop', 'friend'
//   final String id; // ID for doctor/shop, or ignore for friend if not needed
//   final bool fromProfile;
//   final String docloginId;

//   const ChatScreen({
//     super.key, 
//     required this.name, 
//     required this.image,
//     required this.id,
//     required this.type,
//     required this.docloginId,
//     // this.type, // Default
//     // this.id,
//     this.fromProfile = false,
//   });

//   @override
//   State<ChatScreen> createState() => _ChatScreenState();
// }



// class _ChatScreenState extends State<ChatScreen> {
  
//   final TextEditingController _messageController = TextEditingController();
//   final List<Map<String, dynamic>> _messages = [
//     {"text": "Hello! How can I help you today?", "isMe": false, "time": "10:00 AM"},
//   ];

//   void _sendMessage() {
//     if (_messageController.text.trim().isEmpty) return;
//     // setState(() {
//     //   _messages.add({
//     //     "text": _messageController.text,
//     //     "isMe": true,
//     //     "time": "${DateTime.now().hour}:${DateTime.now().minute.toString().padLeft(2, '0')}"
//     //   });
//     //   _messageController.clear();
//     // });
    
//     // Simulate reply
//     // Future.delayed(const Duration(seconds: 1), () {
//     //   if (mounted) {
//     //     setState(() {
//     //       _messages.add({
//     //         "text": "Thanks for reaching out. I will get back to you shortly.",
//     //         "isMe": false,
//     //          "time": "${DateTime.now().hour}:${DateTime.now().minute.toString().padLeft(2, '0')}"
//     //       });
//     //     });
//     //   }
//     // });
//     Future<void> initChatWithDoctorApi() async{
//       try {
//         final response = await dio.post('$baseUrl/api/chat',data: {"userId":usrid,"doctorLoginId":widget.docloginId});
//         print(response);
//       } catch (e) {
//         print(e);
//       }
//     }
//   }

//   void _navigateToProfile() {
//     if (widget.fromProfile) {
//       Navigator.pop(context);
//     } else {
//       if (widget.type == 'doctor') {
//         final doctor = ServiceManager().doctors.firstWhere((d) => d.id == widget.id, orElse: () => ServiceManager().doctors[0]);
//         Navigator.push(context, MaterialPageRoute(builder: (_) => DoctorDetailPage(doctor: doctor)));
//       } else if (widget.type == 'shop') {
//         final shop = ServiceManager().shops.firstWhere((s) => s.id == widget.id, orElse: () => ServiceManager().shops[0]);
//         Navigator.push(context, MaterialPageRoute(builder: (_) => ShopDetailPage(shop: shop)));
//       } else {
//         // Friend
//          Navigator.push(context, MaterialPageRoute(builder: (_) => UserProfilePage(name: widget.name, image: widget.image)));
//       }
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.grey.shade100,
//       appBar: AppBar(
//         title: GestureDetector(
//           onTap: _navigateToProfile,
//           child: Row(
//             children: [
//               CircleAvatar(
//                 backgroundImage: NetworkImage(widget.image),
//                  radius: 18,
//               ),
//               const SizedBox(width: 10),
//               Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   Text(widget.name, style: const TextStyle(fontSize: 16)),
//                   Text("Tap to view profile", style: TextStyle(fontSize: 10, color: Colors.grey.shade500)),
//                 ],
//               ),
//             ],
//           ),
//         ),
//         backgroundColor: Colors.white,
//         elevation: 1,
//          leading: IconButton(
//           icon: const Icon(Icons.arrow_back_ios_new, color: Color.fromARGB(250, 218, 98, 17)),
//           onPressed: () => Navigator.pop(context),
//         ),
//       ),
//       body: Column(
//         children: [
//           Expanded(
//             child: ListView.builder(
//               padding: const EdgeInsets.all(16),
//               itemCount: _messages.length,
//               itemBuilder: (context, index) {
//                 final msg = _messages[index];
//                 final isMe = msg['isMe'];
//                 return Align(
//                   alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
//                   child: Container(
//                     margin: const EdgeInsets.symmetric(vertical: 4),
//                     padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
//                     decoration: BoxDecoration(
//                       color: isMe ? const Color.fromARGB(250, 218, 98, 17) : Colors.white,
//                       borderRadius: BorderRadius.only(
//                         topLeft: const Radius.circular(16),
//                         topRight: const Radius.circular(16),
//                         bottomLeft: isMe ? const Radius.circular(16) : Radius.zero,
//                         bottomRight: isMe ? Radius.zero : const Radius.circular(16),
//                       ),
//                       boxShadow: [
//                         BoxShadow(
//                           color: Colors.black.withOpacity(0.05),
//                           blurRadius: 5,
//                           offset: const Offset(0, 2),
//                         ),
//                       ],
//                     ),
//                     child: Column(
//                       crossAxisAlignment: CrossAxisAlignment.end,
//                       mainAxisSize: MainAxisSize.min,
//                       children: [
//                         Text(
//                           msg['text'],
//                           style: TextStyle(
//                             color: isMe ? Colors.white : Colors.black87,
//                             fontSize: 15,
//                           ),
//                         ),
//                         const SizedBox(height: 4),
//                         Text(
//                           msg['time'],
//                           style: TextStyle(
//                             color: isMe ? Colors.white70 : Colors.grey.shade500,
//                             fontSize: 10,
//                           ),
//                         ),
//                       ],
//                     ),
//                   ),
//                 );
//               },
//             ),
//           ),
//           Container(
//             padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
//             color: Colors.white,
//             child: Row(
//               children: [
//                 Expanded(
//                   child: TextField(
//                     controller: _messageController,
//                     decoration: InputDecoration(
//                       hintText: "Type a message...",
//                       filled: true,
//                       fillColor: Colors.grey.shade100,
//                       contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
//                       border: OutlineInputBorder(
//                         borderRadius: BorderRadius.circular(30),
//                         borderSide: BorderSide.none,
//                       ),
//                     ),
//                   ),
//                 ),
//                 const SizedBox(width: 8),
//                 CircleAvatar(
//                   backgroundColor: const Color.fromARGB(250, 218, 98, 17),
//                   radius: 24,
//                   child: IconButton(
//                     icon: const Icon(Icons.send, color: Colors.white, size: 20),
//                     onPressed: _sendMessage,
//                   ),
//                 ),
//               ],
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }


import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/details/doctor_detail_page.dart';
import 'package:petcareapp/service_manager.dart';
import 'package:petcareapp/user_profile_page.dart';
import 'login.dart'; // contains dio, baseUrl, usrid

class ChatScreen extends StatefulWidget {
  final String name;
  final String image;
  final String type; // doctor / shop / friend
  final String id;
  final String docloginId;
  final bool fromProfile;

  const ChatScreen({
    super.key,
    required this.name,
    required this.image,
    required this.type,
    required this.id,
    required this.docloginId,
    this.fromProfile = false,
  });

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _messageController = TextEditingController();

  String? chatId;
  List<dynamic> messages = [];
  bool loading = true;

  /* -------------------- LIFECYCLE -------------------- */

  @override
  void initState() {
    super.initState();
    initChatWithDoctor();
  }

  /* -------------------- API CALLS -------------------- */

  /// CREATE or GET chat (React: initChatWithDoctor)
  Future<void> initChatWithDoctor() async {
    try {
      final res = await dio.post(
        '$baseUrl/api/chat',
        data: {
          "userId": usrid,
          "doctorLoginId": widget.docloginId,
        },
      );

      chatId = res.data['_id'];
      await fetchMessages();
    } catch (e) {
      debugPrint("initChat error: $e");
    } finally {
      setState(() => loading = false);
    }
  }

  /// FETCH messages (React: openChat)
  Future<void> fetchMessages() async {
    if (chatId == null) return;

    try {
      final res = await dio.get(
        '$baseUrl/api/chat/messages/$chatId',
      );

      setState(() {
        messages = res.data;
      });
    } catch (e) {
      debugPrint("fetchMessages error: $e");
    }
  }

  /// SEND message (React: sendMessage)
  Future<void> sendMessage() async {
    if (_messageController.text.trim().isEmpty || chatId == null) return;

    try {
      final res = await dio.post(
        '$baseUrl/api/chat/message',
        data: {
          "chatId": chatId,
          "senderRole": "user",
          "message": _messageController.text.trim(),
        },
      );

      setState(() {
        messages.add(res.data);
      });

      _messageController.clear();
    } catch (e) {
      debugPrint("sendMessage error: $e");
    }
  }

  /* -------------------- NAVIGATION -------------------- */

  void _navigateToProfile() {
    if (widget.fromProfile) {
      Navigator.pop(context);
      return;
    }

    if (widget.type == 'doctor') {
      final doctor = ServiceManager()
          .doctors
          .firstWhere((d) => d.id == widget.id);
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => DoctorDetailPage(doctor: doctor),
        ),
      );
    } else {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) =>
              UserProfilePage(name: widget.name, image: widget.image),
        ),
      );
    }
  }

  /* -------------------- UI -------------------- */

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        elevation: 1,
        backgroundColor: Colors.white,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new,
              color: Color.fromARGB(250, 218, 98, 17)),
          onPressed: () => Navigator.pop(context),
        ),
        title: GestureDetector(
          onTap: _navigateToProfile,
          child: Row(
            children: [
              CircleAvatar(backgroundImage: NetworkImage(widget.image)),
              const SizedBox(width: 10),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(widget.name,
                      style: const TextStyle(
                          fontSize: 16, fontWeight: FontWeight.w600)),
                  Text("Tap to view profile",
                      style:
                          TextStyle(fontSize: 10, color: Colors.grey.shade500)),
                ],
              )
            ],
          ),
        ),
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: messages.length,
                    itemBuilder: (context, index) {
                      final msg = messages[index];
                      final isMe = msg['senderRole'] == 'user';

                      return Align(
                        alignment: isMe
                            ? Alignment.centerRight
                            : Alignment.centerLeft,
                        child: Container(
                          margin: const EdgeInsets.symmetric(vertical: 4),
                          padding: const EdgeInsets.symmetric(
                              horizontal: 16, vertical: 12),
                          decoration: BoxDecoration(
                            color: isMe
                                ? const Color.fromARGB(250, 218, 98, 17)
                                : Colors.white,
                            borderRadius: BorderRadius.only(
                              topLeft: const Radius.circular(16),
                              topRight: const Radius.circular(16),
                              bottomLeft: isMe
                                  ? const Radius.circular(16)
                                  : Radius.zero,
                              bottomRight: isMe
                                  ? Radius.zero
                                  : const Radius.circular(16),
                            ),
                          ),
                          child: Text(
                            msg['message'],
                            style: TextStyle(
                                color:
                                    isMe ? Colors.white : Colors.black87),
                          ),
                        ),
                      );
                    },
                  ),
                ),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  color: Colors.white,
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _messageController,
                          decoration: InputDecoration(
                            hintText: "Type a message...",
                            filled: true,
                            fillColor: Colors.grey.shade100,
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(30),
                              borderSide: BorderSide.none,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      CircleAvatar(
                        backgroundColor:
                            const Color.fromARGB(250, 218, 98, 17),
                        child: IconButton(
                          icon: const Icon(Icons.send, color: Colors.white),
                          onPressed: sendMessage,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}
