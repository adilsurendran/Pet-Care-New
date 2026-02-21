// import 'package:flutter/material.dart';
// import 'package:petcareapp/login.dart';
// import 'package:petcareapp/register.dart';
// import 'community_models.dart';

// class CommunityAccountTab extends StatefulWidget {
//   const CommunityAccountTab({super.key});

//   @override
//   State<CommunityAccountTab> createState() => _CommunityAccountTabState();
// }

// class _CommunityAccountTabState extends State<CommunityAccountTab> {
//   List<CommunityPost> myPosts = [];
//   bool loading = true;

//   @override
//   void initState() {
//     super.initState();
//     loadMyPosts();
//   }

//   Future<void> loadMyPosts() async {
//     final res = await dio.get("$baseUrl/api/community/posts");  
//     print(res.data);
//     setState(() {
//       myPosts = (res.data as List)
//           .map((e) => CommunityPost.fromJson(e))
//           // .where((p) => p.userId == usrid)
//           .where((p) => p.postedBy.userId == usrid)
//           .toList();
//       loading = false;
//     });
//   }

//   Future<void> deletePost(String id) async {
//     await dio.delete("$baseUrl/api/community/post/$id");
//     loadMyPosts();
//   }

//   @override
//   Widget build(BuildContext context) {
//     if (loading) return const Center(child: CircularProgressIndicator());

//     return ListView.builder(
//       padding: const EdgeInsets.all(16),
//       itemCount: myPosts.length,
//       itemBuilder: (_, i) {
//         final p = myPosts[i];

//         return Card(
//           child: ListTile(
//             title: Text(p.title),
//             subtitle: Text("${p.likes.length} likes • ${p.comments.length} comments"),
//             trailing: IconButton(
//               icon: const Icon(Icons.delete, color: Colors.red),
//               onPressed: () => deletePost(p.id),
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

class CommunityAccountTab extends StatefulWidget {
  const CommunityAccountTab({super.key});

  @override
  State<CommunityAccountTab> createState() => _CommunityAccountTabState();
}

