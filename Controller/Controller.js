import bcrypt from 'bcrypt'
import userData from '../Model/User.js'
import loginData from '../Model/Login.js'
import doctData from '../Model/Doctor.Model.js';
import shopdata from '../Model/Shop.Model.js';
// import productData from '../Model/shop.Product.js';
import moneydata from '../Model/MoneyModel.js';
import Complaint from '../Model/ComplaintModel.js';
import DocBooking from '../Model/DoctorBookingModel.js';

/* function for user registration and username, password and role need to store in the backend */
export const userRegistration = async (req, res) => {
    const { userFullname, userEmail, city, state, pincode, userName, userPassword } = req.body;
    console.log(req.body);

    if (
        !userFullname ||
        !userEmail ||
        !city ||
        !state ||
        !pincode ||
        !userName ||
        !userPassword
    ) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    

    try {
        const existingUser = await userData.findOne({ userEmail });
        const existingUserName = await loginData.findOne({ username: userName });  
        
        if (existingUserName) {
            console.log("Username is already taken");
            return res.status(400).json({ message: "Username already taken", success: false });  
        }
        
        if (existingUser) {
            console.log("Email is already taken");
            return res.status(400).json({ message: "Email already taken", success: false });
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const login = await loginData.create({
            username: userName,  
            password: hashedPassword,
            role: "user",  // Save the role as buyer or seller
            verify: true
});

        await userData.create({
            commonKey: login._id,
            userFullname,
            userEmail,
            city,
            state,
            pincode,
        });

        res.status(201).json({ message: "User created successfully", success: true });
    } catch (error) {
        console.log("Error at registering:", error.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


/* function for registration and username, password and role need to store in the Login table */
export const doctorRegistration = async(req, res) => {
    const { doctorName, doctorEmail, doctorNumber, doctorAddress, doctorQualification, userName, userPassword } = req.body

    if (
        !doctorName ||
        !doctorEmail ||
        !doctorNumber ||
        !doctorAddress ||
        !doctorQualification ||
        !userName ||
        !userPassword
    ){
        return res.status(400).json({ message: "please fill all fields", success:false });
    }

    try {
        const existingDoctor = await doctData.findOne({ doctorEmail })
        const existingUserName = await loginData.findOne({ username: userName }) 

        if(existingDoctor){
            return res.status(400).json({ message: "Doctor with same email exist" })
        }
        if (existingUserName){
            return res.status(400).json({ message: "Username already taken by other user", success:false })
        }
        
        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const login = await loginData.create({
            username: userName,
            password: hashedPassword,
            role: "doctor",
            verify: true
        })

        await doctData.create({
            commonkey: login._id,
            doctorName,
            doctorEmail,
            doctorNumber,
            doctorAddress,
            doctorQualification,
        })
        res.status(201).json({ message: "User created successfully", success:true });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message:"server error", success:false })
    }
}

/* function to get all users */
export const getAllUsers = async (req, res) => {
    try {
        const users = await userData.find().populate("commonKey", "verify");
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message:"server error", success:false })
    }
}






export const getAlldoct = async (req, res) => {
  try {
    // Fetch all doctors and populate the commonkey field
    const doctors = await doctData
      .find()
      .populate("commonkey", "username email")  // Populate only necessary fields like username and email
      .exec();

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ success: false, message: "No doctors found" });
    }

    // Respond with the populated doctor data
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



/* function for shop registration and username password moving to Login schema */
export const shopRegistration = async (req, res) => {
    try {
        const { shopName, shopAddress, shopPhone, shopEmail, userName, userPassword } = req.body
        if (
            !shopName ||
            !shopAddress ||
            !shopPhone ||
            !shopEmail ||
            !userName ||
            !userPassword
        ) {
            return res.status(400).json({ message: "all fields are required", success:false })
        }
        const existingShop = await shopdata.findOne({ shopEmail })
        if (existingShop) {
            return res.status(400).json({ message: "Shop with same email exist", success:false })
        }

        const existingShopuser = await loginData.findOne({ username: userName })
        if (existingShopuser) {
            return res.status(400).json({ message: "User with same username exist", success:false})
            }
        
        const hashedPassword = await bcrypt.hash(userPassword, 10)

        const shopLogin = await loginData.create({
            username: userName,
            password: hashedPassword,
            role: 'shop'
        })

        await shopdata.create({
            commonkey: shopLogin._id,
            shopName: shopName,
            shopAddress: shopAddress,
            shopPhone: shopPhone,
            shopEmail: shopEmail
        })
        res.status(200).json({ message: "Shop registered Successfully", success:true })
    } catch (error) {
        console.log(error.message)
        return res.status(500).message({ message:"internal server error", success:false })
    }
}


