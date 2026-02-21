// import 'package:flutter/material.dart';
// import 'package:petcareapp/pet_manager.dart';
// import 'package:petcareapp/petprofile.dart'; // Import for Edit Screen

// class Petdetails extends StatefulWidget {
//   final Pet pet;
//   const Petdetails({super.key, required this.pet});

//   @override
//   State<Petdetails> createState() => _PetdetailsState();
// }

// class _PetdetailsState extends State<Petdetails> {
//   // Refresh UI after edit
//   void _refresh() {
//     setState(() {});
//   }

//   @override
//   Widget build(BuildContext context) {
//     // Fetch fresh pet data (in case of edit)
//     // Note: Since we are not using a Stream/Provider/Riverpod, we rely on the object reference
//     // or need to find it again from the manager.
//     // For simplicity, we assume the object in PetManager is mutated or we look it up.
//     // Better practice: Look up by ID from manager.
//     Pet currentPet;
//     try {
//       currentPet = PetManager().pets.firstWhere((p) => p.id == widget.pet.id);
//     } catch (e) {
//       currentPet = widget.pet; // Fallback (e.g. if deleted)
//     }

//     return Scaffold(
//       backgroundColor: Colors.grey.shade100,
//       appBar: AppBar(
//         title: const Text(
//           'Pet Details',
//           style: TextStyle(
//             color: Color.fromARGB(250, 218, 98, 17),
//             fontWeight: FontWeight.bold,
//           ),
//         ),
//         centerTitle: true,
//         backgroundColor: Colors.white,
//         elevation: 1,
//         leading: IconButton(
//           icon: const Icon(Icons.arrow_back_ios_new,
//               color: Color.fromARGB(250, 218, 98, 17)),
//           onPressed: () => Navigator.pop(context),
//         ),
//         actions: [
//           IconButton(
//             icon: const Icon(Icons.edit, color: Color.fromARGB(250, 218, 98, 17)),
//             onPressed: () async {
//               await Navigator.push(
//                 context,
//                 MaterialPageRoute(
//                   builder: (_) => Petprofile(pet: currentPet),
//                 ),
//               );
//               _refresh();
//             },
//           )
//         ],
//       ),
//       body: Column(
//         children: [
//           Expanded(
//             child: SingleChildScrollView(
//               padding: const EdgeInsets.all(20),
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.center,
//                 children: [
//                   // 🐶 CIRCULAR IMAGE
//                   Center(
//                     child: Container(
//                       padding: const EdgeInsets.all(4), // Border width
//                       decoration: BoxDecoration(
//                         shape: BoxShape.circle,
//                         border: Border.all(
//                           color: const Color.fromARGB(250, 218, 98, 17),
//                           width: 3,
//                         ),
//                         boxShadow: [
//                           BoxShadow(
//                             color: Colors.black.withOpacity(0.1),
//                             blurRadius: 10,
//                             offset: const Offset(0, 5),
//                           ),
//                         ],
//                       ),
//                       child: CircleAvatar(
//                         radius: 80,
//                         backgroundColor: Colors.grey.shade200,
//                         backgroundImage: currentPet.image != null
//                             ? FileImage(currentPet.image!)
//                             : null,
//                         child: currentPet.image == null
//                             ? const Icon(Icons.pets,
//                                 size: 60, color: Colors.grey)
//                             : null,
//                       ),
//                     ),
//                   ),
//                   const SizedBox(height: 30),

//                   // 📄 DETAILS CARD
//                   Container(
//                     width: double.infinity,
//                     padding: const EdgeInsets.all(24),
//                     decoration: BoxDecoration(
//                       color: Colors.white,
//                       borderRadius: BorderRadius.circular(24),
//                       boxShadow: [
//                         BoxShadow(
//                           color: Colors.black.withOpacity(0.05),
//                           blurRadius: 15,
//                           offset: const Offset(0, 5),
//                         ),
//                       ],
//                     ),
//                     child: Column(
//                       crossAxisAlignment: CrossAxisAlignment.start,
//                       children: [
//                         detailRow("Name", currentPet.name),
//                         divider(),
//                         detailRow("Type", currentPet.type),
//                         divider(),
//                         detailRow("Breed", currentPet.breed),
//                         divider(),
//                         detailRow("Gender", currentPet.gender),
//                         divider(),
//                         detailRow("Age", "${currentPet.dob} years"),
//                         divider(),
//                         detailRow("DOB", "${currentPet.dob.day}/${currentPet.dob.month}/${currentPet.dob.year}"),
//                         divider(),
//                         detailRow("Weight", "${currentPet.weight} ${currentPet.weightUnit}"),
//                         divider(),
//                         detailRow("Notes", currentPet.notes.isEmpty ? "None" : currentPet.notes),
//                       ],
//                     ),
//                   ),

