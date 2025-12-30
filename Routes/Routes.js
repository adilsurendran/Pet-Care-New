import express from 'express';
import { acceptBooking, acceptOrderBooking, addGameAccount, addGuide, AddtoCart, bookDoctor, bookProduct, createOrGetChat, deleteDoctor, deleteGuide, deleteProduct, DeleteUser, doctorRegistration, editProduct, getAllBuyers, getAlldoct, getAllProducts, getAllShops, getAllUsers, getChatList, getDocBooking, getDoctorChatList, getMessages, login, refillMoney, RejectBooking, RemoveItemFromCart, SendComplaint, sendMessage, SendReply, shopRegistration, TodaysAppointment, toggleProductAvailability, toggleShopStatus, toggleUserBlock, updateCartQuantity, updateDoctor, userRegistration, ViewCart, viewComplaintandReplyByUser, ViewComplaints, ViewGuide, viewOrdersByProductOwner, viewProductById, viewProductsByUserId } from '../Controller/Controller.js';
import upload from '../middleware/upload.js'; 


const route = express.Router();

route.post('/userregistration', userRegistration);
route.post('/doctorreg', doctorRegistration)
route.get('/getallusers', getAllUsers)
route.get('/getalldoctors', getAlldoct)
// route.post('/addproduct/:id', upload.array('productImages'), AddProduct);
// route.post('/addproduct/:id', AddProduct);
route.post('/shopreg', shopRegistration)
route.get('/shops', getAllShops)
route.delete('/delete/:id', DeleteUser)
route.post('/login', login)
route.post('/refill/:id', refillMoney)
route.post("/sendComplaint/:userId", SendComplaint)
route.get('/viewcomplaints', ViewComplaints)
route.post('/sendreply', SendReply)
route.post("/book/:userId", bookDoctor);
route.get('/getdocbooking/:doctorId', getDocBooking);
route.put('/accept/:bookingId', acceptBooking);
route.put('/reject/:bookingId', RejectBooking);
route.get("/todaysappointments/:doctorId", TodaysAppointment);
route.post("/addguide", addGuide)
route.get("/viewguides", ViewGuide)
route.post('/addgameaccount/:userId', upload.fields([{ name: 'screenshots', maxCount: 100 }]), addGameAccount);
route.get('/getpro/:userId', viewProductsByUserId)
route.delete('/deletepro/:productId', deleteProduct)
route.get('/allpro', getAllProducts)
route.post('/bookpro/:userId',bookProduct)
route.get('/orderbyuser', viewOrdersByProductOwner)
route.post('/acceptorder/:bookingId', acceptOrderBooking)
route.post('/add-to-cart/:id', AddtoCart)
route.put('/cart/update-quantity/:userId/:productId',updateCartQuantity)
route.get('/getbuyers', getAllBuyers)
route.put('/editProduct/:productId',upload.fields([{ name: "screenshots", maxCount: 100 }]), editProduct)
route.get('/viewProduct/:productId', viewProductById)
route.get('/getreply/:userId', viewComplaintandReplyByUser)
route.delete('/deleteguide/:guideId', deleteGuide)
route.get('/viewcart/:id', ViewCart)
route.delete('/remove-from-cart/:userId/:productId', RemoveItemFromCart)

// ------------------------------------------------ New routes ----------------------------------------------------------
route.put("/doctor/:id", updateDoctor);
route.delete("/doctor/:id", deleteDoctor);

route.put("/user/block-toggle/:userId", toggleUserBlock);

route.put("/shop/block-toggle/:shopId", toggleShopStatus);

// routes/productRoutes.js
route.put("/product/toggle-availability/:productId", toggleProductAvailability);

// routes/chatRoutes.js
route.post("/chat", createOrGetChat);
route.get("/chat/list/:userId", getChatList);

// sharing for user and doctor 
route.get("/chat/messages/:chatId", getMessages);
route.post("/chat/message", sendMessage);

// Doctor inbox
route.get(
  "/chat/doctor/list/:doctorLoginId",
  getDoctorChatList
);


export default route;