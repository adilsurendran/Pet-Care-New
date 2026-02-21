// import 'package:flutter/material.dart';
// import 'package:petcareapp/register.dart';
// import 'package:petcareapp/service_models.dart';



//  Future<void> getDoctorApi( context) async{
//   try {
//     final response = await dio.get('$baseUrl/api/getalldoctors');
//     print(response.data);
//     if (response.statusCode==200 || response.statusCode==201) {
//        ScaffoldMessenger.of(context).showSnackBar(
//         const SnackBar(content: Text("Doctor fetched succesfully")),
//       );
//     }
//   } catch (e) {
//     print(e);
//   }
// }
// class ServiceManager {
//   static final ServiceManager _instance = ServiceManager._internal();
//   factory ServiceManager() => _instance;
//   ServiceManager._internal();

 



//   // 🩺 DOCTORS
//   final List<Doctor> _doctors = [
//     Doctor(
//       id: "d1",
//       name: "Dr. Alex",
//       qualification: "BBSc & AH",
//       experience: "4 years",
//       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuHiVcMPRAYoWo4kWrrQwRunOiVLBRNBVujA&s",
//       rating: 4.8,
//       location: "Calicut",
//       description: "Expert in small animal medicine and surgery. Loves dogs and cats.",
//     ),
//     Doctor(
//       id: "d2",
//       name: "Dr. Sarah",
//       qualification: "MVSc (Surgery)",
//       experience: "7 years",
//       image: "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnXVg5.jpg",
//       rating: 4.9,
//       location: "Cochin",
//       description: "Specialist in orthopedic surgery for pets.",
//     ),
//     Doctor(
//       id: "d3",
//       name: "Dr. John",
//       qualification: "BVSc",
//       experience: "2 years",
//       image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
//       rating: 4.5,
//       location: "Trivandrum",
//       description: "General practitioner with a passion for preventive care.",
//     ),
//   ];

//   // 🏥 VETS (Similar model to Doctor but categorized separately if needed, or filtered)
//   final List<Doctor> _vets = [
//      Doctor(
//       id: "v1",
//       name: "City Vet Hospital",
//       qualification: "Multi-Specialty",
//       experience: "15 years",
//       image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def",
//       rating: 4.7,
//       location: "Kozhikode",
//       isVet: true,
//       description: "24/7 Emergency Veterinary Hospital with state-of-the-art facilities.",
//     ),
//      Doctor(
//       id: "v2",
//       name: "Pet Care Clinic",
//       qualification: "Clinic",
//       experience: "10 years",
//       image: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783",
//       rating: 4.6,
//       location: "Malappuram",
//       isVet: true,
//       description: "Comprehensive care for your furry friends.",
//     ),
//   ];

//   // 🛍️ PET SHOPS
//   final List<PetShop> _shops = [
//     PetShop(
//       id: "s1",
//       name: "AKB Pet Shop",
//       location: "Ramanattukara",
//       image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd",
//       rating: 4.3,
//       description: "Everything your pet needs, from food to toys.",
//       products: ["Pedigree", "Whiskas", "Pet Toys", "Accessories"],
//     ),
//     PetShop(
//       id: "s2",
//       name: "Paws & Tails",
//       location: "Calicut Town",
//       image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
//       rating: 4.5,
//       description: "Premium pet supplies and grooming products.",
//     ),
//   ];

//   // ✂️ GROOMERS
//   final List<ServiceProvider> _groomers = [
//     ServiceProvider(
//       id: "g1",
//       name: "AKB Grooming Center",
//       category: "Groomer",
//       location: "Ramanattukara",
//       image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7",
//       rating: 4.4,
//       description: "Professional grooming services for dogs and cats.",
//     ),
//      ServiceProvider(
//       id: "g2",
//       name: "Fluffy Paws",
//       category: "Groomer",
//       location: "Kannur",
//       image: "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a",
//       rating: 4.7,
//       description: "Spa day for your pets.",
//     ),
//   ];

//   // 🏋️ TRAINERS
//   final List<ServiceProvider> _trainers = [
//     ServiceProvider(
//       id: "t1",
//       name: "AKB Trainer",
//       category: "Trainer",
//       location: "Ramanattukara",
//       image: "https://images.unsplash.com/photo-1534361960057-19889db9621e",
//       rating: 4.6,
//       description: "Certified dog trainer with 10 years of experience.",
//     ),
//     ServiceProvider(
//       id: "t2",
//       name: "Good Boy Training",
//       category: "Trainer",
//       location: "Kochi",
//       image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
//       rating: 4.8,
//       description: "Positive reinforcement training for puppies and adult dogs.",
//     ),
//   ];