export const getAllShops = async (req, res) => {
    try {
        const shops = await shopdata.find().populate("commonkey", "verify");
        res.status(200).json({ shops, success:true })
    } catch (error) {
        return res.status(500).json({ message: "internal server  error" })
    }
}





export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await loginData.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Get the user's role and ID
        const { role, _id: id } = user;

        let userDetails;

        // Fetch user details based on the role
        if (role === "user") {
            userDetails = await userData.findOne({ commonKey: id }).lean();
        } else if (role === "doctor") {
            userDetails = await doctData.findOne({ commonkey: id }).lean();
        } else if (role === "shop") {
            userDetails = await shopdata.findOne({ commonkey: id }).lean();
            console.log('Shop details:', userDetails); // Debugging line to check if the details are fetched
        } else if (role === "seller") {
            userDetails = await userData.findOne({ commonKey: id }).lean();
        } else if (role === "admin") {
            // For admin, no need to fetch additional details
            userDetails = null;
        }

        if (!userDetails && role !== "admin") {
            return res.status(404).json({ message: "User details not found" });
        }

        const response = {
            id,
            role,
            username: user.username,
            userDetails: role === "admin" ? null : userDetails || {}, // Ensure empty object fallback
        };

        return res.status(200).json({
            message: "Login successful",
            data: response,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



/* function to delete user and data from the logindata table also deleted */
export const DeleteUser = async(req, res) => {
    try {
        const { id } = req.params
        const user = await loginData.findByIdAndDelete({ _id: id })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        await userData.findOneAndDelete({ commonKey: id });
        return res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: "Server error" })
    }
}

/* function for user to refill the money */
export const refillMoney = async (req, res) => {
    try {
        const { commonkey } = req.params;
        const { money } = req.body;

        if (!money) {
            return res.status(400).json({ message: "Money amount is required" });
        }

        const existingMoney = await moneydata.findOne({ commonkey });

        if (existingMoney) {
            existingMoney.money += money;
            await existingMoney.save();
            return res.status(200).json({ message: "Money refilled successfully", data: existingMoney });
        } else {
            const newMoneyEntry = new moneydata({ commonkey, money });
            await newMoneyEntry.save();
            return res.status(201).json({ message: "Money added successfully", data: newMoneyEntry });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export const ViewComplaints = async (req, res) => {
    try {
      // Fetch complaints and populate the username from the User model
      const complaints = await Complaint.find({}).populate("userId", "username");
  
      return res.status(200).json({ success: true, complaints });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error fetching complaints",
        error: error.message,
      });
    }
  };

  

  export const SendComplaint = async (req, res) => {
    try {
        const { issue } = req.body;
        const { userId } = req.params;

        // Validate userId as a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID format" });
        }

        // Check if user exists
        const userExists = await loginData.findById(userId);
        if (!userExists) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!issue) {
            return res.status(400).json({ success: false, message: "Issue description is required" });
        }

        // Create new complaint
        const newComplaint = new Complaint({
            userId,
            issue,
            date: new Date(),
        });

        await newComplaint.save();

        return res.status(201).json({ success: true, message: "Complaint submitted successfully", complaint: newComplaint });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error submitting complaint", error: error.message });
    }
};



