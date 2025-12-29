import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
import IndexHeader from './IndexHeader';
import { Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa'; // Import paw icon


const Indexs = () => {
    return (
        <div>
            <IndexHeader />
            {/* Hero Section */}
            <section id="hero" className="bg-light text-center py-5 mt-2">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                     <h2 className="custom-heading">
        <FaPaw className="paw-icon" />Welcome to WoofTale
      </h2>
                    <p className="lead">Your trusted partner in pet health and care.</p>
                </motion.div>
                <div className="mt-2">
                    <Link to={'/shopr'} className="btn btn-danger mx-2">Shop Registration</Link>
                    <Link to={'/userreg'} className="btn btn-secondary mx-2">User Registration</Link>
                </div>
            </section>

            {/* Auto-Scrolling Images Section */}
            <section className="carousel-section py-5 mb-5 ">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://img.freepik.com/free-photo/adorable-portrait-pet-surrounded-by-flowers_23-2151850064.jpg?t=st=1738038043~exp=1738041643~hmac=028f1e6753e47bdad12697ee5c41fd5962e346665f8fcf91c83042d78d96097e&w=1060"
                            alt="Pet Care 1"
                        />
                        <Carousel.Caption>
                        <h3 style={{ color: "white" }}>Professional Pet Care</h3>
                            <p>Ensuring your pet's health and happiness.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.pinimg.com/736x/e8/18/52/e81852f46e63b6185e81bd7aaff84de0.jpg"
                            alt="Pet Care 2"
                        />
                        <Carousel.Caption>
                            <h3 style={{ color: "white" }}>Expert Veterinary Services</h3>
                            <p>24/7 support for your furry friends.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.pinimg.com/736x/b0/25/02/b02502fad481f932c1309daba5cd7a59.jpg"no-repeat
                            alt="Pet Care 3"
                        />
                        <Carousel.Caption>
                            <h3 style={{ color: "white" }}>Comprehensive Pet Solutions</h3>
                            <p>We care like it's our own.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>

            {/* About Section */}
            <section id="about" className="py-5 bg-light">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>About Us</h2>
                        <p>
                        Wooftail is dedicated to providing top-notch healthcare services for pets, ensuring they live happy, healthy lives. Our mission is to make pet ownership easier and more joyful by offering expert veterinary care, wellness programs, and personalized support for every pet. We strive to create a loving and stress-free experience for both pets and their owners, making sure every furry companion receives the best medical attention, nutrition guidance, and preventive care available. At Wooftail, your pet's health and happiness are our top priorities!

                        <p><b> OUR TEAM</b> </p>
                            Abinav km, Don, Anand
                            </p>
                        
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-5 bg-dark text-light">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>Contact Us</h2>
                        <p>Email: contact@wooftail.com | Phone:7907621449</p>
                        <address>calicut,kerala,india</address>
                    </motion.div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-secondary text-light py-3 text-center">
                <p>&copy; 2025 PetCare. All rights reserved.</p>
            </footer>
        </div>
    );
}


export default Indexs