//   // 🌳 PET PARKS
//   final List<ServiceProvider> _parks = [
//     ServiceProvider(
//       id: "p1",
//       name: "AKB Pet Park",
//       category: "Pet Park",
//       location: "Ramanattukara",
//       image: "https://images.unsplash.com/photo-1597633425046-08f5110420b5",
//       rating: 4.5,
//       description: "A fun place for your pets to run and play.",
//       extras: {"distance": "2.1 km", "isOpen": true},
//     ),
//      ServiceProvider(
//       id: "p2",
//       name: "Central Bark",
//       category: "Pet Park",
//       location: "City Center",
//       image: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea92f5",
//       rating: 4.6,
//       description: "Large fenced area with agility courses.",
//       extras: {"distance": "5.0 km", "isOpen": true},
//     ),
//   ];

//   List<Doctor> get doctors => _doctors;
//   List<Doctor> get vets => _vets;
//   List<PetShop> get shops => _shops;
//   List<ServiceProvider> get groomers => _groomers;
//   List<ServiceProvider> get trainers => _trainers;
//   List<ServiceProvider> get parks => _parks;
// }


import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/service_models.dart';

class ServiceManager {
  static final ServiceManager _instance = ServiceManager._internal();
  factory ServiceManager() => _instance;
  ServiceManager._internal();

  final Dio dio = Dio();

  /* ================= DOCTORS (FROM API) ================= */

  final List<Doctor> _doctors = [];

  Future<void> fetchDoctors(BuildContext context) async {
    try {
      final response = await dio.get('$baseUrl/api/getalldoctors');
print(response.data);
      if (response.statusCode == 200 &&
          response.data['success'] == true) {
        _doctors.clear();

        final List data = response.data['data'];

        for (var item in data) {
          _doctors.add(
            Doctor(
              id: item['_id'],
              name: item['doctorName'] ?? '',
              qualification: item['doctorQualification'] ?? '',
              experience:
                  "${item['doctorExperience'] ?? 0} years",
              image: item['doctorImage'] != null
                  ? "$baseUrl/${item['doctorImage'].replaceAll("\\", "/")}"
                  : "",
              rating: 4.5, // default (backend not providing yet)
              location: item['doctorAddress'] ?? '',
              description: item['doctorAbout'] ?? '',
              phone: item['phone'] ?? '',
              docloginId: item['commonkey']["_id"] ?? '',
            ),
          );
        }

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
              content: Text("Doctor fetched successfully")),
        );
      }
    } catch (e) {
      debugPrint("Doctor API Error: $e");
    }
  }

  /* ================= VETS (UNCHANGED) ================= */

  final List<Doctor> _vets = [
    Doctor(
      id: "v1",
      name: "City Vet Hospital",
      qualification: "Multi-Specialty",
      experience: "15 years",
      image:
          "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def",
      rating: 4.7,
      location: "Kozhikode",
      isVet: true,
      description:
          "24/7 Emergency Veterinary Hospital with state-of-the-art facilities.", phone: "34567890",docloginId:"docloginid"
    ),
    Doctor(
      id: "v2",
      name: "Pet Care Clinic",
      qualification: "Clinic",
      experience: "10 years",
      image:
          "https://images.unsplash.com/photo-1599443015574-be5fe8a05783",
      rating: 4.6,
      location: "Malappuram",
      isVet: true,
      description:
          "Comprehensive care for your furry friends.", phone: "4567890",docloginId:"docloginid"
    ),
  ];

  /* ================= OTHERS (UNCHANGED) ================= */

  // final List<PetShop> _shops = [
  //   PetShop(
  //     id: "s1",
  //     name: "AKB Pet Shop",
  //     location: "Ramanattukara",
  //     image:
  //         "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd",
  //     rating: 4.3,
  //     description: "Everything your pet needs.",
  //     products: ["Pedigree", "Whiskas"],
  //   ),
  // ];

  final List<ServiceProvider> _groomers = [
    ServiceProvider(
      id: "g1",
      name: "AKB Grooming Center",
      category: "Groomer",
      location: "Ramanattukara",
      image:
          "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7",
      rating: 4.4,
      description: "Professional grooming services.",
    ),
  ];

  final List<ServiceProvider> _trainers = [
    ServiceProvider(
      id: "t1",
      name: "AKB Trainer",
      category: "Trainer",
      location: "Ramanattukara",
      image:
          "https://images.unsplash.com/photo-1534361960057-19889db9621e",
      rating: 4.6,
      description: "Certified dog trainer.",
    ),
  ];

  final List<ServiceProvider> _parks = [
    ServiceProvider(
      id: "p1",
      name: "AKB Pet Park",
      category: "Pet Park",
      location: "Ramanattukara",
      image:
          "https://images.unsplash.com/photo-1597633425046-08f5110420b5",
      rating: 4.5,
      description: "A fun place for pets.",
      extras: {"distance": "2.1 km", "isOpen": true},
    ),
  ];

  /* ================= GETTERS ================= */

  List<Doctor> get doctors => _doctors;
  List<Doctor> get vets => _vets;
  // List<PetShop> get shops => _shops;
  List<ServiceProvider> get groomers => _groomers;
  List<ServiceProvider> get trainers => _trainers;
  List<ServiceProvider> get parks => _parks;
}