export const viewComplaintandReplyByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch user details
        const user = await loginData.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Fetch complaints for the given userId
        const complaints = await Complaint.find({ userId });

        if (!complaints.length) {
            return res.status(404).json({ success: false, message: "No complaints found for this user" });
        }

        return res.status(200).json({ 
            success: true, 
            username: user.username,  // Include username in response
            complaints 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching complaints", error: error.message });
    }
};



export const SendReply = async (req, res) => {
    try {
        const { complaintId, replyMessage } = req.body;

        if (!complaintId || !replyMessage) {
            return res.status(400).json({ success: false, message: "Complaint ID and reply message are required" });
        }

        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ success: false, message: "Complaint not found" });
        }

        complaint.reply = {
            message: replyMessage,
            repliedAt: new Date(),
        };

        await complaint.save();

        return res.status(200).json({ success: true, message: "Reply submitted successfully", complaint });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error submitting reply", error: error.message });
    }
};

// send complaint 





export const bookDoctor = async (req, res) => {
    try {
        const { appointmentDate, appointmentTime } = req.body;
        const patientId = req.params.userId; // Get patient ID from URL
        const doctorId = req.body.doctorId; // Get doctor ID from request body (logged-in doctor)

        // Validate required fields
        if (!doctorId || !appointmentDate || !appointmentTime) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // Fetch patient details
        const patient = await loginData.findById(patientId);
        if (!patient || patient.role !== "buyer") {
            return res.status(404).json({ success: false, message: "Invalid patient or patient is not a buyer." });
        }

        // Fetch doctor details
        const doctor = await loginData.findById(doctorId);
        if (!doctor || doctor.role !== "doctor") {
            return res.status(404).json({ success: false, message: "Invalid doctor or not a doctor account." });
        }

        // Create a new booking
        const newBooking = new DocBooking({
            patientId,
            doctorId, 
            appointmentDate,
            appointmentTime,
            status: "Pending",
        });

        // Save booking to DB
        await newBooking.save();
        res.status(201).json({ success: true, message: "Appointment booked successfully!", booking: newBooking });

    } catch (error) {
        console.error("Error booking doctor:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


//function to get all bookings of the doctor
import mongoose from "mongoose"; // Ensure mongoose is imported
import guideModel from '../Model/guideModel.js';
import Guide from '../Model/guideModel.js';
import GameAccount from '../Model/shop.Product.js';
import Product from '../Model/shop.Product.js';
import Order from '../Model/ProductOrder.js';
import Cart from '../Model/AddToCart.js';
import Chat from '../Model/Chat.js';
import Message from '../Model/Message.js';

export const getDocBooking = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        // Validate doctor ID
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ success: false, message: "Invalid doctor ID format." });
        }

        // Check if the doctor exists
        const doctor = await loginData.findOne({ _id: doctorId, role: "doctor" });
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found or invalid role." });
        }

        // Fetch all bookings for this doctor
        const bookings = await DocBooking.find({ doctorId })
            .populate("patientId", "username email phone") // Get patient details
            .lean();

        if (!bookings.length) {
            return res.status(404).json({ success: false, message: "No appointments found." });
        }

        res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error("Error fetching doctor's appointments:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const acceptBooking = async (req, res) => {
    try {
        const { bookingId } = req.params; // Get booking ID from request params

        // Validate if bookingId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ success: false, message: "Invalid booking ID format." });
        }

        // Find and update the booking status to "Confirmed"
        const updatedBooking = await DocBooking.findByIdAndUpdate(
            bookingId,
            { status: "Confirmed" },
            { new: true } // Return the updated document
        );

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }

        res.status(200).json({ success: true, message: "Booking accepted successfully!", booking: updatedBooking });
    } catch (error) {
        console.error("Error accepting booking:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export const RejectBooking = async (req, res) => {
    try {
        const { bookingId } = req.params; // Get booking ID from request params

        // Validate if bookingId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ success: false, message: "Invalid booking ID format." });
        }

        // Find and update the booking status to "Confirmed"
        const updatedBooking = await DocBooking.findByIdAndUpdate(
            bookingId,
            { status: "Rejected" },
            { new: true } // Return the updated document
        );

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }

        res.status(200).json({ success: true, message: "Booking Rejected successfully!", booking: updatedBooking });
    } catch (error) {
        console.error("Error accepting booking:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



// funtion to filter todays appointment
export const TodaysAppointment = async (req, res) => {
    try {
        const doctorId = req.params.doctorId; // Get doctor ID from request params

        // Validate if doctorId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({ success: false, message: "Invalid doctor ID format." });
        }

        // Get today's date (set time to 00:00:00 and 23:59:59 for full-day match)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the day
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999); // End of the day

        // Find appointments for the doctor where appointmentDate is today
        const appointments = await DocBooking.find({
            doctorId: doctorId,
            appointmentDate: { $gte: today, $lte: endOfDay }
        }).populate("patientId", "username"); // Populate patient details

        if (!appointments.length) {
            return res.status(404).json({ success: false, message: "No appointments found for today." });
        }

        res.status(200).json({ success: true, message: "Today's appointments retrieved successfully!", appointments });
    } catch (error) {
        console.error("Error fetching today's appointments:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// export const addGuide = async (req, res) => {
//     try {
//         const { uploaderName, title, description, videoUrl, tags } = req.body;

//         if (!uploaderName || !title || !description || !videoUrl) {
//             return res.status(400).json({ success: false, message: "All fields are required." });
//         }

//         const newGuide = new  Guide({
//             uploaderName,
//             title,
//             description,
//             videoUrl,
//             tags
//         });

//         await newGuide.save();
//         res.status(201).json({ success: true, message: "Guide uploaded successfully!", guide: newGuide });

//     } catch (error) {
//         console.error("Error uploading guide:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };


export const addGuide = async (req, res) => {
  try {
    const { docId, title, description, videoUrl } = req.body;

    // 🔴 Basic validation
    if (!docId || !title || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Doctor login, title and video URL are required",
      });
    }

    // 1️⃣ Find Doctor using Login ID (commonkey)
    const doctor = await doctData.findOne({ commonkey: docId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found for this login",
      });
    }

    // 2️⃣ Create guide with Doctor ID
    const newGuide = new Guide({
      docId: doctor._id,   // ✅ store Doctor table ID
      title,
      description,
      videoUrl,
    });

    await newGuide.save();

    res.status(201).json({
      success: true,
      message: "Guide uploaded successfully",
      guide: newGuide,
    });
  } catch (error) {
    console.error("ADD GUIDE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




export const ViewGuide = async (req, res) => {
    try {
        const guides = await Guide.find().populate("docId", "doctorName doctorQualification").sort({ createdAt: "desc" });
        res.status(200).json({ success: true, guides });
    } catch (error) {
        console.error("Error fetching guides:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


// export const addGameAccount = async (req, res) => {
//     try {
//         const { description, price, ProductName } = req.body; // Include price in the body\
//         const userId = req.params.userId
  
//         // Validate required fields
//         if (!description || !price || !ProductName) {
//             return res.status(400).json({ message: 'Description, price and game name are required' });
//         }
  
   
  
//         // Extract screenshots from the request
//         const screenshots = req.files.screenshots ? req.files.screenshots.map(file => file.filename) : [];
  
//         // Create a new game account with user details
//         const newGameAccount = new Product({
//             userId,
//             description,
//             ProductName,
//             price,                    
//             screenshots,
//         });
  
//         await newGameAccount.save();
  
//         // Send success response
//         res.status(201).json({ message: 'Product added successfully', newGameAccount });
//     } catch (error) {
//         console.error('Error adding game account:', error);
//         res.status(500).json({ message: 'Error adding Product', error: error.message });
//     }
//   };
  


  // function to view product by the userid

export const addGameAccount = async (req, res) => {
  try {
    const { description, price, ProductName, quantity } = req.body;
    const userId = req.params.userId;

    // 🔴 Validation
    if (!description || !price || !ProductName || quantity === undefined) {
      return res.status(400).json({
        message: "Product name, description, price and quantity are required",
      });
    }

    // Extract screenshots
    const screenshots = req.files?.screenshots
      ? req.files.screenshots.map((file) => file.filename)
      : [];

    if (screenshots.length === 0) {
      return res.status(400).json({ message: "At least one screenshot required" });
    }

    // 🔹 Availability logic
    const available = Number(quantity) > 0;

    const newProduct = new Product({
      userId,
      ProductName,
      description,
      price,
      quantity,
      available,
      screenshots,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
    });
  }
};

  
  
  export const viewProductsByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // Get userId from request parameters

        const products = await Product.find({ userId }); // Find all products with the given userId

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found for this user." });
        }

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const deleteGuide = async (req, res) => {
    try {
        const { guideId } = req.params;

        // Validate the provided ID format
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            return res.status(400).json({ success: false, message: "Invalid guide ID format." });
        }

        // Check if the guide exists before deleting
        const guide = await Guide.findById(guideId);
        if (!guide) {
            return res.status(404).json({ success: false, message: "Guide not found." });
        }

        // Perform deletion
        await Guide.findByIdAndDelete(guideId);

        res.status(200).json({ success: true, message: "Guide deleted successfully!" });
    } catch (error) {
        console.error("Error deleting guide:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// function to delete the product by the product id
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params; // Get productId from request parameters

        // Validate if productId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format." });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
    };


// function to get all the products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ success: true, products });
        } catch (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        }

// function to book product by user
export const bookProduct = async (req, res) => {
    try {
      const { productId } = req.body;
      const userId = req.params.userId;
  
      if (!userId || !productId) {
        return res.status(400).json({ message: "User ID, Product ID, and quantity are required" });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Create order
      const newOrder = new Order({
        userId,
        productId,
        status: "Pending",
      });
  
      await newOrder.save();
  
      // Send success response with a success flag
      return res.status(201).json({ success: true, message: "Product booked successfully", order: newOrder });
    } catch (error) {
      console.error("Error booking product:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  

// function to get orders by the user


export const viewOrdersByProductOwner = async (req, res) => {
    try {
        // Fetch all orders and populate userId to get the username
        const orders = await Order.find({})
            .populate({
                path: "userId",
                select: "username" // Fetch only the username from the Login model
            })
            .populate({
                path: "productId",
                select: "ProductName" // Optional: Fetch product name as well
            });

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        return res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

  export const getAllBuyers = async (req, res) => {
    try {
      // Populate commonKey to get role from Login model
      const users = await userData.find().populate("commonKey", "role");
  
      // Filter users who have role "buyer"
      const buyers = users.filter(user => user.commonKey?.role === "buyer");
  
      res.status(200).json({
        success: true,
        message: "Buyers retrieved successfully",
        count: buyers.length,
        buyers
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching buyers", error });
    }
  };
  

export const acceptOrderBooking = async (req, res) => {
    try {
        const { bookingId } = req.params; // Get booking ID from request params

        // Validate if bookingId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ success: false, message: "Invalid booking ID format." });
        }

        // Find the booking first
        const booking = await Order.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }

        // If the booking is already confirmed, inform the user
        if (booking.status === "Confirmed") {
            return res.status(400).json({ success: false, message: "Booking has already been confirmed." });
        }

        // Update the booking status to "Confirmed"
        const updatedBooking = await Order.findByIdAndUpdate(
            bookingId,
            { status: "Confirmed" },
            { new: true } // Return the updated document
        );

        res.status(200).json({
            success: true,
            message: "Booking accepted successfully!",
            booking: updatedBooking
        });
    } catch (error) {
        console.error("Error accepting booking:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const RejectOrderBooking = async (req, res) => {
    try {
        const { bookingId } = req.params; // Get booking ID from request params

        // Validate if bookingId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ success: false, message: "Invalid booking ID format." });
        }

        // Find the booking first
        const booking = await Order.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found." });
        }

        // If the booking is already confirmed, inform the user
        if (booking.status === "Rejected") {
            return res.status(400).json({ success: false, message: "Booking has already been confirmed." });
        }

        // Update the booking status to "Confirmed"
        const updatedBooking = await Order.findByIdAndUpdate(
            bookingId,
            { status: "Rejected" },
            { new: true } // Return the updated document
        );

        res.status(200).json({
            success: true,
            message: "Booking accepted successfully!",
            booking: updatedBooking
        });
    } catch (error) {
        console.error("Error accepting booking:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export const AddtoCart = async (req, res) => {
    const userId = req.params.id; // Get user ID from URL
    const { productId } = req.body; // Get productId from request body

    if (!userId || !productId) {
      return res.status(400).json({ error: 'User ID and Product ID are required' });
    }

    try {
      const user = await loginData.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.role !== 'buyer') {
        return res.status(403).json({ error: 'Only buyers can add items to the cart' });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = new Cart({ userId, items: [{ productId }] });
      } else {
        const existingItem = cart.items.find((item) => item.productId.toString() === productId.toString());

        if (!existingItem) {
          cart.items.push({ productId });
        }
      }

      await cart.save();
      return res.status(200).json({ success: true, message: 'Item added to cart successfully', cart });

    } catch (error) {
      console.error('Error in AddtoCart:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const ViewCart = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from URL params

        // Check if user exists
        const user = await loginData.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Find user's cart
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ success: true, message: "Cart is empty", cart: [] });
        }

        return res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const RemoveItemFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.params; // Get userId & productId from URL params
  
      // Find the cart associated with the user
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
      }
  
      // Filter out the item to be removed
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
  
      // Save the updated cart
      await cart.save();
  
      res.json({ success: true, message: "Item removed from cart", cart });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

// export const editProduct = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const product = await Product.findById(productId);

//         if (!product) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         let updatedData = req.body;

//         // ✅ Ensure userId remains unchanged
//         updatedData.userId = product.userId;

//         // ✅ Handle multiple image uploads
//         if (req.files && req.files.screenshots) {
//             updatedData.screenshots = req.files.screenshots.map(file => file.filename);
//         }

//         const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
//             new: true,
//         });

//         res.status(200).json({ message: "Product updated successfully", updatedProduct });

//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };




// function to vieww product by id to update

export const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { ProductName, description, price, quantity } = req.body;

    // 1️⃣ Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 2️⃣ Handle screenshots (replace only if new uploaded)
    let screenshots = product.screenshots;
    if (req.files && req.files.screenshots) {
      screenshots = req.files.screenshots.map((file) => file.filename);
    }

    // 3️⃣ Quantity & availability logic
    const qty = quantity !== undefined ? Number(quantity) : product.quantity;
    const available = qty > 0;

    // 4️⃣ Update fields safely
    product.ProductName = ProductName ?? product.ProductName;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.quantity = qty;
    product.available = available;
    product.screenshots = screenshots;

    // 🔒 userId intentionally NOT changed

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("EDIT PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const viewProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product retrieved successfully", product });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



// ------------------------------------------------ New Controllers ----------------------------------------------------------


/**
 * UPDATE doctor
 */
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await doctData.findByIdAndUpdate(
      id,
      {
        doctorName: req.body.doctorName,
        doctorNumber: req.body.doctorNumber,
        doctorAddress: req.body.doctorAddress,
        doctorQualification: req.body.doctorQualification,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: updated,
    });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE doctor
 */
export const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // 1️⃣ Find doctor first
    const doctor = await doctData.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const loginId = doctor.commonkey; // reference to Login table

    // 2️⃣ Delete doctor
    await doctData.findByIdAndDelete(doctorId);

    // 3️⃣ Delete corresponding login (if exists)
    if (loginId) {
      await loginData.findByIdAndDelete(loginId);
    }

    res.status(200).json({
      success: true,
      message: "Doctor and login deleted successfully",
    });
  } catch (err) {
    console.error("DELETE DOCTOR ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const toggleUserBlock = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Find user
    const user = await userData.findById(userId);
    if (!user || !user.commonKey) {
      return res.status(404).json({
        success: false,
        message: "User or login not found",
      });
    }

    // 2️⃣ Find login
    const login = await loginData.findById(user.commonKey);
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "Login not found",
      });
    }

    // 3️⃣ Toggle verify
    login.verify = !login.verify;
    await login.save();

    res.status(200).json({
      success: true,
      message: login.verify ? "User unblocked" : "User blocked",
      verify: login.verify,
    });
  } catch (err) {
    console.error("BLOCK USER ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const toggleShopStatus = async (req, res) => {
  try {
    const { shopId } = req.params;

    // 1️⃣ Find shop
    const shop = await shopdata.findById(shopId);
    if (!shop || !shop.commonkey) {
      return res.status(404).json({
        success: false,
        message: "Shop or login not found",
      });
    }

    // 2️⃣ Find login
    const login = await loginData.findById(shop.commonkey);
    if (!login) {
      return res.status(404).json({
        success: false,
        message: "Login not found",
      });
    }

    // 3️⃣ Toggle verify
    login.verify = !login.verify;
    await login.save();

    res.status(200).json({
      success: true,
      message: login.verify ? "Shop unblocked" : "Shop blocked",
      verify: login.verify,
    });
  } catch (error) {
    console.error("SHOP TOGGLE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const toggleProductAvailability = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.available = !product.available;
    await product.save();

    res.status(200).json({
      success: true,
      available: product.available,
    });
  } catch (error) {
    console.error("TOGGLE AVAILABILITY ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// chattttttttttttttttttttttttttttttttttt

// controllers/chatController.js

// export const createOrGetChat = async (req, res) => {
//   const { userId, doctorLoginId } = req.body;

//   // convert loginId → doctorId
//   const doctor = await doctData.findOne({ commonkey: doctorLoginId });
//   if (!doctor) return res.status(404).json({ message: "Doctor not found" });

//   let chat = await Chat.findOne({
//     userId,
//     doctorId: doctor._id,
//   });

//   if (!chat) {
//     chat = await Chat.create({
//       userId,
//       doctorId: doctor._id,
//     });
//   }

//   res.json(chat);
// };

// export const getChatList = async (req, res) => {
//   const { userId } = req.params;

//   const chats = await Chat.find({ userId })
//     .populate("doctorId", "doctorName doctorQualification")
//     .sort({ updatedAt: -1 });

//   res.json(chats);
// };


// export const getMessages = async (req, res) => {
//   const { chatId } = req.params;

//   const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
//   res.json(messages);
// };

// export const sendMessage = async (req, res) => {
//   const { chatId, senderRole, message } = req.body;

//   const msg = await Message.create({
//     chatId,
//     senderRole,
//     message,
//   });

//   await Chat.findByIdAndUpdate(chatId, {
//     lastMessage: message,
//   });

//   res.json(msg);
// };

export const createOrGetChat = async (req, res) => {
  try {
    const { userId, doctorLoginId } = req.body;

    if (!userId || !doctorLoginId) {
      return res.status(400).json({
        success: false,
        message: "userId and doctorLoginId are required",
      });
    }

    // convert loginId → doctorId
    const doctor = await doctData.findOne({ commonkey: doctorLoginId });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    let chat = await Chat.findOne({
      userId,
      doctorId: doctor._id,
    });

    if (!chat) {
      chat = await Chat.create({
        userId,
        doctorId: doctor._id,
      });
    }

    return res.status(200).json(chat);
  } catch (error) {
    console.error("createOrGetChat error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getChatList = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const chats = await Chat.find({ userId })
      .populate("doctorId", "doctorName doctorQualification")
      .sort({ updatedAt: -1 });

    return res.status(200).json(chats);
  } catch (error) {
    console.error("getChatList error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "chatId is required",
      });
    }

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("getMessages error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
 

export const sendMessage = async (req, res) => {
  try {
    const { chatId, senderRole, message } = req.body;

    if (!chatId || !senderRole || !message) {
      return res.status(400).json({
        success: false,
        message: "chatId, senderRole and message are required",
      });
    }

    const msg = await Message.create({
      chatId,
      senderRole,
      message,
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message,
    });

    return res.status(201).json(msg);
  } catch (error) {
    console.error("sendMessage error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
