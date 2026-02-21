// import 'package:flutter/material.dart';
// import 'package:flutter/rendering.dart';
// import 'package:petcareapp/community_home_page.dart';
// import 'package:petcareapp/doctordetails.dart';
// import 'package:petcareapp/guide.dart';
// import 'package:petcareapp/login.dart';
// import 'package:petcareapp/my_complaints_page.dart';
// import 'package:petcareapp/my_pets_for_sale.dart';
// import 'package:petcareapp/petprofile.dart';
// import 'package:petcareapp/profilemanagement.dart';
// import 'package:petcareapp/pet_manager.dart';
// import 'package:petcareapp/petdetails.dart';
// import 'package:petcareapp/viewshop.dart';
// import 'package:petcareapp/marketplace/buy_pets_page.dart';
// import 'package:petcareapp/marketplace/buy_products_page.dart';


// class HomePage extends StatefulWidget {
//   const HomePage({super.key});

//   @override
//   State<HomePage> createState() => _HomePageState();
// }

// class _HomePageState extends State<HomePage> {
//   int currentIndex = 0;
//   late PageController _pageController;
  
//  @override
//   void initState() {
    
//     super.initState();
//     _pageController = PageController(initialPage: currentIndex);
//     getPetdetailsApi();
//   }
  
//   bool _isNavbarVisible = true;

//   final List<Widget> _pages = [
//     const HomeContent(),
//     // const VideoPostPage(),
//     // const CommunityTab(),
//     CommunityHomePage(),
//     // const ChatHistoryScreen(),
//     const GuidePage(),
//     const ProfileManagement(),
//   ];



 

//   @override
//   void dispose() {
//     _pageController.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.grey.shade100,
      
//       // 🔹 BODY with Scroll Listener
//       body: NotificationListener<UserScrollNotification>(
//         onNotification: (notification) {
//           if (notification.direction == ScrollDirection.reverse) {
//             if (_isNavbarVisible) setState(() => _isNavbarVisible = false);
//           } else if (notification.direction == ScrollDirection.forward) {
//             if (!_isNavbarVisible) setState(() => _isNavbarVisible = true);
//           }
//           return true;
//         },
//         child: PageView(
//           controller: _pageController,
//           onPageChanged: (index) {
//             setState(() => currentIndex = index);
//           },
//           children: _pages,
//         ),
//       ),

//       // 🔻 ANIMATED BOTTOM NAV BAR
//       bottomNavigationBar: AnimatedContainer(
//         duration: const Duration(milliseconds: 300),
//         height: _isNavbarVisible ? 65 : 0,
//         child: Wrap(
//           children: [
//             BottomNavigationBar(
//               type: BottomNavigationBarType.fixed,
//               backgroundColor: Colors.white,
//               currentIndex: currentIndex,
//               selectedItemColor: const Color.fromARGB(255, 140, 66, 17),
//               unselectedItemColor: Colors.grey.shade400,
//               showUnselectedLabels: true,
//               selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
//               elevation: 10,
//               onTap: (index) {
//                 _pageController.animateToPage(
//                   index,
//                   duration: const Duration(milliseconds: 300),
//                   curve: Curves.easeInOut,
//                 );
//               },
//               items: const [
//                 BottomNavigationBarItem(icon: Icon(Icons.home_rounded), label: "Home"),
//                 BottomNavigationBarItem(icon: Icon(Icons.people_alt_rounded), label: "Community"),
//                 BottomNavigationBarItem(icon: Icon(Icons.video_chat_rounded), label: "Guides"),
//                 BottomNavigationBarItem(icon: Icon(Icons.person_rounded), label: "Profile"),
//               ],
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }

// class HomeContent extends StatefulWidget {
//   const HomeContent({super.key});


//   @override
//   State<HomeContent> createState() => _HomeContentState();
// }

//     Future<void> _logout(BuildContext context) async {


//   // 🔒 Remove all previous routes
//   Navigator.of(context).pushAndRemoveUntil(
//     MaterialPageRoute(builder: (_) => const LoginPage()),
//     (route) => false,
//   );
// }