class _CommunityAccountTabState extends State<CommunityAccountTab> {
  List<CommunityPost> myPosts = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    loadMyPosts();
  }

  Future<void> loadMyPosts() async {
    final res = await dio.get("$baseUrl/api/community/posts");

    setState(() {
      myPosts = (res.data as List)
          .map((e) => CommunityPost.fromJson(e))
          .where((p) => p.postedBy.userId == usrid)
          .toList();
      loading = false;
    });
  }

  Future<void> deletePost(String id) async {
    await dio.delete("$baseUrl/api/community/post/$id");
    loadMyPosts();
  }

  /// 🔹 OPEN POST DETAILS
  // void openPostDetails(CommunityPost post) {
  //   showModalBottomSheet(
  //     context: context,
  //     isScrollControlled: true,
  //     backgroundColor: Colors.transparent,
  //     builder: (_) {
  //       return DraggableScrollableSheet(
  //         initialChildSize: 0.75,
  //         maxChildSize: 0.95,
  //         minChildSize: 0.5,
  //         builder: (_, controller) {
  //           return Container(
  //             padding: const EdgeInsets.all(20),
  //             decoration: const BoxDecoration(
  //               color: Colors.white,
  //               borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
  //             ),
  //             child: Column(
  //               crossAxisAlignment: CrossAxisAlignment.start,
  //               children: [
  //                 /// DRAG HANDLE
  //                 Center(
  //                   child: Container(
  //                     width: 40,
  //                     height: 4,
  //                     margin: const EdgeInsets.only(bottom: 16),
  //                     decoration: BoxDecoration(
  //                       color: Colors.grey.shade300,
  //                       borderRadius: BorderRadius.circular(10),
  //                     ),
  //                   ),
  //                 ),

  //                 /// TITLE
  //                 Text(
  //                   post.title,
  //                   style: const TextStyle(
  //                     fontSize: 20,
  //                     fontWeight: FontWeight.bold,
  //                   ),
  //                 ),

  //                 const SizedBox(height: 8),

  //                 /// DESCRIPTION
  //                 Text(
  //                   post.description,
  //                   style: TextStyle(
  //                     fontSize: 15,
  //                     color: Colors.grey.shade700,
  //                     height: 1.4,
  //                   ),
  //                 ),

  //                 if (post.image != null) ...[
  //                   const SizedBox(height: 14),
  //                   ClipRRect(
  //                     borderRadius: BorderRadius.circular(16),
  //                     child: Image.network(
  //                       "$baseUrl/uploads/${post.image}",
  //                       width: double.infinity,
  //                       fit: BoxFit.cover,
  //                     ),
  //                   ),
  //                 ],

  //                 const SizedBox(height: 16),

  //                 /// STATS
  //                 Row(
  //                   children: [
  //                     const Icon(Icons.favorite, size: 18, color: Colors.red),
  //                     const SizedBox(width: 6),
  //                     Text("${post.likes.length} likes"),
  //                     const SizedBox(width: 20),
  //                     const Icon(Icons.mode_comment_outlined, size: 18),
  //                     const SizedBox(width: 6),
  //                     Text("${post.comments.length} comments"),
  //                   ],
  //                 ),

  //                 const SizedBox(height: 16),
  //                 const Divider(),

  //                 /// COMMENTS HEADER
  //                 Text(
  //                   "Comments",
  //                   style: const TextStyle(
  //                     fontSize: 17,
  //                     fontWeight: FontWeight.bold,
  //                   ),
  //                 ),

  //                 const SizedBox(height: 10),

  //                 /// COMMENTS LIST
  //                 Expanded(
  //                   child: post.comments.isEmpty
  //                       ? const Center(
  //                           child: Text(
  //                             "No comments yet",
  //                             style: TextStyle(color: Colors.grey),
  //                           ),
  //                         )
  //                       : ListView.builder(
  //                           controller: controller,
  //                           itemCount: post.comments.length,
  //                           itemBuilder: (_, i) {
  //                             final c = post.comments[i];
  //                             return Padding(
  //                               padding:
  //                                   const EdgeInsets.symmetric(vertical: 8),
  //                               child: Row(
  //                                 crossAxisAlignment: CrossAxisAlignment.start,
  //                                 children: [
  //                                   CircleAvatar(
  //                                     radius: 18,
  //                                     backgroundColor: Colors.orange.shade100,
  //                                     child: Text(
  //                                       c.userFullname[0].toUpperCase(),
  //                                       style: const TextStyle(
  //                                         fontWeight: FontWeight.bold,
  //                                       ),
  //                                     ),
  //                                   ),
  //                                   const SizedBox(width: 10),
  //                                   Expanded(
  //                                     child: Container(
  //                                       padding: const EdgeInsets.all(12),
  //                                       decoration: BoxDecoration(
  //                                         color: Colors.grey.shade100,
  //                                         borderRadius:
  //                                             BorderRadius.circular(14),
  //                                       ),
  //                                       child: Column(
  //                                         crossAxisAlignment:
  //                                             CrossAxisAlignment.start,
  //                                         children: [
  //                                           Text(
  //                                             c.userFullname,
  //                                             style: const TextStyle(
  //                                               fontWeight: FontWeight.bold,
  //                                             ),
  //                                           ),
  //                                           const SizedBox(height: 4),
  //                                           Text(c.text),
  //                                         ],
  //                                       ),
  //                                     ),
  //                                   ),
  //                                 ],
  //                               ),
  //                             );
  //                           },
  //                         ),
  //                 ),
  //               ],
  //             ),
  //           );
  //         },
  //       );
  //     },
  //   );
  // }

  void openPostDetails(CommunityPost post) {
  showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (_) {
      return DraggableScrollableSheet(
        initialChildSize: 0.75,
        maxChildSize: 0.95,
        minChildSize: 0.5,
        builder: (_, controller) {
          return Container(
            padding: const EdgeInsets.all(20),
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
            ),

            // ✅ SINGLE SCROLLABLE
            child: ListView(
              controller: controller,
              children: [
                /// DRAG HANDLE
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade300,
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ),

                /// TITLE
                Text(
                  post.title,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 8),

                /// DESCRIPTION
                Text(
                  post.description,
                  style: TextStyle(
                    fontSize: 15,
                    color: Colors.grey.shade700,
                    height: 1.4,
                  ),
                ),

                if (post.image != null) ...[
                  const SizedBox(height: 14),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(16),
                    child: Image.network(
                      "$baseUrl/uploads/${post.image}",
                      fit: BoxFit.cover,
                    ),
                  ),
                ],

                const SizedBox(height: 16),

                /// STATS
                Row(
                  children: [
                    const Icon(Icons.favorite, size: 18, color: Colors.red),
                    const SizedBox(width: 6),
                    Text("${post.likes.length} likes"),
                    const SizedBox(width: 20),
                    const Icon(Icons.mode_comment_outlined, size: 18),
                    const SizedBox(width: 6),
                    Text("${post.comments.length} comments"),
                  ],
                ),

                const SizedBox(height: 16),
                const Divider(),

                /// COMMENTS HEADER
                const Text(
                  "Comments",
                  style: TextStyle(
                    fontSize: 17,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 10),

                /// COMMENTS
                if (post.comments.isEmpty)
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 24),
                    child: Center(
                      child: Text(
                        "No comments yet",
                        style: TextStyle(color: Colors.grey),
                      ),
                    ),
                  )
                else
                  ...post.comments.map((c) {
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CircleAvatar(
                            radius: 18,
                            backgroundColor: Colors.orange.shade100,
                            child: Text(
                              c.userFullname[0].toUpperCase(),
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
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
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    c.userFullname,
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
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
                  }),
              ],
            ),
          );
        },
      );
    },
  );
}


  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (myPosts.isEmpty) {
      return const Center(
        child: Text(
          "You haven't posted anything yet",
          style: TextStyle(color: Colors.grey),
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: myPosts.length,
      itemBuilder: (_, i) {
        final p = myPosts[i];

        return Container(
          margin: const EdgeInsets.only(bottom: 14),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 10,
              ),
            ],
          ),
          child: ListTile(
            onTap: () => openPostDetails(p),
            title: Text(
              p.title,
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            subtitle: Text(
              "${p.likes.length} likes • ${p.comments.length} comments",
              style: const TextStyle(fontSize: 13),
            ),
            trailing: IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: () => deletePost(p.id),
            ),
          ),
        );
      },
    );
  }
}
