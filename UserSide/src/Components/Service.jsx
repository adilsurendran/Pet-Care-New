import React from "react";
import { motion } from "framer-motion";
import IndexHeader from "./IndexHeader";
import "./ServicePage.css";
import {
  FaPaw,
  FaStore,
  FaTruck,
  FaStethoscope,
  FaUsers,
  FaShoppingBag
} from "react-icons/fa";

const Services = () => {
  const coreFeatures = [
    {
      icon: <FaPaw />,
      title: "Pet Profiles",
      description: "Easily add your beloved pets with their unique details and medical history. Keep a digitized care record in one secure place."
    },
    {
      icon: <FaStore />,
      title: "Pet Marketplace",
      description: "Adopt a new furry friend or list a pet for sale. Our safe and trusted marketplace connects animal lovers everywhere."
    },
    {
      icon: <FaTruck />,
      title: "Track Orders",
      description: "Stay updated on your pet's needs. Monitor your purchases and track product deliveries in real-time."
    },
    {
      icon: <FaStethoscope />,
      title: "Expert Veterinary Hub",
      description: "Chat directly with certified doctors for professional consultations and browse expert medical guides for daily care."
    },
    {
      icon: <FaUsers />,
      title: "Pet Community",
      description: "Share your pet's moments and connect with others. Post updates, ask questions, and be part of a vibrant pet-loving circle."
    },
    {
      icon: <FaShoppingBag />,
      title: "Curated Shop",
      description: "Explore our premium selection of pet food, toys, and essentials. High-quality products chosen specifically for your pet's wellness."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="services-page-wrapper">
      <IndexHeader />

      {/* Hero Section */}
      <section className="services-hero">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="premium-badge">Everything your pet needs</span>
          <h1 className="hero-title">A Complete <span>Pet Care</span> Hub</h1>
          <p className="hero-subtitle">
            From medical insights to a loving community, Wooftale provides a
            seamless experience for pet owners to manage, shop, and connect.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-container">
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="premium-feature-card"
              variants={cardVariants}
            >
              <div className="feature-visual-accent"></div>
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer Placeholder for visual balance */}
      <div className="py-5 text-center text-muted small">
        © 2026 Wooftale. Making pet parenthood easier.
      </div>
    </div>
  );
};

export default Services;