// class _HomeContentState extends State<HomeContent> {

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.grey.shade100,
//       // 🔹 APP BAR is here for Home Tab
//       appBar: AppBar(
//         backgroundColor: Colors.white,
//         elevation: 0,
//         centerTitle: true,
//         leading: const Padding(
//           padding: EdgeInsets.only(left: 12),
//           child: Icon(
//             Icons.pets,
//             color: Color.fromARGB(250, 218, 98, 17),
//             size: 28,
//           ),
//         ),
//         title: const Text(
//           "Pet Care",
//           style: TextStyle(
//             color: Color.fromARGB(250, 218, 98, 17),
//             fontSize: 24,
//             fontWeight: FontWeight.bold,
//             fontFamily: 'Pacifico',
//           ),
//         ),
//         actions: [

//           IconButton(
//             icon: const Icon(Icons.pets, color: Colors.grey, size: 28),
//             onPressed: () {
//               Navigator.push(context,MaterialPageRoute(builder: (_) => const MyPetsForSale()),);
//             },
//           ),
//           IconButton(
//   icon: const Icon(
//     Icons.logout,
//     color: Color.fromARGB(255, 255, 140, 0),
//     size: 28,
//   ),
//   onPressed: () => _logout(context),
// ),

//         ],
//       ),
//       body: SingleChildScrollView(
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             // 🔔 NOTIFICATION
//             Padding(
//               padding: const EdgeInsets.all(16),
//               child: Container(
//                 padding: const EdgeInsets.all(16),
//                 decoration: BoxDecoration(
//                   color: const Color.fromARGB(255, 255, 235, 210),
//                   borderRadius: BorderRadius.circular(20),
//                   border: Border.all(color: const Color.fromARGB(50, 218, 98, 17)),
//                 ),
//                 child: const Row(
//                   children: [
//                     Icon(Icons.auto_fix_normal_outlined,
//                         color: Color.fromARGB(255, 140, 66, 17)),
//                     SizedBox(width: 12),
//                     Expanded(
//                       child: Text(
//                         "From health to happiness, PetCare handles it all",
//                         style: TextStyle(fontWeight: FontWeight.w600, color: Color.fromARGB(255, 100, 40, 0)),
//                       ),
//                     )
//                   ],
//                 ),
//               ),
//             ),

//             // 🐾 My PETS
//             const Padding(
//               padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
//               child: Text(
//                 "My Pets",
//                 style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
//               ),
//             ),

//             SizedBox(
//               height: 120,
//               child: ListView(
//                 scrollDirection: Axis.horizontal,
//                 padding: const EdgeInsets.symmetric(horizontal: 16),
//                 children: [
//                    ...PetManager().pets.map((pet) => petCircleCard(
//                         pet: pet,
//                         onTap: () async {
//                           await Navigator.push(
//                             context,
//                             MaterialPageRoute(
//                               builder: (_) => Petdetails(pet: pet),
//                             ),
//                           );
//                           setState(() {});
//                         },
//                       )),
//                   addPetCircleCard(context, () => setState(() {})),
//                 ],
//               ),
//             ),



//             Padding(
//               padding: const EdgeInsets.symmetric(horizontal: 16),
//               child: Row(
//                 children: [
//                   Expanded(
//                     child: _commercialCard(
//                       title: "Buy Pets",
//                       icon: Icons.pets,
//                       color: const Color.fromARGB(255, 255, 152, 0),
//                       onTap: () {
//                          Navigator.push(context, MaterialPageRoute(builder: (_) => const BuyPetsPage()));
//                       },
//                     ),
//                   ),
//                   const SizedBox(width: 16),
//                   Expanded(
//                     child: _commercialCard(
//                       title: "Buy Products",
//                       icon: Icons.shopping_bag_rounded,
//                       color: const Color.fromARGB(255, 0, 150, 136),
//                       onTap: () {
//                          Navigator.push(context, MaterialPageRoute(builder: (_) => const BuyProductsPage()));
//                       },
//                     ),
//                   ),
//                 ],
//               ),
//             ),

//             // 🧩 PET SERVICES
//             const Padding(
//               padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
//               child: Text(
//                 "Pet Services",
//                 style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
//               ),
//             ),

