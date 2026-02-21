// import 'package:flutter/material.dart';
// import 'package:petcareapp/login.dart';
// import 'package:petcareapp/register.dart';
// import 'community_models.dart';

// class CommunityTab extends StatefulWidget {
//   const CommunityTab({super.key});

//   @override
//   State<CommunityTab> createState() => _CommunityTabState();
// }

// class _CommunityTabState extends State<CommunityTab> {
//   List<CommunityPost> posts = [];
//   bool loading = true;
//   final TextEditingController commentCtrl = TextEditingController();

//   @override
//   void initState() {
//     super.initState();
//     loadPosts();
//   }

//   Future<void> loadPosts() async {
//     final res = await dio.get("$baseUrl/api/community/posts");
//     setState(() {
//       posts = (res.data as List)
//           .map((e) => CommunityPost.fromJson(e))
//           .where((p) => p.userId != usrid)
//           .toList();
//       loading = false;
//     });
//   }

//   Future<void> likePost(String id) async {
//     await dio.put("$baseUrl/api/community/like/$id", data: {"userId": usrid});
//     loadPosts();
//   }

//   Future<void> commentPost(String id) async {
//     if (commentCtrl.text.trim().isEmpty) return;
//     await dio.post(
//       "$baseUrl/api/community/comment/$id",
//       data: {
//         "userId": usrid,
//         "userFullname": userFullname,
//         "text": commentCtrl.text,
//       },
//     );
//     commentCtrl.clear();
//     loadPosts();
//   }

//   @override
//   Widget build(BuildContext context) {
//     if (loading) return const Center(child: CircularProgressIndicator());

//     return ListView.builder(
//       padding: const EdgeInsets.all(16),
//       itemCount: posts.length,
//       itemBuilder: (_, i) {
//         final p = posts[i];
//         final liked = p.likes.contains(usrid);

//         return Card(
//           shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
//           margin: const EdgeInsets.only(bottom: 16),
//           child: Padding(
//             padding: const EdgeInsets.all(16),
//             child: Column(
//               crossAxisAlignment: CrossAxisAlignment.start,
//               children: [
//                 Text(p.userFullname,
//                     style: const TextStyle(fontWeight: FontWeight.bold)),
//                 Text(p.role, style: const TextStyle(color: Colors.grey)),
//                 const SizedBox(height: 8),
//                 Text(p.title,
//                     style:
//                         const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
//                 const SizedBox(height: 6),
//                 Text(p.description),
//                 if (p.image != null)
//                   Padding(
//                     padding: const EdgeInsets.only(top: 12),
//                     child: Image.network(
//                       "$baseUrl/uploads/${p.image}",
//                       // borderRadius: BorderRadius.circular(12),
//                     ),
//                   ),
//                 Row(
//                   children: [
//                     IconButton(
//                       icon: Icon(
//                         liked ? Icons.favorite : Icons.favorite_border,
//                         color: liked ? Colors.red : Colors.grey,
//                       ),
//                       onPressed: () => likePost(p.id),
//                     ),
//                     Text("${p.likes.length}"),
//                   ],
//                 ),
//                 TextField(
//                   controller: commentCtrl,
//                   decoration: InputDecoration(
//                     hintText: "Add a comment...",
//                     suffixIcon: IconButton(
//                       icon: const Icon(Icons.send),
//                       onPressed: () => commentPost(p.id),
//                     ),
//                   ),
//                 ),
//               ],
//             ),
//           ),
//         );
//       },
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';
import 'community_models.dart';

class CommunityTab extends StatefulWidget {
  const CommunityTab({super.key});

  @override
  State<CommunityTab> createState() => _CommunityTabState();
}

class _CommunityTabState extends State<CommunityTab> {
  List<CommunityPost> posts = [];
  bool loading = true;

  /// 🔑 ONE controller per post
  final Map<String, TextEditingController> _commentControllers = {};

  @override
  void initState() {
    super.initState();
    loadPosts();
  }

