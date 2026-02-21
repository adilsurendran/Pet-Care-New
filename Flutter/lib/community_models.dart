// class CommunityPost {
//   final String id;
//   final String title;
//   final String description;
//   final String? image;
//   final String userId;
//   final String userFullname;
//   final String role;
//   final DateTime createdAt;
//   final List likes;
//   final List comments;

//   CommunityPost({
//     required this.id,
//     required this.title,
//     required this.description,
//     this.image,
//     required this.userId,
//     required this.userFullname,
//     required this.role,
//     required this.createdAt,
//     required this.likes,
//     required this.comments,
//   });

//   factory CommunityPost.fromJson(Map<String, dynamic> json) {
//     return CommunityPost(
//       id: json["_id"],
//       title: json["title"],
//       description: json["description"],
//       image: json["image"],
//       userId: json["postedBy"]["userId"],
//       userFullname: json["postedBy"]["userFullname"],
//       role: json["postedBy"]["role"],
//       createdAt: DateTime.parse(json["createdAt"]),
//       likes: json["likes"],
//       comments: json["comments"],
//     );
//   }
// }

class CommunityPost {
  final String id;
  final String title;
  final String description;
  final String? image;
  final PostedBy postedBy;
  final List<String> likes;
  final List<Comment> comments;

  CommunityPost({
    required this.id,
    required this.title,
    required this.description,
    this.image,
    required this.postedBy,
    required this.likes,
    required this.comments,
  });

  factory CommunityPost.fromJson(Map<String, dynamic> json) {
    return CommunityPost(
      id: json['_id'],
      title: json['title'],
      description: json['description'],
      image: json['image'],
      postedBy: PostedBy.fromJson(json['postedBy']),
      likes: List<String>.from(json['likes'] ?? []),
      comments: (json['comments'] as List? ?? [])
          .map((e) => Comment.fromJson(e))
          .toList(),
    );
  }
}

class PostedBy {
  final String userId;
  final String userFullname;
  final String role;

  PostedBy({
    required this.userId,
    required this.userFullname,
    required this.role,
  });

  factory PostedBy.fromJson(Map<String, dynamic> json) {
    return PostedBy(
      userId: json['userId'],
      userFullname: json['userFullname'],
      role: json['role'] ?? '',
    );
  }
}

class Comment {
  final String userId;
  final String userFullname;
  final String text;
  final DateTime createdAt;

  Comment({
    required this.userId,
    required this.userFullname,
    required this.text,
    required this.createdAt,
  });

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      userId: json['userId'],
      userFullname: json['userFullname'],
      text: json['text'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}
