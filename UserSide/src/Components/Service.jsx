import React from "react";
import IndexHeader from "./IndexHeader";

const Services = () => {
  return (
    <div>
        <IndexHeader />
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Our Services</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        At Wooftail, we offer a range of professional pet care services to keep your furry friends happy and healthy.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Service 1 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-3">Pet purchasing</h2>
          <p className="text-gray-600">Safe and comfortable boarding for your pets while you're away.</p>
        </div>
        
        {/* Service 2 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-3">Dog health</h2>
          <p className="text-gray-600">Daily routine to keep your dog active and healthy.</p>
        </div>
        
        {/* Service 3 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-3">Grooming Services</h2>
          <p className="text-gray-600">Professional grooming to keep your pets looking their best.</p>
        </div>
        
       
        {/* Service 5 */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-semibold mb-3">Veterinary Care</h2>
          <p className="text-gray-600">Access to top-notch vet services for your pet’s health.</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Services;