//             GridView(
//               padding: const EdgeInsets.symmetric(horizontal: 16),
//               shrinkWrap: true,
//               physics: const NeverScrollableScrollPhysics(),
//               gridDelegate:
//                   const SliverGridDelegateWithFixedCrossAxisCount(
//                 crossAxisCount: 2,
//                 mainAxisSpacing: 16,
//                 crossAxisSpacing: 16,
//                 childAspectRatio: 0.95,
//               ),
//               children: [
//                 serviceCard("Doctors", Icons.medical_services_rounded,
//                     "https://images.unsplash.com/photo-1537368910025-700350fe46c7",() => Navigator.push(context,MaterialPageRoute(builder:(context) => const Doctordetails(isVet: false),)),),
//                 serviceCard("Pet Shops", Icons.store_mall_directory_rounded,
//                     "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",() => Navigator.push(context, MaterialPageRoute(builder:(context) => const Viewshop(),)),),
//                 serviceCard("Complaints", Icons.message_rounded,
//                     "https://images.unsplash.com/photo-1521791136064-7986c2920216",() => Navigator.push(context, MaterialPageRoute(builder:(context) => const MyComplaintsPage(),)),),
//                 // serviceCard("Trainers", Icons.sports_kabaddi_rounded, // or fitness
//                 //     "https://images.unsplash.com/photo-1587300003388-59208cc962cb",() => Navigator.push(context, MaterialPageRoute(builder:(context) => const Viewtrainers(),)),),
//                 // serviceCard("Vet Hospital", Icons.local_hospital_rounded,
//                 //     "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",() => Navigator.push(context, MaterialPageRoute(builder:(context) => const Doctordetails(isVet: true),)),),
//                 // serviceCard("Pet Parks", Icons.park_rounded,
//                 //     "https://images.unsplash.com/photo-1597633425046-08f5110420b5",() => Navigator.push(context, MaterialPageRoute(builder:(context) => const Viewpetparks(),)),), 
//                      ],
//             ),



//             const SizedBox(height: 100),
//           ],
//         ),
//       ),
//     );
//   }

//   // 🛍️ COMMERCIAL CARD
//   Widget _commercialCard({
//     required String title,
//     required IconData icon,
//     required Color color,
//     required VoidCallback onTap,
//   }) {
//     return GestureDetector(
//       onTap: onTap,
//       child: Container(
//         height: 80,
//         decoration: BoxDecoration(
//           color: color,
//           borderRadius: BorderRadius.circular(20),
//           boxShadow: [
//             BoxShadow(
//               color: color.withOpacity(0.4),
//               blurRadius: 12,
//               offset: const Offset(0, 6),
//             ),
//           ],
//         ),
//         child: Row(
//           mainAxisAlignment: MainAxisAlignment.center,
//           children: [
//             Icon(icon, color: Colors.white, size: 28),
//             const SizedBox(width: 8),
//             Text(
//               title,
//               style: const TextStyle(
//                 color: Colors.white,
//                 fontSize: 16,
//                 fontWeight: FontWeight.bold,
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   // 🐶 ROUND PET CARD
//   // Widget petCircleCard({
//   //   required Pet pet,
//   //   required VoidCallback onTap,
//   // }) {
//   //   return GestureDetector(
//   //     onTap: onTap,
//   //     child: Container(
//   //       width: 90,
//   //       margin: const EdgeInsets.only(right: 14),
//   //       child: Column(
//   //         children: [
//   //           Container(
//   //             height: 70,
//   //             width: 70,
//   //             decoration: BoxDecoration(
//   //               shape: BoxShape.circle,
//   //               boxShadow: [
//   //                 BoxShadow(
//   //                   color: Colors.black.withOpacity(0.1),
//   //                   blurRadius: 8,
//   //                   offset: const Offset(0, 4),
//   //                 ),
//   //               ],
//   //               border: Border.all(color: Colors.white, width: 2),
//   //             ),
//   //             child: ClipOval(
//   //               child: pet.image != null
//   //                   ? Image.file(
//   //                       pet.image!,
//   //                       fit: BoxFit.cover,
//   //                     )
//   //                   : Container(
//   //                       color: Colors.grey.shade200,
//   //                       child: const Icon(Icons.pets, color: Colors.grey),
//   //                     ),
//   //             ),
//   //           ),
//   //           const SizedBox(height: 8),
//   //           Text(
//   //             pet.name,
//   //             style: const TextStyle(
//   //               fontSize: 13,
//   //               fontWeight: FontWeight.w600,
//   //             ),
//   //             textAlign: TextAlign.center,
//   //             maxLines: 1,
//   //             overflow: TextOverflow.ellipsis,
//   //           ),
//   //         ],
//   //       ),
//   //     ),
//   //   );
//   // }
// Widget petCircleCard({
//   required Pet pet,
//   required VoidCallback onTap,
// }) {
//   return GestureDetector(
//     onTap: onTap,
//     child: Container(
//       width: 90,
//       margin: const EdgeInsets.only(right: 14),
//       child: Column(
//         children: [
//           Container(
//             height: 70,
//             width: 70,
//             decoration: BoxDecoration(
//               shape: BoxShape.circle,
//               boxShadow: [
//                 BoxShadow(
//                   color: Colors.black.withOpacity(0.1),
//                   blurRadius: 8,
//                   offset: const Offset(0, 4),
//                 ),
//               ],
//               border: Border.all(color: Colors.white, width: 2),
//             ),
//             child: ClipOval(
//               child: pet.imageUrl != null
//                   ? Image.network(
//                       pet.imageUrl!,
//                       fit: BoxFit.cover,
//                       errorBuilder: (_, __, ___) =>
//                           const Icon(Icons.pets),
//                     )
//                   : const Icon(Icons.pets, color: Colors.grey),
//             ),
//           ),
//           const SizedBox(height: 8),
//           Text(
//             pet.name,
//             style: const TextStyle(
//               fontSize: 13,
//               fontWeight: FontWeight.w600,
//             ),
//             maxLines: 1,
//             overflow: TextOverflow.ellipsis,
//           ),
//         ],
//       ),
//     ),
//   );
// }

