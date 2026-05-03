import Layout from "../../components/Layout";
import React from "react";
import { Phone, Mail, MapPin, Home } from "lucide-react";

const Contact = () => {
  return (
    <Layout>
        <div className="p-4 md:p-6">
               <div className="flex-1 bg-gray-200 p-8 rounded-xl shadow-md">

            {/* Phone Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm mb-2 block">
                  Phone Number 1
                </label>
                <div className="flex items-center bg-blue-100 rounded-lg px-3 py-2">
                  <Phone size={18} className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Phone Number 1"
                    className="bg-transparent w-full outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm mb-2 block">
                  Phone Number 2
                </label>
                <div className="flex items-center bg-blue-100 rounded-lg px-3 py-2">
                  <Phone size={18} className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Phone Number 2"
                    className="bg-transparent w-full outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="text-sm mb-2 block">
                E-mail Address
              </label>
              <div className="flex items-center bg-blue-100 rounded-lg px-3 py-2">
                <Mail size={18} className="mr-2 text-gray-500" />
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="bg-transparent w-full outline-none"
                />
              </div>
            </div>

            {/* City */}
            <div className="mb-6">
              <label className="text-sm mb-2 block">
                City of residence
              </label>
              <div className="flex items-center bg-blue-100 rounded-lg px-3 py-2 w-full md:w-1/2">
                <MapPin size={18} className="mr-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="City"
                  className="bg-transparent w-full outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-8">
              <label className="text-sm mb-2 block">
                Residential Address
              </label>
              <div className="flex items-start bg-blue-100 rounded-lg px-3 py-2">
                <Home size={18} className="mr-2 mt-1 text-gray-500" />
                <textarea
                  rows="3"
                  placeholder="Alembank, Addia ababa"
                  className="bg-transparent w-full outline-none resize-none"
                />
              </div>
            </div>

            {/* Button */}
            <button className="bg-green-700 text-white px-10 py-3 rounded-lg shadow-md hover:bg-green-800 transition">
              Update
            </button>

          </div>
          </div>

    </Layout>
  );
};

export default Contact;
