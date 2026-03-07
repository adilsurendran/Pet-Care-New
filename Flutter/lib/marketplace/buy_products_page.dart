import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:petcareapp/api_config.dart';
import 'package:petcareapp/login.dart';
import 'package:url_launcher/url_launcher.dart';
import 'my_orders_page.dart';

class BuyProductsPage extends StatefulWidget {
  const BuyProductsPage({super.key});

  @override
  State<BuyProductsPage> createState() => _BuyProductsPageState();
}

class _BuyProductsPageState extends State<BuyProductsPage> {
  final TextEditingController _searchController = TextEditingController();

  List<dynamic> _products = [];
  List<dynamic> _filteredProducts = [];
  bool _loading = true;

  // Holds quantity per productId
  final Map<String, int> _quantities = {};
  int _getQty(dynamic product) {
    return _quantities[product["_id"]] ?? 1;
  }

  void _increaseQty(dynamic product) {
    setState(() {
      final id = product["_id"];
      _quantities[id] = _getQty(product) + 1;
    });
  }

  void _decreaseQty(dynamic product) {
    setState(() {
      final id = product["_id"];
      final current = _getQty(product);
      if (current > 1) {
        _quantities[id] = current - 1;
      }
    });
  }

  bool _isAvailable(dynamic product) {
    final available = product["available"] == true;
    final stock = (product["quantity"] ?? 0) > 0;
    return available && stock;
  }

  String _selectedCategory = "All";
  RangeValues _priceRange = const RangeValues(0, 10000);

  final List<String> _categories = [
    "All",
    "food",
    "toys",
    "accessories",
    "medicine",
  ];

  @override
  void initState() {
    super.initState();
    fetchProducts();
    _searchController.addListener(_applyFilters);
  }

  Future<void> fetchProducts() async {
    try {
      final res = await dio.get("$baseUrl/api/allpro");
      final data = res.data;
      print(data);
      setState(() {
        _products = data["products"] ?? [];
        _filteredProducts = _products;
        _loading = false;
      });
    } catch (e) {
      print(e);
      setState(() => _loading = false);
    }
  }

  void _applyFilters() {
    final query = _searchController.text.toLowerCase();

    setState(() {
      _filteredProducts = _products.where((p) {
        final name = p["ProductName"].toString().toLowerCase();
        final category = p["category"];
        final price = double.parse(p["price"].toString());

        final matchesSearch = name.contains(query);
        final matchesCategory =
            _selectedCategory == "All" || category == _selectedCategory;
        final matchesPrice =
            price >= _priceRange.start && price <= _priceRange.end;

        return matchesSearch && matchesCategory && matchesPrice;
      }).toList();
    });
  }

  // Future<void> buyNow(dynamic product) async {
  //   try {
  //     final response = await dio.post(
  //       "$baseUrl/api/bookpro/$usrid",
  //       data: {
  //         "productId": product["_id"],
  //         "sellerLoginId": product["userId"],
  //         "quantity": 1,
  //       },
  //     );

  //     ScaffoldMessenger.of(context).showSnackBar(
  //       const SnackBar(content: Text("Product booked")),
  //     );
  //   } on DioException catch (e) {
  //     String errorMessage = "Something went wrong";

  //     if (e.response != null) {
  //       errorMessage = e.response?.data["message"] ??
  //           e.response?.statusMessage ??
  //           "Server error";
  //     } else {
  //       errorMessage = e.message ?? "Network error";
  //     }

  //     ScaffoldMessenger.of(context).showSnackBar(
  //       SnackBar(content: Text(errorMessage)),
  //     );
  //   } catch (e) {
  //     ScaffoldMessenger.of(context).showSnackBar(
  //       SnackBar(content: Text("Unexpected error: $e")),
  //     );
  //   }
  // }