//   // ➕ ADD PET
//   Widget addPetCircleCard(BuildContext context, VoidCallback onUpdate) {
//     return Container(
//       width: 90,
//       margin: const EdgeInsets.only(right: 14),
//       child: Column(
//         children: [
//           InkWell(
//             borderRadius: BorderRadius.circular(40),
//             onTap: () {
//               Navigator.push(
//                 context,
//                 MaterialPageRoute(builder: (_) => const Petprofile()),
//               ).then((_) => onUpdate());
//             },
//             child: Container(
//               height: 70,
//               width: 70,
//               decoration: const BoxDecoration(
//                 shape: BoxShape.circle,
//                 color: Color.fromARGB(255, 255, 230, 213),
//               ),
//               child: const Icon(
//                 Icons.add,
//                 size: 30,
//                 color: Color.fromARGB(250, 218, 98, 17),
//               ),
//             ),
//           ),
//           const SizedBox(height: 8),
//           const Text("Add Pet", style: TextStyle(fontSize: 12)),
//         ],
//       ),
//     );
//   }

//   // 🧩 SERVICE CARD (FIXED FOR GRIDVIEW)
//   Widget serviceCard(String title, IconData icon, String image, VoidCallback onTap) {
//     return GestureDetector(onTap: onTap,
//       child: Container(
//         decoration: BoxDecoration(
//           borderRadius: BorderRadius.circular(24),
//           boxShadow: [
//             BoxShadow(
//               color: Colors.black.withOpacity(0.08),
//               blurRadius: 10,
//               offset: const Offset(0, 4),
//             ),
//           ],
//         ),
//         child: ClipRRect(
//           borderRadius: BorderRadius.circular(24),
//           child: Stack(
//             fit: StackFit.expand,
//             children: [
//               Image.network(image, fit: BoxFit.cover),
//               Container(
//                 decoration: BoxDecoration(
//                   gradient: LinearGradient(
//                     begin: Alignment.bottomCenter,
//                     end: Alignment.topCenter,
//                     colors: [
//                       Colors.black.withOpacity(0.7),
//                       Colors.transparent,
//                     ],
//                   ),
//                 ),
//               ),
//               Align(
//                 alignment: Alignment.bottomLeft,
//                 child: Padding(
//                   padding: const EdgeInsets.all(12),
//                   child: Column(
//                     mainAxisSize: MainAxisSize.min,
//                     crossAxisAlignment: CrossAxisAlignment.start,
//                     children: [
//                       Icon(icon, color: Colors.white, size: 22),
//                       const SizedBox(height: 4),
//                       Text(
//                         title,
//                         style: const TextStyle(
//                           color: Colors.white,
//                           fontSize: 15,
//                           fontWeight: FontWeight.bold,
//                         ),
//                       ),
//                     ],
//                   ),
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }



