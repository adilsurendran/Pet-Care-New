import 'package:flutter/material.dart';
import 'package:petcareapp/chat_screen.dart';

class UserProfilePage extends StatefulWidget {
  final String name;
  final String image;

  const UserProfilePage({super.key, required this.name, required this.image});

  @override
  State<UserProfilePage> createState() => _UserProfilePageState();
}

class _UserProfilePageState extends State<UserProfilePage> with SingleTickerProviderStateMixin {
  bool isFriend = false;
  late TabController _tabController;

  final List<String> posts = List.generate(9, (index) => 'https://picsum.photos/400/400?random=${index + 100}');

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          widget.name,
          style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        centerTitle: true,
      ),
      body: NestedScrollView(
        headerSliverBuilder: (context, _) {
          return [
            SliverList(
              delegate: SliverChildListDelegate([
                const SizedBox(height: 20),
                // 👤 Avatar & Stats
                Column(
                  children: [
                    CircleAvatar(
                      radius: 50,
                      backgroundImage: NetworkImage(widget.image),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      widget.name,
                      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                    ),
                    const Text(
                      "Pet Lover 🐾 | Calicut",
                      style: TextStyle(color: Colors.grey, fontSize: 14),
                    ),
                    const SizedBox(height: 20),

                    // ✨ Stats Row
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _StatItem("Posts", "9"),
                        _StatItem("Friends", "128"),
                        _StatItem("Pets", "2"),
                      ],
                    ),
                    const SizedBox(height: 24),

                    // 🔘 Actions
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ElevatedButton(
                          onPressed: () => setState(() => isFriend = !isFriend),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: isFriend ? Colors.grey.shade200 : const Color.fromARGB(250, 218, 98, 17),
                            foregroundColor: isFriend ? Colors.black : Colors.white,
                            elevation: isFriend ? 0 : 2,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                          ),
                          child: Text(isFriend ? "Request Sent" : "Add Friend"),
                        ),
                        const SizedBox(width: 12),
                        OutlinedButton(
                          onPressed: () {
                             Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => ChatScreen(
                                  name: widget.name, 
                                  image: widget.image,
                                  fromProfile: true,
                                  docloginId: "kwjevnds",
                                  id: "weidb",
                                  type: "ain",
                                ),
                              ),
                            );
                          },
                          style: OutlinedButton.styleFrom(
                            foregroundColor: Colors.black,
                            side: BorderSide(color: Colors.grey.shade300),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                          ),
                          child: const Text("Message"),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ]),
            ),
          ];
        },
        body: Column(
          children: [
            // 📑 Tab Bar (Replaces the Grid Icon)
            TabBar(
              controller: _tabController,
              indicatorColor: Colors.black,
              labelColor: Colors.black,
              unselectedLabelColor: Colors.grey,
              indicatorWeight: 1,
              tabs: const [
                Tab(icon: Icon(Icons.grid_on)), // Grid View
                Tab(icon: Icon(Icons.view_agenda_outlined)), // Feed View "Option to view all post"
              ],
            ),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  // 🔲 Grid Tab
                  GridView.builder(
                    padding: const EdgeInsets.all(2),
                    itemCount: posts.length,
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 3,
                      crossAxisSpacing: 2,
                      mainAxisSpacing: 2,
                    ),
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () {
                          // Scroll to specific post in Feed Tab (Simple approach: switch tab)
                          // For a defined "view all" experience like Instagram, switching to feed view is often expected
                          _tabController.animateTo(1);
                        },
                        child: Image.network(posts[index], fit: BoxFit.cover),
                      );
                    },
                  ),

                  // 📜 Feed Tab (View All Posts)
                  ListView.separated(
                    padding: const EdgeInsets.symmetric(vertical: 10),
                    itemCount: posts.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 20),
                    itemBuilder: (context, index) {
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Header
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            child: Row(
                              children: [
                                CircleAvatar(radius: 16, backgroundImage: NetworkImage(widget.image)),
                                const SizedBox(width: 10),
                                Text(widget.name, style: const TextStyle(fontWeight: FontWeight.bold)),
                              ],
                            ),
                          ),
                          // Image
                          Image.network(posts[index], width: double.infinity, fit: BoxFit.cover),
                          // Actions
                          Padding(
                            padding: const EdgeInsets.all(12),
                            child: Row(
                              children: [
                                const Icon(Icons.favorite_border, size: 28),
                                const SizedBox(width: 16),
                                const Icon(Icons.comment_outlined, size: 28),
                                const SizedBox(width: 16),
                                const Icon(Icons.share_outlined, size: 28),
                              ],
                            ),
                          ),
                        ],
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final String label;
  final String count;
  const _StatItem(this.label, this.count);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(count, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        Text(label, style: const TextStyle(color: Colors.grey)),
      ],
    );
  }
}