  Future<void> buyNow(dynamic product, int quantity) async {
    try {
      await dio.post(
        "$baseUrl/api/bookpro/$usrid",
        data: {
          "productId": product["_id"],
          "sellerLoginId": product["userId"],
          "quantity": quantity,
        },
      );

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Product booked (Qty: $quantity)")),
      );
    } on DioException catch (e) {
      String errorMessage =
          e.response?.data["message"] ??
          e.response?.statusMessage ??
          e.message ??
          "Something went wrong";

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(errorMessage)));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text(
          "Buy Products",
          style: TextStyle(color: Colors.teal, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        leading: BackButton(color: Colors.orange),
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_bag_outlined, color: Colors.black),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const MyOrdersPage()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.filter_list_rounded, color: Colors.black),
            onPressed: _showFilterSheet,
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: "Search products...",
                prefixIcon: const Icon(Icons.search),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(16),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),
          Expanded(
            child: _loading
                ? const Center(child: CircularProgressIndicator())
                : GridView.builder(
                    padding: const EdgeInsets.all(16),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.7,
                          crossAxisSpacing: 16,
                          mainAxisSpacing: 16,
                        ),
                    itemCount: _filteredProducts.length,
                    itemBuilder: (_, i) =>
                        _buildProductCard(_filteredProducts[i]),
                  ),
          ),
        ],
      ),
    );
  }

  // Widget _buildProductCard(dynamic p) {
  //   return GestureDetector(
  //     onTap: () {
  //       Navigator.push(
  //         context,
  //         MaterialPageRoute(
  //           builder: (_) => ProductDetailPage(product: p),
  //         ),
  //       );
  //     },
  //     child: Container(
  //       decoration: BoxDecoration(
  //         color: Colors.white,
  //         borderRadius: BorderRadius.circular(20),
  //         boxShadow: [
  //           BoxShadow(
  //             color: Colors.black.withOpacity(0.05),
  //             blurRadius: 10,
  //             offset: const Offset(0, 4),
  //           ),
  //         ],
  //       ),
  //       child: Column(
  //         crossAxisAlignment: CrossAxisAlignment.start,
  //         children: [
  //           Expanded(
  //             child: ClipRRect(
  //               borderRadius:
  //                   const BorderRadius.vertical(top: Radius.circular(20)),
  //               child: Image.network(
  //                 "$baseUrl/uploads/${p["screenshots"][0]}",
  //                 fit: BoxFit.cover,
  //                 width: double.infinity,
  //               ),
  //             ),
  //           ),
  //           Padding(
  //             padding: const EdgeInsets.all(12),
  //             child: Column(
  //               crossAxisAlignment: CrossAxisAlignment.start,
  //               children: [
  //                 Text(
  //                   p["ProductName"],
  //                   maxLines: 2,
  //                   overflow: TextOverflow.ellipsis,
  //                   style: const TextStyle(
  //                       fontWeight: FontWeight.bold, fontSize: 14),
  //                 ),
  //                 const SizedBox(height: 6),
  //                 Text(
  //                   "₹${p["price"]}",
  //                   style: const TextStyle(
  //                       fontWeight: FontWeight.bold, color: Colors.teal),
  //                 ),
  //                 const SizedBox(height: 10),
  //                 SizedBox(
  //                   width: double.infinity,
  //                   child: ElevatedButton(
  //                     onPressed: () => buyNow(p),
  //                     style: ElevatedButton.styleFrom(
  //                       backgroundColor: Colors.teal,
  //                       foregroundColor: Colors.white,
  //                       shape: RoundedRectangleBorder(
  //                         borderRadius: BorderRadius.circular(12),
  //                       ),
  //                     ),
  //                     child: const Text("Buy Now"),
  //                   ),
  //                 ),
  //               ],
  //             ),
  //           ),
  //         ],
  //       ),
  //     ),
  //   );
  // }
  Widget _buildProductCard(dynamic p) {
    final qty = _getQty(p);
    final isAvailable = _isAvailable(p);

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => ProductDetailPage(product: p)),
        );
      },
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: ClipRRect(
                borderRadius: const BorderRadius.vertical(
                  top: Radius.circular(20),
                ),
                child: Image.network(
                  "$baseUrl/uploads/${p["screenshots"][0]}",
                  fit: BoxFit.cover,
                  width: double.infinity,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    p["ProductName"],
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    "₹${p["price"]}",
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.teal,
                    ),
                  ),

                  const SizedBox(height: 10),

                  // 🔹 Quantity Selector
                  // Row(
                  //   mainAxisAlignment: MainAxisAlignment.center,
                  //   children: [
                  //     IconButton(
                  //       onPressed: () => _decreaseQty(p),
                  //       icon: const Icon(Icons.remove_circle_outline),
                  //       color: Colors.orange,
                  //     ),
                  //     Container(
                  //       padding: const EdgeInsets.symmetric(
                  //           horizontal: 14, vertical: 6),
                  //       decoration: BoxDecoration(
                  //         border: Border.all(color: Colors.grey.shade300),
                  //         borderRadius: BorderRadius.circular(8),
                  //       ),
                  //       child: Text(
                  //         qty.toString(),
                  //         style: const TextStyle(
                  //             fontSize: 16, fontWeight: FontWeight.bold),
                  //       ),
                  //     ),
                  //     IconButton(
                  //       onPressed: () => _increaseQty(p),
                  //       icon: const Icon(Icons.add_circle_outline),
                  //       color: Colors.teal,
                  //     ),
                  //   ],
                  // ),
                  // Row(
                  //   mainAxisAlignment: MainAxisAlignment.center,
                  //   children: [
                  //     IconButton(
                  //       onPressed: isAvailable ? () => _decreaseQty(p) : null,
                  //       icon: const Icon(Icons.remove_circle_outline),
                  //       color: Colors.orange,
                  //     ),
                  //     Container(
                  //       padding: const EdgeInsets.symmetric(
                  //         horizontal: 14,
                  //         vertical: 6,
                  //       ),
                  //       decoration: BoxDecoration(
                  //         border: Border.all(color: Colors.grey.shade300),
                  //         borderRadius: BorderRadius.circular(8),
                  //       ),
                  //       child: Text(
                  //         qty.toString(),
                  //         style: const TextStyle(
                  //           fontSize: 16,
                  //           fontWeight: FontWeight.bold,
                  //         ),
                  //       ),
                  //     ),
                  //     IconButton(
                  //       onPressed: isAvailable ? () => _increaseQty(p) : null,
                  //       icon: const Icon(Icons.add_circle_outline),
                  //       color: Colors.teal,
                  //     ),
                  //   ],
                  // ),

                  const SizedBox(height: 10),

                  // SizedBox(
                  //   width: double.infinity,
                  //   child: ElevatedButton(
                  //     onPressed: () => buyNow(p, qty),
                  //     style: ElevatedButton.styleFrom(
                  //       backgroundColor: Colors.teal,
                  //       foregroundColor: Colors.white,
                  //       shape: RoundedRectangleBorder(
                  //         borderRadius: BorderRadius.circular(12),
                  //       ),
                  //     ),
                  //     child: const Text("Buy Now"),
                  //   ),
                  // ),
                  // SizedBox(
                  //   width: double.infinity,
                  //   child: ElevatedButton(
                  //     onPressed: isAvailable ? () => buyNow(p, qty) : null,
                  //     style: ElevatedButton.styleFrom(
                  //       backgroundColor: isAvailable
                  //           ? Colors.teal
                  //           : Colors.grey.shade400,
                  //       foregroundColor: Colors.white,
                  //       shape: RoundedRectangleBorder(
                  //         borderRadius: BorderRadius.circular(12),
                  //       ),
                  //     ),
                  //     child: Text(
                  //       isAvailable ? "Buy Now" : "Currently Unavailable",
                  //       style: const TextStyle(fontWeight: FontWeight.bold),
                  //     ),
                  //   ),
                  // ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showFilterSheet() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) {
        return StatefulBuilder(
          builder: (_, setSheet) {
            return Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    "Filter Products",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  DropdownButton<String>(
                    value: _selectedCategory,
                    isExpanded: true,
                    items: _categories
                        .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                        .toList(),
                    onChanged: (v) => setSheet(() {
                      _selectedCategory = v!;
                    }),
                  ),
                  RangeSlider(
                    values: _priceRange,
                    min: 0,
                    max: 10000,
                    divisions: 20,
                    labels: RangeLabels(
                      "₹${_priceRange.start.toInt()}",
                      "₹${_priceRange.end.toInt()}",
                    ),
                    onChanged: (v) => setSheet(() => _priceRange = v),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      _applyFilters();
                      Navigator.pop(context);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.teal,
                    ),
                    child: const Text("Apply Filters"),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }
}

