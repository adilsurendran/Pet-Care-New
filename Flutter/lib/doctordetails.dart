// import 'package:flutter/material.dart';
// import 'package:petcareapp/register.dart';
// import 'package:petcareapp/service_manager.dart';
// import 'package:petcareapp/service_models.dart';
// import 'package:petcareapp/details/doctor_detail_page.dart';

// class Doctordetails extends StatefulWidget {
//   final bool isVet;
//   const Doctordetails({super.key, this.isVet = false});

//   @override
//   State<Doctordetails> createState() => _DoctordetailsState();
// }

// // Future<void> getDoctorApi(BuildContext context) async{
// //   try {
// //     final response = await dio.get('$baseUrl/api/getalldoctors');
// //     print(response.data);
// //     if (response.statusCode==200 || response.statusCode==201) {
// //        ScaffoldMessenger.of(context).showSnackBar(
// //         const SnackBar(content: Text("Doctor fetched succesfully")),
// //       );
// //     }
// //   } catch (e) {
// //     print(e);
// //   }
// // }



// class _DoctordetailsState extends State<Doctordetails> {
//   String searchQuery = "";

//  @override
// void initState() {
//   super.initState();
//   if (!widget.isVet) {
//     ServiceManager().fetchDoctors(context).then((_) {
//       setState(() {});
//     });
//   }
// }


//   @override
//   Widget build(BuildContext context) {
//     // Get list based on isVet
//     List<Doctor> allItems = widget.isVet ? ServiceManager().vets : ServiceManager().doctors;
    
//     // Filter by search
//     List<Doctor> displayList = allItems.where((d) => 
//       d.name.toLowerCase().contains(searchQuery.toLowerCase()) || 
//       d.location.toLowerCase().contains(searchQuery.toLowerCase())
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
//         title: Text(
//           widget.isVet ? 'Vet Hospitals' : 'Doctors',
//           style: const TextStyle(
//             color: Color.fromARGB(250, 218, 98, 17),
//             fontSize: 22,
//             fontWeight: FontWeight.bold,
//             fontFamily: 'Pacifico',
//           ),
//         ),
//       ),

//       body: Column(
//         children: [
//            // 🔍 SEARCH BAR
//           Padding(
//             padding: const EdgeInsets.all(16),
//             child: TextFormField(
//               onChanged: (val) {
//                 setState(() {
//                   searchQuery = val;
//                 });
//               },
//               decoration: InputDecoration(
//                 prefixIcon: const Icon(Icons.search),
//                 labelText: widget.isVet ? 'Search vets' : 'Search doctors',
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

//           Expanded(
//             child: displayList.isEmpty 
//             ? const Center(child: Text("No matches found"))
//             : ListView.builder(
//               padding: const EdgeInsets.symmetric(horizontal: 16),
//               itemCount: displayList.length,
//               itemBuilder: (context, index) {
//                 final item = displayList[index];
//                 return GestureDetector(
//                   onTap: () {
//                     Navigator.push(context, MaterialPageRoute(builder: (_) => DoctorDetailPage(doctor: item)));
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
                  
//                           // 👤 IMAGE
//                           ClipRRect(
//                             borderRadius: BorderRadius.circular(14),
//                             child: Image.network(
//                               item.image,
//                               width: 70,
//                               height: 70,
//                               fit: BoxFit.cover,
//                             ),
//                           ),
                  
//                           const SizedBox(width: 14),
                  
//                           // 📋 DETAILS
//                           Expanded(
//                             child: Column(
//                               crossAxisAlignment: CrossAxisAlignment.start,
//                               children: [
//                                 Text(
//                                   item.name,
//                                   style: const TextStyle(
//                                     fontSize: 16,
//                                     fontWeight: FontWeight.w600,
//                                   ),
//                                 ),
//                                 const SizedBox(height: 6),
//                                 Text(
//                                   'Qualification: ${item.qualification}',
//                                   style: const TextStyle(fontSize: 13),
//                                 ),
//                                 const SizedBox(height: 2),
//                                 Text(
//                                   'Experience: ${item.experience}',
//                                   style: const TextStyle(fontSize: 13),
//                                 ),
//                               ],
//                             ),
//                           ),
                  
