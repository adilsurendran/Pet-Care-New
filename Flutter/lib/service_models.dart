
// // // class Doctor {
// // //   final String id;
// // //   final String name;
// // //   final String qualification;
// // //   final String experience;
// // //   final String image;
// // //   final double rating;
// // //   final String location;
// // //   final bool isVet;
// // //   final String description;

// // //   Doctor({
// // //     required this.id,
// // //     required this.name,
// // //     required this.qualification,
// // //     required this.experience,
// // //     required this.image,
// // //     required this.rating,
// // //     required this.location,
// // //     this.isVet = false,
// // //     this.description = "",
// // //   });
// // // }

// // // class PetShop {
// // //   final String id;
// // //   final String name;
// // //   final String location;
// // //   final String image;
// // //   final double rating;
// // //   final String description;
// // //   final List<String> products;

// // //   PetShop({
// // //     required this.id,
// // //     required this.name,
// // //     required this.location,
// // //     required this.image,
// // //     required this.rating,
// // //     this.description = "",
// // //     this.products = const [],
// // //   });
// // // }

// // // class ServiceProvider {
// // //   final String id;
// // //   final String name;
// // //   final String category; // Groomer, Trainer, Park
// // //   final String location;
// // //   final String image;
// // //   final double rating;
// // //   final String description;
// // //   final Map<String, dynamic> extras; // e.g. distance, isOpen for parks

// // //   ServiceProvider({
// // //     required this.id,
// // //     required this.name,
// // //     required this.category,
// // //     required this.location,
// // //     required this.image,
// // //     required this.rating,
// // //     this.description = "",
// // //     this.extras = const {},
// // //   });
// // // }


// // class Doctor {
// //   final String id;
// //   final String name;
// //   final String qualification;
// //   final String experience;
// //   final String image;
// //   final double rating;
// //   final String location;
// //   final bool isVet;
// //   final String description;
// //   final String docloginId;
// //   final String phone;

// //   Doctor({
// //     required this.id,
// //     required this.name,
// //     required this.qualification,
// //     required this.experience,
// //     required this.image,
// //     required this.rating,
// //     required this.location,
// //     required this.phone,
// //     required this.docloginId,
// //     this.isVet = false,
// //     this.description = "",
// //   });
// // }

// // class PetShop {
// //   final String id;
// //   final String name;
// //   final String location;
// //   final String image;
// //   final double rating;
// //   final String description;
// //   final List<String> products;

// //   PetShop({
// //     required this.id,
// //     required this.name,
// //     required this.location,
// //     required this.image,
// //     required this.rating,
// //     this.description = "",
// //     this.products = const [],
// //   });
// // }

// // class ServiceProvider {
// //   final String id;
// //   final String name;
// //   final String category;
// //   final String location;
// //   final String image;
// //   final double rating;
// //   final String description;
// //   final Map<String, dynamic> extras;

// //   ServiceProvider({
// //     required this.id,
// //     required this.name,
// //     required this.category,
// //     required this.location,
// //     required this.image,
// //     required this.rating,
// //     this.description = "",
// //     this.extras = const {},
// //   });
// // }

// // class Product {
// //   final String id;
// //   final String name;
// //   final String description;
// //   final double price;
// //   final int quantity;
// //   final List<String> images;
// //   final String category;

// //   Product({
// //     required this.id,
// //     required this.name,
// //     required this.description,
// //     required this.price,
// //     required this.quantity,
// //     required this.images,
// //     required this.category,
// //   });

// //   factory Product.fromJson(Map<String, dynamic> json) {
// //     return Product(
// //       id: json["_id"],
// //       name: json["ProductName"],
// //       description: json["description"],
// //       price: (json["price"] as num).toDouble(),
// //       quantity: json["quantity"],
// //       images: List<String>.from(json["screenshots"]),
// //       category: json["category"],
// //     );
// //   }
// // }

// // class PetShop {
// //   final String id;
// //   final String name;
// //   final String address;
// //   final String phone;
// //   final String email;
// //   final bool verify;
// //   final List<Product> products;

// //   PetShop({
// //     required this.id,
// //     required this.name,
// //     required this.address,
// //     required this.phone,
// //     required this.email,
// //     required this.verify,
// //     required this.products,
// //   });

// //   factory PetShop.fromJson(Map<String, dynamic> json) {
// //     return PetShop(
// //       id: json["_id"],
// //       name: json["shopName"],
// //       address: json["shopAddress"],
// //       phone: json["shopPhone"],
// //       email: json["shopEmail"],
// //       verify: json["verify"],
// //       products: (json["products"] as List)
// //           .map((p) => Product.fromJson(p))
// //           .toList(),
// //     );
// //   }
// // }

