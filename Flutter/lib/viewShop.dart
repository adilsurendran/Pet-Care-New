// import 'package:flutter/material.dart';
// import 'package:petcareapp/register.dart';
// import 'package:petcareapp/service_manager.dart';
// import 'package:petcareapp/service_models.dart';
// import 'package:petcareapp/details/shop_detail_page.dart';

// class Viewshop extends StatefulWidget {
//   const Viewshop({super.key});

//   @override
//   State<Viewshop> createState() => _ViewshopState();
// }

// class _ViewshopState extends State<Viewshop> {

//   Future<void> getShopApi() async{
//     try {
//       final response = await dio.get('$baseUrl/api/shops/withProduct');
//       print(response.data);
//     } catch (e) {
//       print(e);
//     }
//   }

  

//   String searchQuery = "";
//   @override
//   void initState() {
//     // TODO: implement initState
//     super.initState();
//     getShopApi();
//   }

//   @override
//   Widget build(BuildContext context) {
//     List<PetShop> displayList = ServiceManager().shops.where((s) => 
//       s.name.toLowerCase().contains(searchQuery.toLowerCase()) || 
//       s.location.toLowerCase().contains(searchQuery.toLowerCase())
//     ).toList();

//     return Scaffold(
//       backgroundColor: Colors.grey.shade100,

//       // 🔹 APP BAR
//       appBar: AppBar(
//         backgroundColor: Colors.white,
//         elevation: 1,
//         centerTitle: true,
//         leading: IconButton(
//           icon: const Icon(
//             Icons.arrow_back_ios_new,
//             color: Color.fromARGB(250, 218, 98, 17),
//           ),
//           onPressed: () => Navigator.pop(context),
//         ),
//         title: const Text(
//           'Pet Shops',
//           style: TextStyle(
//             color: Color.fromARGB(250, 218, 98, 17),
//             fontSize: 22,
//             fontWeight: FontWeight.bold,
//             fontFamily: 'Pacifico',
//           ),
//         ),
//       ),

//       body: Column(
//         children: [

//           // 🔍 SEARCH BAR
//           Padding(
//             padding: const EdgeInsets.all(16),
//             child: TextFormField(
//               onChanged: (val) => setState(() => searchQuery = val),
//               decoration: InputDecoration(
//                 prefixIcon: const Icon(Icons.search),
//                 labelText: 'Search shops',
//                 filled: true,
//                 fillColor: const Color.fromARGB(255, 233, 233, 233),
//                 border: OutlineInputBorder(
//                   borderRadius: BorderRadius.circular(14),
//                 ),
//                 enabledBorder: OutlineInputBorder(
//                   borderRadius: BorderRadius.circular(14),
//                   borderSide: BorderSide(color: Colors.grey.shade300),
//                 ),
//                 focusedBorder: OutlineInputBorder(
//                   borderRadius: BorderRadius.circular(14),
//                   borderSide: const BorderSide(
//                     color: Color.fromARGB(250, 218, 98, 17),
//                     width: 1.5,
//                   ),
//                 ),
//               ),
//             ),
//           ),

//           // 🛍️ SHOP LIST
//           Expanded(
//             child: displayList.isEmpty 
//               ? const Center(child: Text("No shops found"))
//               : ListView.builder(
//               padding: const EdgeInsets.symmetric(horizontal: 16),
//               itemCount: displayList.length,
//               itemBuilder: (context, index) {
//                 final shop = displayList[index];
//                 return GestureDetector(
//                    onTap: () {
//                     Navigator.push(context, MaterialPageRoute(builder: (_) => ShopDetailPage(shop: shop)));
//                   },
//                   child: Container(
//                     margin: const EdgeInsets.only(bottom: 14),
//                     decoration: BoxDecoration(
//                       color: Colors.white,
//                       borderRadius: BorderRadius.circular(18),
//                       boxShadow: [
//                         BoxShadow(
//                           color: Colors.black.withOpacity(0.06),
//                           blurRadius: 10,
//                           offset: const Offset(0, 5),
//                         ),
//                       ],
//                     ),
//                     child: Padding(
//                       padding: const EdgeInsets.all(14),
//                       child: Row(
//                         children: [
//                           // 🖼 SHOP IMAGE
//                           ClipRRect(
//                             borderRadius: BorderRadius.circular(14),
//                             child: Image.network(
//                               shop.image,
//                               width: 80,
//                               height: 80,
//                               fit: BoxFit.cover,
//                             ),
//                           ),
                  
//                           const SizedBox(width: 14),
                  
