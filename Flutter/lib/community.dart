import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:petcareapp/user_profile_page.dart';

class VideoPostPage extends StatefulWidget {
  const VideoPostPage({super.key});

  @override
  State<VideoPostPage> createState() => _VideoPostPageState();
}

class _VideoPostPageState extends State<VideoPostPage> {
  final ImagePicker _picker = ImagePicker();
  final TextEditingController _searchController = TextEditingController();

  // like state per post
  List<bool> likes = List.generate(5, (index) => false);


  // pick image
  Future<void> pickImage() async {
    final XFile? image =
        await _picker.pickImage(source: ImageSource.gallery);
    if (image != null) {
      debugPrint('Image path: ${image.path}');
    }
  }

  // pick video
  Future<void> pickVideo() async {
    final XFile? video =
        await _picker.pickVideo(source: ImageSource.gallery);
    if (video != null) {
      debugPrint('Video path: ${video.path}');
    }
  }

  // bottom sheet
  void showPickerOptions() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.image,
                    color: Color.fromARGB(250, 218, 98, 17)),
                title: const Text('Post Image'),
                onTap: () {
                  Navigator.pop(context);
                  pickImage();
                },
              ),
              ListTile(
                leading: const Icon(Icons.video_library,
                    color: Color.fromARGB(250, 218, 98, 17)),
                title: const Text('Post Video'),
                onTap: () {
                  Navigator.pop(context);
                  pickVideo();
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,

      // 🔹 APP BAR (BACK BUTTON + HOME STYLE)
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,

        // ✅ BACK BUTTON
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios_new,
            color: Color.fromARGB(250, 218, 98, 17),
          ),
          onPressed: () => Navigator.pop(context),
        ),

        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: const [
            Icon(
              Icons.pets,
              color: Color.fromARGB(250, 218, 98, 17),
              size: 26,
            ),
            SizedBox(width: 8),
            Text(
              "Community",
              style: TextStyle(
                color: Color.fromARGB(250, 218, 98, 17),
                fontSize: 22,
                fontWeight: FontWeight.bold,
                fontFamily: 'Pacifico',
              ),
            ),
          ],
        ),
      ),

      // 🔹 FEED
      body: Column(
        children: [
          // 🔍 Search Bar
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: "Search community...",
                prefixIcon: const Icon(Icons.search, color: Colors.grey),
                filled: true,
                fillColor: Colors.white,
                contentPadding: const EdgeInsets.symmetric(vertical: 0),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: BorderSide.none,
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),

          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.only(bottom: 80),
              itemCount: likes.length,
              itemBuilder: (context, index) {
          return Container(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.04),
                  blurRadius: 15,
                  offset: const Offset(0, 5),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [

                // 👤 USER HEADER
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => const UserProfilePage(
                          name: 'Pet Lover',
                          image: 'https://i.pravatar.cc/150?img=3',
                        ),
                      ),
                    );
                  },
                  child: Padding(
                    padding:
                        const EdgeInsets.fromLTRB(16, 16, 16, 12),
                    child: Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(2),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color.fromARGB(250, 218, 98, 17), width: 2),
                          ),
                          child: const CircleAvatar(
                            radius: 20,
                            backgroundImage:
                                NetworkImage('https://i.pravatar.cc/150?img=3'),
                          ),
                        ),
                        const SizedBox(width: 12),
                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Pet Lover',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 16),
                              ),
                              Text(
                                "Just now",
                                style: TextStyle(color: Colors.grey, fontSize: 12),
                              )
                            ],
                          ),
                        ),
                        const Icon(Icons.more_horiz, color: Colors.grey),
                      ],
                    ),
                  ),
                ),

                // 📝 CAPTION
                const Padding(
                  padding:
                      EdgeInsets.symmetric(horizontal: 16, vertical: 0),
                  child: Text(
                    'Bruno enjoying his evening walk 🐶',
                    style: TextStyle(fontSize: 15, height: 1.4, color: Colors.black87),
                  ),
                ),

                const SizedBox(height: 12),

                // 🖼 POST IMAGE
                ClipRRect(
                  borderRadius: BorderRadius.circular(24),
                  child: Image.network(
                    'https://picsum.photos/400/300?random=$index',
                    width: double.infinity,
                    height: 280,
                    fit: BoxFit.cover,
                  ),
                ),

                // ❤️ ACTIONS
                Padding(
                  padding:
                      const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      IconButton(
                        icon: Icon(
                          likes[index]
                              ? Icons.favorite
                              : Icons.favorite_border,
                          color: likes[index]
                              ? Colors.red
                              : Colors.black87,
                          size: 28,
                        ),
                        onPressed: () {
                          setState(() {
                            likes[index] = !likes[index];
                          });
                        },
                      ),
                      IconButton(
                        icon: const Icon(Icons.mode_comment_outlined,
                            color: Colors.black87, size: 26),
                        onPressed: () {},
                      ),
                      IconButton(
                        icon: const Icon(Icons.send_rounded,
                            color: Colors.black87, size: 26),
                        onPressed: () {},
                      ),
                      const Spacer(),
                       IconButton(
                        icon: const Icon(Icons.bookmark_border,
                            color: Colors.black87, size: 28),
                        onPressed: () {},
                      ),
                    ],
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

      // ➕ ADD POST BUTTON
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color.fromARGB(250, 218, 98, 17),
        elevation: 6,
        onPressed: showPickerOptions,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}
