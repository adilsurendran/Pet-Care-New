
class MarketPet {
  final String id;
  final String name;
  final String breed; // displayed as subtitle
  final String type; // Dog, Cat, Bird
  final String gender; // Male, Female
  final String age; // e.g., "2 months"
  final String color;
  final double price;
  final String shopName;
  final String image;
  final String description;

  MarketPet({
    required this.id,
    required this.name,
    required this.breed,
    required this.type,
    required this.gender,
    required this.age,
    required this.color,
    required this.price,
    required this.shopName,
    required this.image,
    this.description = "",
  });
}

class Product {
  final String id;
  final String name;
  final String category; // Food, Toys, Accessories
  final double price;
  final double rating;
  final String shopName;
  final String image;
  final String description;

  Product({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.rating,
    required this.shopName,
    required this.image,
    this.description = "",
  });
}