import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:petcareapp/community_home_page.dart';
import 'package:petcareapp/doctordetails.dart';
import 'package:petcareapp/guide.dart';
import 'package:petcareapp/login.dart';
import 'package:petcareapp/my_complaints_page.dart';
import 'package:petcareapp/my_pets_for_sale.dart';
import 'package:petcareapp/petprofile.dart';
import 'package:petcareapp/profilemanagement.dart';
import 'package:petcareapp/pet_manager.dart';
import 'package:petcareapp/petdetails.dart';
import 'package:petcareapp/viewshop.dart';
import 'package:petcareapp/marketplace/buy_pets_page.dart';
import 'package:petcareapp/marketplace/buy_products_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int currentIndex = 0;
  late PageController _pageController;
  bool _isNavbarVisible = true;

  final List<Widget> _pages = [
    const HomeContent(),
    CommunityHomePage(),
    const GuidePage(),
    const ProfileManagement(),
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: currentIndex);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      body: NotificationListener<UserScrollNotification>(
        onNotification: (notification) {
          if (notification.direction == ScrollDirection.reverse) {
            if (_isNavbarVisible) setState(() => _isNavbarVisible = false);
          } else if (notification.direction == ScrollDirection.forward) {
            if (!_isNavbarVisible) setState(() => _isNavbarVisible = true);
          }
          return true;
        },
        child: PageView(
          controller: _pageController,
          onPageChanged: (index) {
            setState(() => currentIndex = index);
          },
          children: _pages,
        ),
      ),
      bottomNavigationBar: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        height: _isNavbarVisible ? 65 : 0,
        child: Wrap(
          children: [
            BottomNavigationBar(
              type: BottomNavigationBarType.fixed,
              backgroundColor: Colors.white,
              currentIndex: currentIndex,
              selectedItemColor: const Color.fromARGB(255, 140, 66, 17),
              unselectedItemColor: Colors.grey.shade400,
              showUnselectedLabels: true,
              selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
              elevation: 10,
              onTap: (index) {
                _pageController.animateToPage(
                  index,
                  duration: const Duration(milliseconds: 300),
                  curve: Curves.easeInOut,
                );
              },
              items: const [
                BottomNavigationBarItem(icon: Icon(Icons.home_rounded), label: "Home"),
                BottomNavigationBarItem(icon: Icon(Icons.people_alt_rounded), label: "Community"),
                BottomNavigationBarItem(icon: Icon(Icons.video_chat_rounded), label: "Guides"),
                BottomNavigationBarItem(icon: Icon(Icons.person_rounded), label: "Profile"),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class HomeContent extends StatefulWidget {
  const HomeContent({super.key});

  @override
  State<HomeContent> createState() => _HomeContentState();
}

Future<void> _logout(BuildContext context) async {
  Navigator.of(context).pushAndRemoveUntil(
    MaterialPageRoute(builder: (_) => const LoginPage()),
    (route) => false,
  );
}

class _HomeContentState extends State<HomeContent> {
  bool _loadingPets = true;

  @override
  void initState() {
    super.initState();
    _loadPets();
  }

  Future<void> _loadPets() async {
    await getPetdetailsApi();
    if (mounted) {
      setState(() {
        _loadingPets = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        leading: const Padding(
          padding: EdgeInsets.only(left: 12),
          child: Icon(
            Icons.pets,
            color: Color.fromARGB(250, 218, 98, 17),
            size: 28,
          ),
        ),
        title: const Text(
          "Pet Care",
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontSize: 24,
            fontWeight: FontWeight.bold,
            fontFamily: 'Pacifico',
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.pets, color: Colors.grey, size: 28),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const MyPetsForSale()),
              );
            },
          ),
          IconButton(
            icon: const Icon(
              Icons.logout,
              color: Color.fromARGB(255, 255, 140, 0),
              size: 28,
            ),
            onPressed: () => _logout(context),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 255, 235, 210),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color.fromARGB(50, 218, 98, 17)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.auto_fix_normal_outlined,
                        color: Color.fromARGB(255, 140, 66, 17)),
                    SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        "From health to happiness, PetCare handles it all",
                        style: TextStyle(
                          fontWeight: FontWeight.w600,
                          color: Color.fromARGB(255, 100, 40, 0),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),

            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Text(
                "My Pets",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),

            SizedBox(
              height: 120,
              child: _loadingPets
                  ? const Center(child: CircularProgressIndicator())
                  : ListView(
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      children: [
                        ...PetManager().pets.map(
                          (pet) => petCircleCard(
                            pet: pet,
                            onTap: () async {
                              await Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) => Petdetails(pet: pet),
                                ),
                              );
                              setState(() {});
                            },
                          ),
                        ),
                        addPetCircleCard(context, () => setState(() {})),
                      ],
                    ),
            ),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  Expanded(
                    child: _commercialCard(
                      title: "Buy Pets",
                      icon: Icons.pets,
                      color: const Color.fromARGB(255, 255, 152, 0),
                      onTap: () {
                        Navigator.push(context,
                            MaterialPageRoute(builder: (_) => const BuyPetsPage()));
                      },
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _commercialCard(
                      title: "Buy Products",
                      icon: Icons.shopping_bag_rounded,
                      color: const Color.fromARGB(255, 0, 150, 136),
                      onTap: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (_) => const BuyProductsPage()));
                      },
                    ),
                  ),
                ],
              ),
            ),

            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 16),
              child: Text(
                "Pet Services",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),

            GridView(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
                childAspectRatio: 0.95,
              ),
              children: [
                serviceCard(
                  "Doctors",
                  Icons.medical_services_rounded,
                  "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
                  () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const Doctordetails(isVet: false),
                    ),
                  ),
                ),
                serviceCard(
                  "Pet Shops",
                  Icons.store_mall_directory_rounded,
                  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
                  () => Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const Viewshop()),
                  ),
                ),
                serviceCard(
                  "Complaints",
                  Icons.message_rounded,
                  "https://images.unsplash.com/photo-1521791136064-7986c2920216",
                  () => Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const MyComplaintsPage()),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _commercialCard({
    required String title,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 80,
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: color.withOpacity(0.4),
              blurRadius: 12,
              offset: const Offset(0, 6),
            ),
          ],
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: Colors.white, size: 28),
            const SizedBox(width: 8),
            Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget petCircleCard({
    required Pet pet,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 90,
        margin: const EdgeInsets.only(right: 14),
        child: Column(
          children: [
            Container(
              height: 70,
              width: 70,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.1),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
                border: Border.all(color: Colors.white, width: 2),
              ),
              child: ClipOval(
                child: pet.imageUrl != null
                    ? Image.network(
                        pet.imageUrl!,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) =>
                            const Icon(Icons.pets),
                      )
                    : const Icon(Icons.pets, color: Colors.grey),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              pet.name,
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }

  Widget addPetCircleCard(BuildContext context, VoidCallback onUpdate) {
    return Container(
      width: 90,
      margin: const EdgeInsets.only(right: 14),
      child: Column(
        children: [
          InkWell(
            borderRadius: BorderRadius.circular(40),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const Petprofile()),
              ).then((_) => onUpdate());
            },
            child: Container(
              height: 70,
              width: 70,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                color: Color.fromARGB(255, 255, 230, 213),
              ),
              child: const Icon(
                Icons.add,
                size: 30,
                color: Color.fromARGB(250, 218, 98, 17),
              ),
            ),
          ),
          const SizedBox(height: 8),
          const Text("Add Pet", style: TextStyle(fontSize: 12)),
        ],
      ),
    );
  }

  Widget serviceCard(
    String title,
    IconData icon,
    String image,
    VoidCallback onTap,
  ) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(24),
          child: Stack(
            fit: StackFit.expand,
            children: [
              Image.network(image, fit: BoxFit.cover),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.bottomCenter,
                    end: Alignment.topCenter,
                    colors: [
                      Colors.black.withOpacity(0.7),
                      Colors.transparent,
                    ],
                  ),
                ),
              ),
              Align(
                alignment: Alignment.bottomLeft,
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(icon, color: Colors.white, size: 22),
                      const SizedBox(height: 4),
                      Text(
                        title,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