//                           // 📍 DETAILS
//                           Expanded(
//                             child: Column(
//                               crossAxisAlignment: CrossAxisAlignment.start,
//                               children: [
//                                 Text(
//                                   shop.name,
//                                   style: const TextStyle(
//                                     fontSize: 16,
//                                     fontWeight: FontWeight.w600,
//                                   ),
//                                 ),
//                                 const SizedBox(height: 6),
//                                 Text(
//                                   shop.location,
//                                   style: const TextStyle(fontSize: 13),
//                                 ),
//                                 const SizedBox(height: 4),
//                                 Row(
//                                   children: [
//                                     const Icon(Icons.star,
//                                         size: 16, color: Colors.orange),
//                                     const SizedBox(width: 4),
//                                     Text(
//                                       '${shop.rating} Reviews',
//                                       style: const TextStyle(fontSize: 13),
//                                     ),
//                                   ],
//                                 ),
//                               ],
//                             ),
//                           ),
                  
//                           // ➡️ ICON
//                           const Icon(
//                             Icons.arrow_forward_ios,
//                             size: 16,
//                             color: Color.fromARGB(250, 218, 98, 17),
//                           ),
//                         ],
//                       ),
//                     ),
//                   ),
//                 );
//               },
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }

// import 'package:flutter/material.dart';
// import 'package:petcareapp/register.dart';
// import 'package:petcareapp/service_models.dart';
// import 'package:petcareapp/details/shop_detail_page.dart';

// class Viewshop extends StatefulWidget {
//   const Viewshop({super.key});

//   @override
//   State<Viewshop> createState() => _ViewshopState();
// }

// class _ViewshopState extends State<Viewshop> {
//   List<PetShop> shops = [];
//   List<PetShop> filteredShops = [];
//   bool loading = true;
//   String searchQuery = "";

//   @override
//   void initState() {
//     super.initState();
//     getShopApi();
//   }

//   Future<void> getShopApi() async {
//     try {
//       final response = await dio.get('$baseUrl/api/shops/withProduct');

//       final List data = response.data["shops"];

//       final List<PetShop> loadedShops =
//           data.map((e) => PetShop.fromJson(e)).toList();

//       setState(() {
//         shops = loadedShops;
//         filteredShops = loadedShops;
//         loading = false;
//       });
//       print(response.data);
//     } catch (e) {
//       print(e);
//       setState(() => loading = false);
//     }
//   }

//   void applySearch(String value) {
//     setState(() {
//       searchQuery = value;
//       filteredShops = shops
//           .where((s) =>
//               s.name.toLowerCase().contains(value.toLowerCase()) ||
//               s.address.toLowerCase().contains(value.toLowerCase()))
//           .toList();
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.grey.shade100,

//       // 🔹 APP BAR
//       appBar: AppBar(
//         backgroundColor: Colors.white,
//         elevation: 1,
//         centerTitle: true,
//         leading: IconButton(
//           icon: const Icon(Icons.arrow_back_ios_new,
//               color: Color.fromARGB(250, 218, 98, 17)),
//           onPressed: () => Navigator.pop(context),
//         ),
//         title: const Text(
//           'Pet Shops',
//           style: TextStyle(
//             color: Color.fromARGB(250, 218, 98, 17),
//             fontSize: 22,
//             fontWeight: FontWeight.bold,
//             fontFamily: 'Pacifico',
//           ),
//         ),
//       ),

//       body: Column(
//         children: [
//           // 🔍 SEARCH
//           Padding(
//             padding: const EdgeInsets.all(16),
//             child: TextFormField(
//               onChanged: applySearch,
//               decoration: InputDecoration(
//                 prefixIcon: const Icon(Icons.search),
//                 labelText: 'Search shops',
//                 filled: true,
//                 fillColor: const Color.fromARGB(255, 233, 233, 233),
//                 border: OutlineInputBorder(
//                   borderRadius: BorderRadius.circular(14),
//                 ),
//               ),
//             ),
//           ),

//           // 🏪 SHOP LIST
//           Expanded(
//             child: loading
//                 ? const Center(child: CircularProgressIndicator())
//                 : filteredShops.isEmpty
//                     ? const Center(child: Text("No shops found"))
//                     : ListView.builder(
//                         padding: const EdgeInsets.symmetric(horizontal: 16),
//                         itemCount: filteredShops.length,
//                         itemBuilder: (context, index) {
//                           final shop = filteredShops[index];

//                           return GestureDetector(
//                             onTap: () {
//                               Navigator.push(
//                                 context,
//                                 MaterialPageRoute(
//                                   builder: (_) =>
//                                       ShopDetailPage(shop: shop),
//                                 ),
//                               );
//                             },
//                             child: Container(
//                               margin: const EdgeInsets.only(bottom: 14),
//                               decoration: BoxDecoration(
//                                 color: Colors.white,
//                                 borderRadius: BorderRadius.circular(18),
//                                 boxShadow: [
//                                   BoxShadow(
//                                     color: Colors.black.withOpacity(0.06),
//                                     blurRadius: 10,
//                                     offset: const Offset(0, 5),
//                                   ),
//                                 ],
//                               ),
//                               child: Padding(
//                                 padding: const EdgeInsets.all(14),
//                                 child: Row(
//                                   children: [
//                                     // 🏬 SHOP ICON
//                                     Container(
//                                       width: 80,
//                                       height: 80,
//                                       decoration: BoxDecoration(
//                                         color: Colors.orange.shade100,
//                                         borderRadius: BorderRadius.circular(14),
//                                       ),
//                                       child: const Icon(
//                                         Icons.store,
//                                         size: 40,
//                                         color:
//                                             Color.fromARGB(250, 218, 98, 17),
//                                       ),
//                                     ),