//                    const SizedBox(height: 20),

//                   // 💉 VACCINATIONS SECTION
//                   Container(
//                      width: double.infinity,
//                     padding: const EdgeInsets.all(24),
//                     decoration: BoxDecoration(
//                       color: Colors.white,
//                       borderRadius: BorderRadius.circular(24),
//                       boxShadow: [
//                         BoxShadow(
//                           color: Colors.black.withOpacity(0.05),
//                           blurRadius: 15,
//                           offset: const Offset(0, 5),
//                         ),
//                       ],
//                     ),
//                     child: Column(
//                       crossAxisAlignment: CrossAxisAlignment.start,
//                       children: [
//                         Row(
//                           mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                           children: [
//                             const Text(
//                               "Vaccinations",
//                               style: TextStyle(
//                                 fontSize: 18,
//                                 fontWeight: FontWeight.bold,
//                                 color: Colors.black87,
//                               ),
//                             ),
//                             IconButton(
//                               onPressed: () => _showAddVaccinationDialog(context, currentPet),
//                               icon: const Icon(Icons.add_circle, color: Color.fromARGB(250, 218, 98, 17)),
//                             )
//                           ],
//                         ),
//                         const SizedBox(height: 10),
//                         if (currentPet.lastVaccination.isEmpty)
//                           const Text("No vaccinations added.", style: TextStyle(color: Colors.grey)),
                        
//                         ...currentPet.vaccinations.map((v) => Padding(
//                           padding: const EdgeInsets.symmetric(vertical: 4),
//                           child: Row(
//                             children: [
//                               const Icon(Icons.check_circle, color: Colors.green, size: 20),
//                               const SizedBox(width: 10),
//                               Expanded(
//                                 child: RichText(
//                                   text: TextSpan(
//                                     text: v.name,
//                                     style: const TextStyle(fontSize: 16, color: Colors.black87, fontWeight: FontWeight.w500),
//                                     children: [
//                                        TextSpan(
//                                         text: "  (${v.date.day}/${v.date.month}/${v.date.year})",
//                                         style: const TextStyle(fontSize: 14, color: Colors.grey, fontWeight: FontWeight.normal),
//                                       ),
//                                     ],
//                                   ),
//                                 ),
//                               ),
//                             ],
//                           ),
//                         )),
//                       ],
//                     ),
//                   ),

//                   const SizedBox(height: 30),
//                 ],
//               ),
//             ),
//           ),

//           // 🗑️ DELETE BUTTON (Bottom)
//           Container(
//             padding: const EdgeInsets.all(20),
//             color: Colors.white,
//             child: SafeArea(
//               child: SizedBox(
//                 width: double.infinity,
//                 height: 55,
//                 child: ElevatedButton.icon(
//                   style: ElevatedButton.styleFrom(
//                     backgroundColor: Colors.red.shade50,
//                     foregroundColor: Colors.red,
//                     elevation: 0,
//                     shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(16),
//                       side: BorderSide(color: Colors.red.shade200),
//                     ),
//                   ),
//                   onPressed: () => _confirmDelete(context, currentPet),
//                   icon: const Icon(Icons.delete_outline),
//                   label: const Text(
//                     "Delete Pet",
//                     style: TextStyle(
//                       fontSize: 18,
//                       fontWeight: FontWeight.bold,
//                     ),
//                   ),
//                 ),
//               ),
//             ),
//           ),
//         ],
//       ),
//     );
//   }