  @override
  void dispose() {
    for (final c in _commentControllers.values) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> loadPosts() async {
    final res = await dio.get("$baseUrl/api/community/posts");

    setState(() {
      posts = (res.data as List)
          .map((e) => CommunityPost.fromJson(e))
          // .where((p) => p.userId != usrid)
          .where((p) => p.postedBy.userId != usrid)
          .toList();

      for (final p in posts) {
        _commentControllers.putIfAbsent(
          p.id,
          () => TextEditingController(),
        );
      }

      loading = false;
    });
  }

  Future<void> likePost(String id) async {
    await dio.put(
      "$baseUrl/api/community/like/$id",
      data: {"userId": usrid},
    );
    loadPosts();
  }

  Future<void> commentPost(String postId) async {
    final ctrl = _commentControllers[postId];
    if (ctrl == null || ctrl.text.trim().isEmpty) return;

    await dio.post(
      "$baseUrl/api/community/comment/$postId",
      data: {
        "userId": usrid,
        "userFullname": userFullname,
        "text": ctrl.text.trim(),
      },
    );

    ctrl.clear();
    loadPosts();
  }

  void showComments(CommunityPost post) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) {
        return Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "Comments (${post.comments.length})",
                style:
                    const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Expanded(
                child: post.comments.isEmpty
                    ? const Center(child: Text("No comments yet"))
                    : ListView.builder(
                        itemCount: post.comments.length,
                        itemBuilder: (_, i) {
                          final c = post.comments[i];
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                CircleAvatar(
                                  radius: 18,
                                  child: Text(
                                    c.userFullname[0].toUpperCase(),
                                  ),
                                ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Container(
                                    padding: const EdgeInsets.all(12),
                                    decoration: BoxDecoration(
                                      color: Colors.grey.shade100,
                                      borderRadius: BorderRadius.circular(14),
                                    ),
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          c.userFullname,
                                          style: const TextStyle(
                                              fontWeight: FontWeight.bold),
                                        ),
                                        const SizedBox(height: 4),
                                        Text(c.text),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Center(child: CircularProgressIndicator());
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: posts.length,
      itemBuilder: (_, i) {
        final p = posts[i];
        final liked = p.likes.contains(usrid);
        final commentCtrl = _commentControllers[p.id]!;

        return Container(
          margin: const EdgeInsets.only(bottom: 18),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.04),
                blurRadius: 12,
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              /// HEADER
              Row(
                children: [
                  CircleAvatar(
                    child: Text(p.postedBy.userFullname[0].toUpperCase()),
                  ),
                  const SizedBox(width: 10),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(p.postedBy.userFullname,
                          style:
                              const TextStyle(fontWeight: FontWeight.bold)),
                      Text(p.postedBy.role,
                          style:
                              const TextStyle(color: Colors.grey, fontSize: 12)),
                    ],
                  ),
                ],
              ),

              const SizedBox(height: 12),

              Text(
                p.title,
                style:
                    const TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 6),
              Text(p.description),

              if (p.image != null) ...[
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Image.network(
                    "$baseUrl/uploads/${p.image}",
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
              ],

              const SizedBox(height: 12),

              /// ACTION BAR
              Row(
                children: [
                  IconButton(
                    icon: Icon(
                      liked ? Icons.favorite : Icons.favorite_border,
                      color: liked ? Colors.red : Colors.grey,
                    ),
                    onPressed: () => likePost(p.id),
                  ),
                  Text("${p.likes.length}"),

                  const SizedBox(width: 20),

                  IconButton(
                    icon: const Icon(Icons.mode_comment_outlined),
                    onPressed: () => showComments(p),
                  ),
                  Text("${p.comments.length}"),
                ],
              ),

              /// COMMENT INPUT
              TextField(
                controller: commentCtrl,
                decoration: InputDecoration(
                  hintText: "Add a comment...",
                  filled: true,
                  fillColor: Colors.grey.shade100,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14),
                    borderSide: BorderSide.none,
                  ),
                  suffixIcon: IconButton(
                    icon: const Icon(Icons.send),
                    onPressed: () => commentPost(p.id),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
