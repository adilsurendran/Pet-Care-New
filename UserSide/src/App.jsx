import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Indexs from './Components/Indexs'
import Login from './Components/Login';
import DsignUp from './Components/Doctor/DsignUp';
import SsignUp from './Components/Shop/SsignUp';
import UserReg from './Components/User/UserReg';
import AdminDash from './Components/Admin/AdminDash';
import ViewUser from './Components/Admin/ViewUser';
import BuyerDash from './Components/User/BuyerDash';
import AddProduct from './Components/Shop/AddProduct';
import UserPannel from './Components/Admin/UserPannel';
import SellerList from './Components/Admin/SellerList';
import ShopPannel from './Components/Admin/ShopPannel';
import DoctorPannel from './Components/Admin/DoctorPannel';
import PetcarePannel from './Components/Admin/PetcarePannel';
import ViewComplaints from './Components/Admin/ViewComplaints';
import Doctordash from './Components/Doctor/Doctordash';
import DoctorAppointmentView from './Components/Doctor/DoctorAppoinmentView';
import PatientPannel from './Components/Doctor/PatientPannel';
import Suggestion from './Components/Doctor/Suggestion';
import ViewGuides from './Components/Doctor/Suggestion';
import AddGuide from './Components/Doctor/AddGuide';
import ShopDash from './Components/Shop/ShopDash';
import AddGameAccount from './Components/Shop/AddProduct';
import ViewProducts from './Components/Shop/Viewproduct';
import BuyPro from './Components/User/buyProduct';
import BookDoctors from './Components/User/BookDoctors';
import ViewGuide from './Components/User/ViewGuide';
import SellerDash from './Components/Seller/SellerDash';
import EditProduct from './Components/Shop/EditProduct';
import ViewComplaint from './Components/Admin/ViewComplaints';
import ViewComp from './Components/User/ViewComplaint';
import SendComplaint from './Components/User/SendComplaint';
import Services from './Components/Service';
import CartPage from './Components/User/CartPage';
import ChatPage from './Components/User/ChatPage';
import DoctorChatPage from './Components/Doctor/DoctorChatPage';
import PetProfile from './Components/User/PetProfile';
import UserProfile from './Components/User/UserProfile';
import PetMarketplace from './Components/User/PetMarketplace';
import Community from './Components/User/Community';



function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Indexs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/docs" element={<DsignUp />} />
        <Route path="/shopr" element={<SsignUp />} />
        <Route path="/userreg" element={<UserReg />} />
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/user" element={<ViewUser />} />
        <Route path="/buyer-dash" element={<BuyerDash />} />
        <Route path="/addprod" element={<AddGameAccount />} />
        <Route path="/userpannel" element={<UserPannel/>} />
        <Route path="/shoppannel" element={<ShopPannel/>} />
        <Route path="/doctorpannel" element={<DoctorPannel/>} />
        <Route path="/petcarepannel" element={<PetcarePannel/>} />
        <Route path="/viewcomplaintes" element={<ViewComplaints/>} />
        <Route path="/addproducts" element={<AddProduct/>} />
        <Route path="/doctor-home" element={<Doctordash/>} />
        {/* <Route path="/docAppoinments" element={<DoctorAppointmentView/>} /> */}
        <Route path='/viewcomplaint' element={<ViewComplaints />} />
        <Route path='/patients' element={<PatientPannel />} />
        <Route path='/suggestion' element={<ViewGuides />} />
        <Route path='/addguides' element={<AddGuide />} />
        <Route path='/shopdash' element={<ShopDash />} />
        <Route path='/vieworders' element={<ViewProducts />} />
        <Route path='/buypro' element={<BuyPro />} />
        <Route path='/bookdoctors' element={<BookDoctors />} />
        <Route path='/viewguide' element={<ViewGuide />} />
        <Route path='/sellerdash' element={<SellerDash />} />
        <Route path='/editproduct/:productId' element={<EditProduct />} />
        <Route path='/complaint' element={<ViewComp />} />
        <Route path='/sendcomplaint' element={<SendComplaint />} />
        <Route path='/service' element={<Services />} />
        <Route path='/cartpage' element={<CartPage />} />

        <Route path="/user/chat" element={<ChatPage />} />
<Route path="/user/chat/:doctorLoginId" element={<ChatPage />} />

<Route path='/doctor/chat' element={<DoctorChatPage/>}></Route>
        <Route path='/pet-profile' element={<PetProfile />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/pestmarketplace' element={<PetMarketplace />} />
        <Route path='/community' element={<Community />} />


        
        
      </Routes>
     </Router>
    </>
  )
}

export default App