// class ProductDetailPage extends StatelessWidget {
//   final dynamic product;

//   const ProductDetailPage({super.key, required this.product});

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         backgroundColor: Colors.white,
//         elevation: 0,
//         leading: BackButton(color: Colors.orange),
//         title: const Text("Product Details",
//             style: TextStyle(color: Colors.black)),
//         centerTitle: true,
//       ),
//       body: SingleChildScrollView(
//         child: Column(
//           children: [
//             Image.network(
//               "$baseUrl/uploads/${product["screenshots"][0]}",
//               height: 300,
//               width: double.infinity,
//               fit: BoxFit.cover,
//             ),
//             Padding(
//               padding: const EdgeInsets.all(16),
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   Text(
//                     product["ProductName"],
//                     style: const TextStyle(
//                         fontSize: 22, fontWeight: FontWeight.bold),
//                   ),
//                   const SizedBox(height: 8),
//                   Text(
//                     "₹${product["price"]}",
//                     style: const TextStyle(
//                         fontSize: 20,
//                         fontWeight: FontWeight.bold,
//                         color: Colors.teal),
//                   ),
//                   const SizedBox(height: 16),
//                   Row(
//                     children: [
//                       const Icon(Icons.category, color: Colors.teal),
//                       const SizedBox(width: 8),
//                       Text(product["category"]),
//                     ],
//                   ),
//                   const SizedBox(height: 24),
//                   const Text("Description",
//                       style:
//                           TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
//                   const SizedBox(height: 8),
//                   Text(
//                     product["description"] ?? "No description available",
//                     style: const TextStyle(color: Colors.grey, height: 1.5),
//                   ),
//                   const SizedBox(height: 40),
//                   SizedBox(
//                     width: double.infinity,
//                     child: ElevatedButton(
//                       onPressed: () {},
//                       style: ElevatedButton.styleFrom(
//                         backgroundColor: Colors.teal,
//                         padding: const EdgeInsets.symmetric(vertical: 16),
//                         shape: RoundedRectangleBorder(
//                             borderRadius: BorderRadius.circular(12)),
//                       ),
//                       child: const Text(
//                         "Buy Now",
//                         style: TextStyle(
//                             fontSize: 18,
//                             color: Colors.white,
//                             fontWeight: FontWeight.bold),
//                       ),
//                     ),
//                   )
//                 ],
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }

