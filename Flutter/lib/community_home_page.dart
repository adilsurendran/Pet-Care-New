import 'package:flutter/material.dart';
import 'community_tab.dart';
import 'community_account_tab.dart';
import 'create_post_sheet.dart';

class CommunityHomePage extends StatefulWidget {
  const CommunityHomePage({super.key});

  @override
  State<CommunityHomePage> createState() => _CommunityHomePageState();
}

class _CommunityHomePageState extends State<CommunityHomePage> {
  int _index = 0;

  void _openCreatePost() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) => const CreatePostSheet(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("PetCare Community"),
        centerTitle: true,
        foregroundColor: Color.fromARGB(250, 218, 98, 17),
        backgroundColor: const Color.fromARGB(255, 255, 255, 255), // SAME AS PREVIOUS
      ),
      body: _index == 0 ? const CommunityTab() : const CommunityAccountTab(),

      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color.fromARGB(250, 218, 98, 17),
        onPressed: _openCreatePost,
        child: const Icon(Icons.add, color: Colors.white),
      ),

      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _index,
        onTap: (i) => setState(() => _index = i),
        selectedItemColor: const Color.fromARGB(250, 218, 98, 17),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.groups),
            label: "Community",
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: "Account",
          ),
        ],
      ),
    );
  }
}
