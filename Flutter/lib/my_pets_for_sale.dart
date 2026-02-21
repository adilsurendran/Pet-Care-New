import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';
import 'package:petcareapp/my_pet_requests_page.dart';
import 'add_pet_for_sale.dart';
import 'edit_pet_for_sale.dart';

class MyPetsForSale extends StatefulWidget {
  const MyPetsForSale({super.key});

  @override
  State<MyPetsForSale> createState() => _MyPetsForSaleState();
}

class _MyPetsForSaleState extends State<MyPetsForSale> {
  List pets = [];
  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchMyPets();
  }

  Future<void> fetchMyPets() async {
    try {
      final res =
          await dio.get('$baseUrl/api/sell/mypets/$usrid');
      setState(() {
        pets = res.data ?? [];
        loading = false;
      });
    } catch (e) {
      debugPrint("Fetch Pets Error: $e");
      setState(() => loading = false);
    }
  }

  Future<void> deletePet(String petId) async {
    try {
      await dio.delete('$baseUrl/api/sell/$petId');
      fetchMyPets();
    } catch (e) {
      debugPrint("Delete Error: $e");
    }
  }

  void confirmDelete(String petId) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Delete Pet"),
        content: const Text(
            "Are you sure you want to delete this pet?"),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
            ),
            onPressed: () {
              Navigator.pop(context);
              deletePet(petId);
            },
            child: const Text("Continue"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,

      appBar: AppBar(
        title: const Text(
          "My Pets for Sale",
          style: TextStyle(
            color: Color.fromARGB(250, 218, 98, 17),
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Colors.white,
        elevation: 1,
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.add,
                color: Color.fromARGB(250, 218, 98, 17)),
            onPressed: () async {
              await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const AddPetForSale(),
                ),
              );
              fetchMyPets();
            },
          ),
          IconButton(
            icon: const Icon(Icons.request_page,
                color: Color.fromARGB(250, 218, 98, 17)),
            onPressed: () async {
              Navigator.push(
  context,
  MaterialPageRoute(builder: (_) => const MyPetRequestsPage()),
);

            },
          )
        ],
      ),

      body: loading
          ? const Center(child: CircularProgressIndicator())
          : pets.isEmpty
              ? const Center(child: Text("No pets added"))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: pets.length,
                  itemBuilder: (context, index) {
                    final pet = pets[index];

                    return Container(
                      margin: const EdgeInsets.only(bottom: 14),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.05),
                            blurRadius: 8,
                          ),
                        ],
                      ),
                      child: ListTile(
                        leading: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: Image.network(
                            '$baseUrl/uploads/${pet["image"]}',
                            width: 60,
                            height: 60,
                            fit: BoxFit.cover,
                          ),
                        ),
                        title: Text(
                          pet["name"],
                          style: const TextStyle(
                              fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text(
                            "₹${pet["price"]} • ${pet["breed"]}"),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.edit,
                                  color: Colors.blue),
                              onPressed: () async {
                                await Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) =>
                                        EditPetForSale(pet: pet),
                                  ),
                                );
                                fetchMyPets();
                              },
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete,
                                  color: Colors.red),
                              onPressed: () =>
                                  confirmDelete(pet["_id"]),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
    );
  }
}