//   Widget detailRow(String label, String value) {
//     return Padding(
//       padding: const EdgeInsets.symmetric(vertical: 12),
//       child: Row(
//         crossAxisAlignment: CrossAxisAlignment.start,
//         children: [
//           SizedBox(
//             width: 100,
//             child: Text(
//               label,
//               style: const TextStyle(
//                 fontSize: 16,
//                 color: Colors.black87,
//                 fontWeight: FontWeight.bold,
//               ),
//             ),
//           ),
//           Expanded(
//             child: Text(
//               value,
//               style: TextStyle(
//                 fontSize: 18,
//                 fontWeight: FontWeight.w600,
//                 color: Colors.grey.shade600,
//               ),
//               textAlign: TextAlign.end,
//             ),
//           ),
//         ],
//       ),
//     );
//   }

//   Widget divider() {
//     return Divider(
//       color: Colors.grey.shade100,
//       thickness: 1,
//       height: 1,
//     );
//   }

//   void _confirmDelete(BuildContext context, Pet pet) {
//     showDialog(
//       context: context,
//       builder: (ctx) => AlertDialog(
//         title: const Text("Delete Pet?"),
//         content: const Text("Are you sure you want to delete this pet? This action cannot be undone."),
//         shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
//         actions: [
//           TextButton(
//             onPressed: () => Navigator.pop(ctx),
//             child: const Text("Cancel", style: TextStyle(color: Colors.grey, fontSize: 16)),
//           ),
//           TextButton(
//             onPressed: () {
//               PetManager().deletePet(pet.id);
//               Navigator.pop(ctx); // Close Dialog
//               Navigator.pop(context); // Go back
//             },
//             child: const Text("Delete", style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 16)),
//           ),
//         ],
//       ),
//     );
//   }

//   void _showAddVaccinationDialog(BuildContext context, Pet pet) {
//     TextEditingController vacController = TextEditingController();
//     DateTime selectedDate = DateTime.now();

//     showDialog(
//       context: context,
//       builder: (ctx) => StatefulBuilder(
//         builder: (context, setState) {
//           return AlertDialog(
//             title: const Text("Add Vaccination"),
//             content: Column(
//               mainAxisSize: MainAxisSize.min,
//               children: [
//                 TextField(
//                   controller: vacController,
//                   decoration: const InputDecoration(hintText: "Vaccination Name"),
//                 ),
//                 const SizedBox(height: 20),
//                 Row(
//                   children: [
//                     const Text("Date: "),
//                     TextButton(
//                       onPressed: () async {
//                         final picked = await showDatePicker(
//                           context: context,
//                           initialDate: selectedDate,
//                           firstDate: DateTime(2000),
//                           lastDate: DateTime.now(),
//                         );
//                         if (picked != null) {
//                           setState(() {
//                             selectedDate = picked;
//                           });
//                         }
//                       },
//                       child: Text("${selectedDate.day}/${selectedDate.month}/${selectedDate.year}"),
//                     ),
//                   ],
//                 )
//               ],
//             ),
//             actions: [
//               TextButton(
//                 onPressed: () => Navigator.pop(ctx),
//                 child: const Text("Cancel"),
//               ),
//               ElevatedButton(
//                 onPressed: () {
//                   if (vacController.text.isNotEmpty) {
//                     // Update parent state to reflect change immediately? 
//                     // No, we are inside a dialog. We need to update the parent widget state or rely on the fact that we modify the object.
//                     // But we used setState in the parent to rebuild the list.
//                     // We can call a callback or just modify and call setState on parent when this closes?
//                     // Actually, we can just modify the pet object here. 
//                     // AND we need to trigger a rebuild of the PetDetails page.
//                     // The easiest way is to modify the object, then call setState in the PARENT widget after pop.
                    
//                     pet.vaccinations.add(Vaccination(name: vacController.text, date: selectedDate));
//                     PetManager().updatePet(pet);
                    
//                     Navigator.pop(ctx, true); // Return true to indicate change
//                   }
//                 },
//                 child: const Text("Add"),
//               ),
//             ],
//           );
//         }
//       ),
//     ).then((result) {
//       if (result == true) {
//         setState(() {}); // Refresh parent to show new item
//       }
//     });
//   }
// }

import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/pet_manager.dart';
import 'package:petcareapp/petprofile.dart';

// ⚠️ Ensure these exist globally
// final Dio dio = Dio();
// const String baseUrl = 'http://your-api-url';

class Petdetails extends StatefulWidget {
  final Pet pet;

  const Petdetails({super.key, required this.pet});

  @override
  State<Petdetails> createState() => _PetdetailsState();
}

