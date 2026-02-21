import 'package:flutter/material.dart';
import 'package:petcareapp/pet_manager.dart';
import 'package:petcareapp/petdetails.dart';

class viewpets extends StatefulWidget {
  const viewpets({super.key});

  @override
  State<viewpets> createState() => _viewpetsState();
}

class _viewpetsState extends State<viewpets> {
  @override
  Widget build(BuildContext context) {
    final pets = PetManager().pets;
    return Scaffold(
      appBar: AppBar(
        title: const Text('View Pets'),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(0, 0, 0, 0),
      ),
      body: pets.isEmpty
          ? const Center(child: Text("No pets added yet"))
          : GridView.builder(
              itemCount: pets.length,
              padding: const EdgeInsets.all(10),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
                crossAxisCount: 2,
              ),
              itemBuilder: (context, index) {
                final pet = pets[index];
                return GestureDetector(
                  onTap: () async {
                    await Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => Petdetails(pet: pet),
                      ),
                    );
                    setState(() {}); // Refresh on return (in case of delete)
                  },
                  child: Card(
                    color: const Color.fromARGB(255, 213, 221, 224),
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: pet.image != null
                                ? Image.file(
                                    pet.image!,
                                    width: double.infinity,
                                    fit: BoxFit.cover,
                                  )
                                : const Icon(Icons.pets, size: 50),
                          ),
                          const SizedBox(height: 5),
                          Text(
                            pet.name,
                            style: const TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          Text(
                            "${pet.age} years",
                            style: const TextStyle(color: Colors.grey),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
    );
  }
}