//                           // ➡️ ACTION ICON
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


import 'package:flutter/material.dart';
import 'package:petcareapp/service_manager.dart';
import 'package:petcareapp/service_models.dart';
import 'package:petcareapp/details/doctor_detail_page.dart';

class Doctordetails extends StatefulWidget {
  final bool isVet;
  const Doctordetails({super.key, this.isVet = false});

  @override
  State<Doctordetails> createState() => _DoctordetailsState();
}

class _DoctordetailsState extends State<Doctordetails> {
  String searchQuery = "";

  @override
  void initState() {
    super.initState();
    if (!widget.isVet) {
      ServiceManager().fetchDoctors(context).then((_) {
        setState(() {});
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    List<Doctor> allItems =
        widget.isVet ? ServiceManager().vets : ServiceManager().doctors;

    List<Doctor> displayList = allItems.where((d) {
      return d.name.toLowerCase().contains(searchQuery.toLowerCase()) ||
          d.location.toLowerCase().contains(searchQuery.toLowerCase());
    }).toList();

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
        title: Text(
          widget.isVet ? 'Vet Hospitals' : 'Doctors',
          style: const TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontSize: 22,
            fontWeight: FontWeight.bold,
            fontFamily: 'Pacifico',
          ),
        ),
      ),

      body: Column(
        children: [
          // 🔍 SEARCH
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextFormField(
              onChanged: (val) => setState(() => searchQuery = val),
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.search),
                labelText:
                    widget.isVet ? 'Search vets' : 'Search doctors',
                filled: true,
                fillColor: const Color.fromARGB(255, 233, 233, 233),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
            ),
          ),

          Expanded(
            child: displayList.isEmpty
                ? const Center(child: Text("No matches found"))
                : ListView.builder(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: displayList.length,
                    itemBuilder: (context, index) {
                      final item = displayList[index];

                      return GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) =>
                                  DoctorDetailPage(doctor: item),
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
                                // 👤 IMAGE (SAFE)
                                ClipRRect(
                                  borderRadius:
                                      BorderRadius.circular(14),
                                  child: item.image.isNotEmpty
                                      ? Image.network(
                                          item.image,
                                          width: 70,
                                          height: 70,
                                          fit: BoxFit.cover,
                                          errorBuilder:
                                              (_, __, ___) =>
                                                  _placeholder(),
                                        )
                                      : _placeholder(),
                                ),

                                const SizedBox(width: 14),

                                // 📋 DETAILS (NO OVERFLOW)
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        item.name,
                                        maxLines: 1,
                                        overflow:
                                            TextOverflow.ellipsis,
                                        style: const TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      const SizedBox(height: 6),
                                      Text(
                                        'Qualification: ${item.qualification}',
                                        maxLines: 1,
                                        overflow:
                                            TextOverflow.ellipsis,
                                        style: const TextStyle(
                                            fontSize: 13),
                                      ),
                                      const SizedBox(height: 2),
                                      Text(
                                        'Experience: ${item.experience}',
                                        maxLines: 1,
                                        overflow:
                                            TextOverflow.ellipsis,
                                        style: const TextStyle(
                                            fontSize: 13),
                                      ),
                                    ],
                                  ),
                                ),

                                const Icon(
                                  Icons.arrow_forward_ios,
                                  size: 16,
                                  color:
                                      Color.fromARGB(250, 218, 98, 17),
                                ),
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

  // 🔹 Placeholder avatar
  Widget _placeholder() {
    return Container(
      width: 70,
      height: 70,
      color: Colors.grey.shade200,
      child: const Icon(Icons.person, size: 40, color: Colors.grey),
    );
  }
}