class _PetdetailsState extends State<Petdetails> {
  // ---------------- DELETE PET ----------------
  Future<void> deletePet(String? id) async {
    if (id == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Pet ID missing")),
      );
      return;
    }

    try {
      final res = await dio.delete('$baseUrl/api/pets/$id');

      if (res.statusCode == 200 || res.statusCode == 201) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("Deleted Successfully")),
        );
        Navigator.pop(context);
        getPetdetailsApi();
      }
    } catch (e) {
      debugPrint("Delete error: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    // 🔐 SAFE PET LOOKUP
    final Pet currentPet = PetManager()
        .pets
        .where((p) => p.id != null)
        .cast<Pet?>()
        .firstWhere(
          (p) => p!.id == widget.pet.id,
          orElse: () => widget.pet,
        )!;

    // 🔐 SAFE IMAGE PROVIDER
    ImageProvider? imageProvider;
    if (currentPet.image != null) {
      imageProvider = FileImage(currentPet.image!);
    } else if (currentPet.imageUrl != null &&
        currentPet.imageUrl!.isNotEmpty) {
      imageProvider = NetworkImage(currentPet.imageUrl!);
    }

    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text(
          "Pet Details",
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new,
              color: Color.fromARGB(250, 218, 98, 17)),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit,
                color: Color.fromARGB(250, 218, 98, 17)),
            onPressed: () async {
              await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => Petprofile(pet: currentPet),
                ),
              );

              if (!mounted) return;
              setState(() {});
            },
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  // 🐶 IMAGE
                  Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: const Color.fromARGB(250, 218, 98, 17),
                        width: 3,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 10,
                          offset: const Offset(0, 5),
                        ),
                      ],
                    ),
                    child: CircleAvatar(
                      radius: 80,
                      backgroundColor: Colors.grey.shade200,
                      backgroundImage: imageProvider,
                      child: imageProvider == null
                          ? const Icon(Icons.pets,
                              size: 60, color: Colors.grey)
                          : null,
                    ),
                  ),

                  const SizedBox(height: 30),

                  // 📄 DETAILS CARD
                  _card(
                    Column(
                      children: [
                        _row("Name", currentPet.name),
                        _divider(),
                        _row("Type", currentPet.type),
                        _divider(),
                        _row("Breed", currentPet.breed),
                        _divider(),
                        _row("Gender", currentPet.gender ?? "Not set"),
                        _divider(),
                        _row(
                          "Weight",
                          "${currentPet.weight} ${currentPet.weightUnit}",
                        ),
                        _divider(),
                        _row(
                          "Last Vaccination",
                          currentPet.lastVaccination != null
                              ? _formatDate(
                                  currentPet.lastVaccination!)
                              : "Not recorded",
                        ),
                        _divider(),
                        _row(
                          "Notes",
                          currentPet.notes.isEmpty
                              ? "None"
                              : currentPet.notes,
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 30),
                ],
              ),
            ),
          ),

          // 🗑 DELETE BUTTON
          Container(
            padding: const EdgeInsets.all(20),
            color: Colors.white,
            child: SafeArea(
              child: SizedBox(
                width: double.infinity,
                height: 55,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red.shade50,
                    foregroundColor: Colors.red,
                    elevation: 0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                      side: BorderSide(color: Colors.red.shade200),
                    ),
                  ),
                  onPressed: () => _confirmDelete(context, currentPet),
                  icon: const Icon(Icons.delete_outline),
                  label: const Text(
                    "Delete Pet",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ---------------- UI HELPERS ----------------

  Widget _card(Widget child) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 15,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: child,
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Row(
        children: [
          SizedBox(
            width: 120,
            child: Text(
              label,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              textAlign: TextAlign.end,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
                color: Colors.grey.shade600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _divider() {
    return Divider(color: Colors.grey.shade100);
  }

  String _formatDate(DateTime date) {
    return "${date.day}/${date.month}/${date.year}";
  }

  void _confirmDelete(BuildContext context, Pet pet) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text("Delete Pet?"),
        content: const Text(
          "Are you sure you want to delete this pet? This action cannot be undone.",
        ),
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child:
                const Text("Cancel", style: TextStyle(color: Colors.grey)),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              deletePet(pet.id);
            },
            child: const Text(
              "Delete",
              style:
                  TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }
}
