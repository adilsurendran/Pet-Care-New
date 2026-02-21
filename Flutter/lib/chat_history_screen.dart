import 'package:flutter/material.dart';
import 'package:petcareapp/service_manager.dart';
import 'package:petcareapp/chat_screen.dart';

class ChatHistoryScreen extends StatefulWidget {
  const ChatHistoryScreen({super.key});

  @override
  State<ChatHistoryScreen> createState() => _ChatHistoryScreenState();
}

class _ChatHistoryScreenState extends State<ChatHistoryScreen> {
  final TextEditingController _searchController = TextEditingController();
  
  // // Base data
  // List<Map<String, dynamic>> get _allServiceChats => [
  //     ...ServiceManager().doctors.take(2).map((d) => {
  //       'name': d.name, 
  //       'image': d.image, 
  //       'msg': 'See you then!', 
  //       'time': '10:30 AM',
  //       'type': 'doctor',
  //       'id': d.id
  //     }),
  //     ...ServiceManager().shops.take(1).map((s) => {
  //       'name': s.name, 
  //       'image': s.image, 
  //       'msg': 'Your order is ready.', 
  //       'time': 'Yesterday',
  //       'type': 'shop',
  //       'id': s.id
  //     }),
  // ];
  List<Map<String, dynamic>> get _allServiceChats => [
  ...ServiceManager().doctors.take(2).map((d) => {
    'name': d.name,
    'image': d.image,
    'msg': 'See you then!',
    'time': '10:30 AM',
    'type': 'doctor',
    'id': d.id
  }),
];


  final List<Map<String, dynamic>> _allFriendChats = [
    {'name': 'Pet Lover', 'image': 'https://i.pravatar.cc/150?img=3', 'msg': 'Your dog is so cute!', 'time': 'Now', 'type': 'friend', 'id': ''},
    {'name': 'Dog Trainer', 'image': 'https://i.pravatar.cc/150?img=12', 'msg': 'Thanks for the tip.', 'time': '2m ago', 'type': 'friend', 'id': ''},
  ];

  List<Map<String, dynamic>> _filteredAllChats = [];
  List<Map<String, dynamic>> _filteredFriendChats = [];

  @override
  void initState() {
    super.initState();
    _updateFilteredChats();
    _searchController.addListener(_updateFilteredChats);
  }

  void _updateFilteredChats() {
    final query = _searchController.text.toLowerCase();
    
    // Inbox = Services + Friends
    final allChats = [..._allServiceChats, ..._allFriendChats];
    // Friends Only = Friends

    setState(() {
      _filteredAllChats = allChats.where((c) {
        final name = (c['name'] as String).toLowerCase();
        return name.contains(query);
      }).toList();

      _filteredFriendChats = _allFriendChats.where((c) {
        final name = (c['name'] as String).toLowerCase();
        return name.contains(query);
      }).toList();
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        backgroundColor: Colors.grey.shade100,
        appBar: AppBar(
          title: const Text(
            "Messages",
            style: TextStyle(
              color: Color.fromARGB(250, 218, 98, 17),
              fontWeight: FontWeight.bold,
            ),
          ),
          centerTitle: true,
          backgroundColor: Colors.white,
          elevation: 1,
          automaticallyImplyLeading: false,
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(100), // Height for Search + TabBar
            child: Column(
              children: [
                 // 🔍 Search Bar
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: TextField(
                    controller: _searchController,
                    decoration: InputDecoration(
                      hintText: "Search chats...",
                      prefixIcon: const Icon(Icons.search, color: Colors.grey),
                      filled: true,
                      fillColor: Colors.grey.shade100,
                      contentPadding: const EdgeInsets.symmetric(vertical: 0),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
                const TabBar(
                  labelColor: Color.fromARGB(250, 218, 98, 17),
                  unselectedLabelColor: Colors.grey,
                  indicatorColor: Color.fromARGB(250, 218, 98, 17),
                  indicatorWeight: 3,
                  labelStyle: TextStyle(fontWeight: FontWeight.bold),
                  tabs: [
                    Tab(text: "Inbox"),
                    Tab(text: "Friends"),
                  ],
                ),
              ],
            ),
          ),
        ),
        body: TabBarView(
          children: [
            // 🔹 TAB 1: INBOX (ALL CHATS)
            ListView.separated(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 100),
              itemCount: _filteredAllChats.length,
              separatorBuilder: (c, i) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final chat = _filteredAllChats[index];
                return _chatTile(context, chat);
              },
            ),

            // 🔹 TAB 2: FRIENDS ONLY
            ListView.separated(
               padding: const EdgeInsets.fromLTRB(16, 16, 16, 100),
              itemCount: _filteredFriendChats.length,
              separatorBuilder: (c, i) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final chat = _filteredFriendChats[index];
                return _chatTile(context, chat);
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _chatTile(BuildContext context, Map<String, dynamic> chat) {
    return ListTile(
      onTap: () {
        Navigator.push(context, MaterialPageRoute(builder: (_) => ChatScreen(
          name: chat['name'] as String, 
          image: chat['image'] as String,
          type: chat['type'] as String,
          id: chat['id'] as String,
          docloginId: "kvsjn",
        )));
      },
      tileColor: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      leading: CircleAvatar(
        backgroundImage: NetworkImage(chat['image'] as String),
        radius: 28,
      ),
      title: Text(chat['name'] as String, style: const TextStyle(fontWeight: FontWeight.bold)),
      subtitle: Text(chat['msg'] as String, maxLines: 1, overflow: TextOverflow.ellipsis),
      trailing: Text(chat['time'] as String, style: const TextStyle(fontSize: 12, color: Colors.grey)),
    );
  }
}