class ProductDetailPage extends StatefulWidget {
  final dynamic product;

  const ProductDetailPage({super.key, required this.product});

  @override
  State<ProductDetailPage> createState() => _ProductDetailPageState();
}

class _ProductDetailPageState extends State<ProductDetailPage> {
  int _quantity = 1;

  bool _isAvailable() {
    final available = widget.product["available"] == true;
    final stock = (widget.product["quantity"] ?? 0) > 0;
    return available && stock;
  }

  void _increaseQty() {
    setState(() {
      _quantity++;
    });
  }

  void _decreaseQty() {
    if (_quantity > 1) {
      setState(() {
        _quantity--;
      });
    }
  }

  Future<void> _callShop(BuildContext context) async {
    final phone = widget.product["shopPhone"];
    if (phone == null || phone.toString().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Phone number not available")),
      );
      return;
    }

    final uri = Uri.parse("tel:$phone");
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Could not open dialer")));
    }
  }

  Future<void> buyNow(dynamic product, int quantity) async {
    try {
      await dio.post(
        "$baseUrl/api/bookpro/$usrid",
        data: {
          "productId": product["_id"],
          "sellerLoginId": product["userId"],
          "quantity": quantity,
        },
      );

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Product booked (Qty: $quantity)")),
      );
    } on DioException catch (e) {
      String errorMessage =
          e.response?.data["message"] ??
          e.response?.statusMessage ??
          e.message ??
          "Something went wrong";

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(errorMessage)));
    }
  }

  @override
  Widget build(BuildContext context) {
    final isAvailable = _isAvailable();

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: BackButton(color: Colors.orange),
        title: const Text(
          "Product Details",
          style: TextStyle(color: Colors.black),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Image.network(
              "$baseUrl/uploads/${widget.product["screenshots"][0]}",
              height: 300,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Product Name
                  Text(
                    widget.product["ProductName"],
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 8),

                  // Price
                  Text(
                    "₹${widget.product["price"]}",
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.teal,
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Category
                  Row(
                    children: [
                      const Icon(Icons.category, color: Colors.teal),
                      const SizedBox(width: 8),
                      Text(widget.product["category"]),
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Shop Name + Call Button
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.store, color: Colors.teal),
                          const SizedBox(width: 8),
                          Text(
                            widget.product["shopName"] ?? "Unknown Shop",
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                      IconButton(
                        onPressed: () => _callShop(context),
                        icon: const Icon(Icons.call),
                        color: Colors.green,
                        tooltip: "Call Shop",
                      ),
                    ],
                  ),

                  const SizedBox(height: 24),

                  // Description
                  const Text(
                    "Description",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.product["description"] ?? "No description available",
                    style: const TextStyle(color: Colors.grey, height: 1.5),
                  ),

                  const SizedBox(height: 40),

                  // Quantity Selector
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        onPressed: isAvailable ? _decreaseQty : null,
                        icon: const Icon(Icons.remove_circle_outline),
                        color: Colors.orange,
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 8,
                        ),
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey.shade300),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          _quantity.toString(),
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: isAvailable ? _increaseQty : null,
                        icon: const Icon(Icons.add_circle_outline),
                        color: Colors.teal,
                      ),
                    ],
                  ),

                  const SizedBox(height: 20),

                  // Buy Now / Unavailable Button
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: isAvailable
                          ? () => buyNow(widget.product, _quantity)
                          : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: isAvailable
                            ? Colors.teal
                            : Colors.grey.shade400,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: Text(
                        isAvailable ? "Buy Now" : "Currently Unavailable",
                        style: const TextStyle(
                          fontSize: 18,
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