// class Doctor {
//   final String id;
//   final String name;
//   final String qualification;
//   final String experience;
//   final String image;
//   final double rating;
//   final String location;
//   final bool isVet;
//   final String description;
//   final String docloginId;
//   final String phone;

//   Doctor({
//     required this.id,
//     required this.name,
//     required this.qualification,
//     required this.experience,
//     required this.image,
//     required this.rating,
//     required this.location,
//     required this.phone,
//     required this.docloginId,
//     this.isVet = false,
//     this.description = "",
//   });
// }

// class ServiceProvider {
//   final String id;
//   final String name;
//   final String category;
//   final String location;
//   final String image;
//   final double rating;
//   final String description;
//   final Map<String, dynamic> extras;

//   ServiceProvider({
//     required this.id,
//     required this.name,
//     required this.category,
//     required this.location,
//     required this.image,
//     required this.rating,
//     this.description = "",
//     this.extras = const {},
//   });
// }

// class Product {
//   final String id;
//   final String name;
//   final String description;
//   final double price;
//   final int quantity;
//   final List<String> images;
//   final String category;

//   Product({
//     required this.id,
//     required this.name,
//     required this.description,
//     required this.price,
//     required this.quantity,
//     required this.images,
//     required this.category,
//   });

//   factory Product.fromJson(Map<String, dynamic> json) {
//     return Product(
//       id: json["_id"],
//       name: json["ProductName"],
//       description: json["description"],
//       price: (json["price"] as num).toDouble(),
//       quantity: json["quantity"],
//       images: List<String>.from(json["screenshots"]),
//       category: json["category"],
//     );
//   }
// }

// class PetShop {
//   final String id;
//   final String name;
//   final String address;
//   final String phone;
//   final String email;
//   final bool verify;
//   final List<Product> products;

//   PetShop({
//     required this.id,
//     required this.name,
//     required this.address,
//     required this.phone,
//     required this.email,
//     required this.verify,
//     required this.products,
//   });

//   factory PetShop.fromJson(Map<String, dynamic> json) {
//     return PetShop(
//       id: json["_id"],
//       name: json["shopName"],
//       address: json["shopAddress"],
//       phone: json["shopPhone"],
//       email: json["shopEmail"],
//       verify: json["verify"],
//       products: (json["products"] as List)
//           .map((p) => Product.fromJson(p))
//           .toList(),
//     );
//   }
// }

class Doctor {
  final String id;
  final String name;
  final String qualification;
  final String experience;
  final String image;
  final double rating;
  final String location;
  final bool isVet;
  final String description;
  final String docloginId;
  final String phone;

  Doctor({
    required this.id,
    required this.name,
    required this.qualification,
    required this.experience,
    required this.image,
    required this.rating,
    required this.location,
    required this.phone,
    required this.docloginId,
    this.isVet = false,
    this.description = "",
  });
}

class ServiceProvider {
  final String id;
  final String name;
  final String category;
  final String location;
  final String image;
  final double rating;
  final String description;
  final Map<String, dynamic> extras;

  ServiceProvider({
    required this.id,
    required this.name,
    required this.category,
    required this.location,
    required this.image,
    required this.rating,
    this.description = "",
    this.extras = const {},
  });
}

class Product {
  final String id;
  final String name;
  final String description;
  final double price;
  final int quantity;
  final List<String> images;
  final String category;

  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.quantity,
    required this.images,
    required this.category,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json["_id"],
      name: json["ProductName"],
      description: json["description"],
      price: (json["price"] as num).toDouble(),
      quantity: json["quantity"],
      images: List<String>.from(json["screenshots"]),
      category: json["category"],
    );
  }
}

class PetShop {
  final String id;
  final String name;
  final String address;
  final String phone;
  final String email;
  final String shopLogo;
  final bool verify;
  final List<Product> products;

  PetShop({
    required this.id,
    required this.name,
    required this.address,
    required this.phone,
    required this.email,
    required this.shopLogo,
    required this.verify,
    required this.products,
  });

  factory PetShop.fromJson(Map<String, dynamic> json) {
    return PetShop(
      id: json["_id"],
      name: json["shopName"],
      address: json["shopAddress"],
      phone: json["shopPhone"],
      email: json["shopEmail"],
      shopLogo: json["shopLogo"],
      verify: json["verify"],
      products: (json["products"] as List)
          .map((p) => Product.fromJson(p))
          .toList(),
    );
  }
}
