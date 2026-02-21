
import 'package:flutter/material.dart';
import 'package:petcareapp/service_manager.dart';
import 'package:petcareapp/service_models.dart';
import 'package:petcareapp/details/generic_detail_page.dart';

class Viewpetparks extends StatefulWidget {
  const Viewpetparks({super.key});

  @override
  State<Viewpetparks> createState() => _ViewpetparksState();
}

class _ViewpetparksState extends State<Viewpetparks> {
  String searchQuery = "";

  @override
  Widget build(BuildContext context) {
    List<ServiceProvider> displayList = ServiceManager().parks.where((s) => 
      s.name.toLowerCase().contains(searchQuery.toLowerCase()) || 
      s.location.toLowerCase().contains(searchQuery.toLowerCase())
    ).toList();

    return Scaffold(
      backgroundColor: Colors.grey.shade100,

      // 🔹 APP BAR
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios_new,
            color: Color.fromARGB(250, 218, 98, 17),
          ),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Pet Parks',
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

          // 🔍 SEARCH BAR
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextFormField(
              onChanged: (val) => setState(() => searchQuery = val),
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search),
                labelText: 'Search parks',
                filled: true,
                fillColor: const Color.fromARGB(255, 233, 233, 233),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: BorderSide(color: Colors.grey.shade300),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: const BorderSide(
                    color: Color.fromARGB(250, 218, 98, 17),
                    width: 1.5,
                  ),
                ),
              ),
            ),
          ),

          // 🌳 PARK LIST
          Expanded(
            child: displayList.isEmpty 
              ? const Center(child: Text("No parks found"))
              : ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              itemCount: displayList.length,
              itemBuilder: (context, index) {
                final park = displayList[index];
                return GestureDetector(
                   onTap: () {
                    Navigator.push(context, MaterialPageRoute(builder: (_) => GenericDetailPage(service: park)));
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
                    padding: const EdgeInsets.all(14),
                    child: Row(
                      children: [
                        // 🖼 PARK IMAGE
                        ClipRRect(
                          borderRadius: BorderRadius.circular(14),
                          child: Image.network(
                            park.image,
                            width: 80,
                            height: 80,
                            fit: BoxFit.cover,
                          ),
                        ),
                  
                        const SizedBox(width: 14),
                  
                        // 📍 DETAILS
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // NAME + STATUS
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      park.name,
                                      style: const TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                  if (park.extras['isOpen'] == true)
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 8, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: Colors.green.withOpacity(0.12),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: const Text(
                                      'Open',
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: Colors.green,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                  
                              const SizedBox(height: 6),
                  
                              Text(
                                park.location,
                                style: const TextStyle(fontSize: 13),
                              ),
                  
                              const SizedBox(height: 6),
                  
                              // ⭐ RATING + DISTANCE
                              Row(
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 8, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: Colors.orange.withOpacity(0.15),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: Row(
                                      children: [
                                        const Icon(Icons.star,
                                            size: 14, color: Colors.orange),
                                        const SizedBox(width: 4),
                                        Text(
                                          park.rating.toString(),
                                          style: const TextStyle(fontSize: 12),
                                        ),
                                      ],
                                    ),
                                  ),
                                  const SizedBox(width: 10),
                                  if (park.extras['distance'] != null)
                                    Text(
                                    park.extras['distance'],
                                    style: const TextStyle(fontSize: 12),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                  
                        // ➡️ ICON
                        const Icon(
                          Icons.arrow_forward_ios,
                          size: 16,
                          color: Color.fromARGB(250, 218, 98, 17),
                        ),
                      ],
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