//                                     const SizedBox(width: 14),

//                                     // 📍 DETAILS
//                                     Expanded(
//                                       child: Column(
//                                         crossAxisAlignment:
//                                             CrossAxisAlignment.start,
//                                         children: [
//                                           Text(
//                                             shop.name,
//                                             style: const TextStyle(
//                                                 fontSize: 16,
//                                                 fontWeight: FontWeight.w600),
//                                           ),
//                                           const SizedBox(height: 6),
//                                           Text(
//                                             shop.address,
//                                             style:
//                                                 const TextStyle(fontSize: 13),
//                                           ),
//                                           const SizedBox(height: 6),
//                                           Text(
//                                             "Products: ${shop.products.length}",
//                                             style: const TextStyle(
//                                                 fontSize: 12,
//                                                 color: Colors.grey),
//                                           ),
//                                         ],
//                                       ),
//                                     ),

//                                     const Icon(Icons.arrow_forward_ios,
//                                         size: 16,
//                                         color:
//                                             Color.fromARGB(250, 218, 98, 17)),
//                                   ],
//                                 ),
//                               ),
//                             ),
//                           );
//                         },
//                       ),
//           ),
//         ],
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/service_models.dart';
import 'package:petcareapp/details/shop_detail_page.dart';

class Viewshop extends StatefulWidget {
  const Viewshop({super.key});

  @override
  State<Viewshop> createState() => _ViewshopState();
}

class _ViewshopState extends State<Viewshop> {
  List<PetShop> shops = [];
  List<PetShop> filteredShops = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    getShopApi();
  }

  Future<void> getShopApi() async {
    try {
      final response = await dio.get('$baseUrl/api/shops/withProduct');
      final List data = response.data["shops"];

      final List<PetShop> loadedShops =
          data.map((e) => PetShop.fromJson(e)).toList();

      setState(() {
        shops = loadedShops;
        filteredShops = loadedShops;
        loading = false;
      });
    } catch (e) {
      print(e);
      setState(() => loading = false);
    }
  }

  void applySearch(String value) {
    setState(() {
      filteredShops = shops
          .where((s) =>
              s.name.toLowerCase().contains(value.toLowerCase()) ||
              s.address.toLowerCase().contains(value.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,

      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new,
              color: Color.fromARGB(250, 218, 98, 17)),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Pet Shops',
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontSize: 22,
            fontWeight: FontWeight.bold,
            fontFamily: 'Pacifico',
          ),
        ),
      ),

      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextFormField(
              onChanged: applySearch,
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search),
                labelText: 'Search shops',
                filled: true,
                fillColor: const Color.fromARGB(255, 233, 233, 233),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
            ),
          ),

          Expanded(
            child: loading
                ? const Center(child: CircularProgressIndicator())
                : filteredShops.isEmpty
                    ? const Center(child: Text("No shops found"))
                    : ListView.builder(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        itemCount: filteredShops.length,
                        itemBuilder: (context, index) {
                          final shop = filteredShops[index];

                          return GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) =>
                                      ShopDetailPage(shop: shop),
                                ),
                              );
                            },
                            child: Container(
                              margin: const EdgeInsets.only(bottom: 14),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(18),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.06),
                                    blurRadius: 10,
                                    offset: const Offset(0, 5),
                                  ),
                                ],
                              ),
                              child: Padding(
                                padding: const EdgeInsets.all(14),
                                child: Row(
                                  children: [
                                    ClipRRect(
                                      borderRadius: BorderRadius.circular(14),
                                      child: Image.network(
                                        "$baseUrl/${shop.shopLogo.replaceAll("\\", "/")}",
                                        width: 80,
                                        height: 80,
                                        fit: BoxFit.cover,
                                      ),
                                    ),

                                    const SizedBox(width: 14),

                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            shop.name,
                                            style: const TextStyle(
                                                fontSize: 16,
                                                fontWeight: FontWeight.w600),
                                          ),
                                          const SizedBox(height: 6),
                                          Text(
                                            shop.address,
                                            style: const TextStyle(
                                                fontSize: 13),
                                          ),
                                          const SizedBox(height: 6),
                                          Text(
                                            "Products: ${shop.products.length}",
                                            style: const TextStyle(
                                                fontSize: 12,
                                                color: Colors.grey),
                                          ),
                                        ],
                                      ),
                                    ),

                                    const Icon(Icons.arrow_forward_ios,
                                        size: 16,
                                        color:
                                            Color.fromARGB(250, 218, 98, 17)),
                                  ],
                                ),
                              ),
                            ),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}
