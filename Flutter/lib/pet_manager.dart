// import 'dart:io';

// import 'package:petcareapp/login.dart';
// import 'package:petcareapp/register.dart';

// class Vaccination {
//   final String name;
//   final DateTime date;

//   Vaccination({required this.name, required this.date});
// }

// Future<void> getPetdetailsApi() async{
//   try {
//     final resposnse= await dio.get('$baseUrl/api/pets/user/$usrid');
//     print(resposnse);
//   } catch (e) {
//     print(e);
//   }
// }



// class Pet {
//   final String id;
//   final String name;
//   final String type;
//   final String breed;
//   final String gender;
//   final DateTime dob;
//   final DateTime? lastVaccination;
//   final double weight;
//   final String weightUnit;
//   final File? image;
//   List<Vaccination> vaccinations;
//   String notes;

//   Pet({
//     required this.id,
//     required this.name,
//     required this.type,
//     required this.breed,
//     required this.gender,
//     required this.dob,
//      this.lastVaccination,
//     required this.weight,
//     required this.weightUnit,
//     this.image,
//     List<Vaccination>? vaccinations,
//     this.notes = '',
//   }) : vaccinations = vaccinations ?? [];

//   int get age {
//     final now = DateTime.now();
//     int age = now.year - dob.year;
//     if (now.month < dob.month || (now.month == dob.month && now.day < dob.day)) {
//       age--;
//     }
//     return age;
//   }
// }

// class PetManager {
//   static final PetManager _instance = PetManager._internal();
//   factory PetManager() => _instance;
//   PetManager._internal();

//   final List<Pet> _pets = [
//     Pet(
//       id: "dummy_1",
//       name: "Bruno",
//       type: "Dog",
//       breed: "Golden Retriever",
//       gender: "Male",
//       dob: DateTime(2020, 5, 15),
//         lastVaccination: DateTime(2021, 6, 20),
//       weight: 25.0,
//       weightUnit: "kg",
//       vaccinations: [
//         Vaccination(name: "Rabies", date: DateTime(2021, 5, 15)),
//         Vaccination(name: "Distemper", date: DateTime(2021, 6, 20)),
//       ],
//       notes: "Loves to play fetch",
//     )
//   ];

//   List<Pet> get pets => List.unmodifiable(_pets);

//   void addPet(Pet pet) {
//     _pets.add(pet);
//   }

//   void updatePet(Pet updatedPet) {
//     final index = _pets.indexWhere((pet) => pet.id == updatedPet.id);
//     if (index != -1) {
//       _pets[index] = updatedPet;
//     }
//   }

//   void deletePet(String id) {
//     _pets.removeWhere((pet) => pet.id == id);
//   }
// }

import 'dart:io';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';

class Vaccination {
  final String name;
  final DateTime date;
  Vaccination({required this.name, required this.date});
}

class Pet {
  final String id;
  final String name;
  final String type;
  final String breed;
  final String gender;

  final DateTime dob; // backend not sending
  final DateTime? lastVaccination;

  final double weight;
  final String weightUnit;

  final File? image;        // local image
  final String? imageUrl;   // backend image

  String notes;

  Pet({
    required this.id,
    required this.name,
    required this.type,
    required this.breed,
    required this.gender,
    required this.dob,
    this.lastVaccination,
    required this.weight,
    required this.weightUnit,
    this.image,
    this.imageUrl,
    this.notes = '',
  });

  factory Pet.fromJson(Map<String, dynamic> json) {
    return Pet(
      id: json['_id'],
      name: json['name'],
      type: json['petType'],
      breed: json['breed'],
      gender: json['sex'],
      dob: DateTime.now(), // not available from backend
      lastVaccination: json['lastVaccination'] != null
          ? DateTime.parse(json['lastVaccination'])
          : null,
      weight: double.tryParse(json['weight'].toString()) ?? 0.0,
      weightUnit: 'kg',
      notes: json['notes'] ?? '',
      imageUrl: json['image'] != null
          ? "$baseUrl/${json['image'].replaceAll('\\', '/')}"
          : null,
    );
  }

  Null get age => null;
}

Future<void> getPetdetailsApi() async {
  try {
    final response = await dio.get('$baseUrl/api/pets/user/$usrid');

    final List list = response.data['pets'];

    final pets = list.map((e) => Pet.fromJson(e)).toList();

    PetManager().setPets(pets);

    print("Pets fetched: ${pets.length}");
  } catch (e) {
    print("Fetch pets error: $e");
  }
}


class PetManager {
  static final PetManager _instance = PetManager._internal();
  factory PetManager() => _instance;
  PetManager._internal();

  final List<Pet> _pets = [];

  List<Pet> get pets => List.unmodifiable(_pets);

  void setPets(List<Pet> pets) {
    _pets
      ..clear()
      ..addAll(pets);
  }

  // void addPet(Pet pet) {
  //   _pets.add(pet);
  // }

  // void updatePet(Pet pet) {
  //   final index = _pets.indexWhere((p) => p.id == pet.id);
  //   if (index != -1) _pets[index] = pet;
  // }

  // void deletePet(String id) {
  //   _pets.removeWhere((p) => p.id == id);
  // }
}
