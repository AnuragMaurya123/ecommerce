"use client"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Button } from "./ui/button";

function App() {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div>
      {showNotification && (
       <div
       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
     >
       <div
         className="max-h-[80vh] w-[90%] max-w-4xl overflow-y-auto bg-white text-black p-6 rounded-lg shadow-lg"
       >
              <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Features of the Website</h1>
              <hr/>
              <ul className="list-disc list-inside mt-4 text-gray-600 ">
                <li>Frontend Development
                  <ul className="list-disc list-inside ml-4">
                    <li>Designed and implemented user interfaces for the e-commerce platform, enhancing user registration, login, and product discovery.</li>
                    <li>Developed responsive design features using  React.</li>
                  </ul>
                </li>
              </ul>
              <ul className="list-disc list-inside mt-4 text-gray-600">
                <li>Backend Development
                  <ul className="list-disc list-inside ml-4">
                    <li>Created APIs for user authentication and product management, likely using technologies such as 
                      Node.js, Express, JWT Authentication, Bcrypt, Cloudinary, Cors, Multer</li>  
                  </ul>
                </li>
              </ul>
              <ul className="list-disc list-inside mt-4 text-gray-600">
                <li>Database Management
                  <ul className="list-disc list-inside ml-4">
                    <li>Designed and managed a database for user data, products, and orders.</li>
                    <li>Used relational databases  MongoDB.
                    </li>
                    </ul>
                   
                </li>
              </ul>
              <ul className="list-disc list-inside mt-4 text-gray-600">
                <li>Payment Integration
                  <ul className="list-disc list-inside ml-4">
                    <li>Integrated secure payment gateways like Stripe and Razorpay to handle transactions.</li>
                    <li>Implemented payment flow, including checkout and order confirmation.
                    </li>

                  </ul>
                </li>
              </ul>
              <ul className="list-disc list-inside mt-4 text-gray-600">
                <li>Search and Filtering
                  <ul className="list-disc list-inside ml-4">
                    <li>Added search functionality and filters (category-based filtering) for improved product discovery.
                    </li>

                  </ul>
                </li>
              </ul>
              <ul className="list-disc list-inside mt-4 text-gray-600">
                <li>E-Commerce Functionality
                  <ul className="list-disc list-inside ml-4">
                    <li>Developed a shopping cart system for users to manage their purchases.
                    </li>
                    <li>Implemented a smooth checkout process to ensure a seamless shopping experience.</li>
                  </ul>
                </li>
              </ul>
              <ul className="list-disc list-inside mt-4 text-gray-600">
                <li>Admin Panel
                  <ul className="list-disc list-inside ml-4">
                    <li>Designed and implemented an admin panel to manage products and view key metrics.
                    </li>
                    <li className="text-blue-600"><a href="https://ecommerce-cxpy.vercel.app/">View Admin Panel</a></li>
                  </ul>
                </li>
              </ul>
            
              <div className="flex items-center justify-center">
              <button className="bg-[#e3642a] text-white text-xs px-10 py-4" onClick={() => setShowNotification(false)}>Close</button>
            </div>
            </div>
           
          </div>
       
      )}
    </div>
  );
}

export default App;