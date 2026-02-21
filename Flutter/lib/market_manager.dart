import 'package:petcareapp/market_models.dart';

class MarketManager {
  static final MarketManager _instance = MarketManager._internal();
  factory MarketManager() => _instance;
  MarketManager._internal();

  final List<MarketPet> pets = [
    MarketPet(
      id: 'p1',
      name: 'Bella',
      breed: 'Golden Retriever',
      type: 'Dog',
      gender: 'Female',
      age: '3 months',
      color: 'Golden',
      price: 12000,
      shopName: 'AKB Pet Shop',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
      description: 'Playful and friendly golden retriever puppy.',
    ),
    MarketPet(
      id: 'p2',
      name: 'Simba',
      breed: 'Persian Cat',
      type: 'Cat',
      gender: 'Male',
      age: '2 months',
      color: 'White',
      price: 8000,
      shopName: 'Whiskers World',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
      description: 'Fluffy persian kitten, very affectionate.',
    ),
    MarketPet(
      id: 'p3',
      name: 'Charlie',
      breed: 'Beagle',
      type: 'Dog',
      gender: 'Male',
      age: '4 months',
      color: 'Tricolor',
      price: 15000,
      shopName: 'AKB Pet Shop',
      image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2',
    ),
     MarketPet(
      id: 'p4',
      name: 'Coco',
      breed: 'Labrador',
      type: 'Dog',
      gender: 'Female',
      age: '2 months',
      color: 'Brown',
      price: 11000,
      shopName: 'Paws & Claws',
      image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eca6',
    ),
     MarketPet(
      id: 'p5',
      name: 'Misty',
      breed: 'Siamese',
      type: 'Cat',
      gender: 'Female',
      age: '3 months',
      color: 'Cream',
      price: 9000,
      shopName: 'Whiskers World',
      image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26',
    ),
  ];

  final List<Product> products = [
    Product(
      id: 'pr1',
      name: 'Pedigree Adult Dog Food',
      category: 'Food',
      price: 800,
      rating: 4.8,
      shopName: 'AKB Pet Shop',
      image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161',
      description: 'Complete nutrition for adult dogs.',
    ),
    Product(
      id: 'pr2',
      name: 'Rubber Chew Bone',
      category: 'Toys',
      price: 250,
      rating: 4.5,
      shopName: 'Paws & Claws',
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97',
      description: 'Durable rubber bone for chewing.',
    ),
    Product(
      id: 'pr3',
      name: 'Cat Litter 5kg',
      category: 'Accessories',
      price: 450,
      rating: 4.6,
      shopName: 'Whiskers World',
      image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8', // Placeholder
    ),
    Product(
      id: 'pr4',
      name: 'Royal Canin Kitten',
      category: 'Food',
      price: 1200,
      rating: 4.9,
      shopName: 'Whiskers World',
      image: 'https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9',
    ),
     Product(
      id: 'pr5',
      name: 'Dog Leash Red',
      category: 'Accessories',
      price: 350,
      rating: 4.3,
      shopName: 'AKB Pet Shop',
      image: 'https://images.unsplash.com/photo-1551529834-525807d6b4f3',
    ),
  ];
}
