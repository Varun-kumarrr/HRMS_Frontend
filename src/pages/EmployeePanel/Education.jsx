import React, { useEffect } from "react";
import Layout from '../../components/Layout'
import axios from 'axios'


const Education = () => {

  return (
    <Layout>
         <div className="flex-1 bg-gray-200 p-8 rounded-xl shadow-md">

            {/* Academic Records */}
            <h2 className="font-semibold mb-4">Academic Records</h2>

            <div className="space-y-4 mb-6">

              <div className="bg-blue-100 p-4 rounded-xl">
                <h3 className="font-semibold">GEC Siwan</h3>
                <p className="text-sm text-gray-600">
                  B.Tech in Computer Science & Engineering, Nov 2022 - May 2026
                </p>
              </div>

              <div className="bg-blue-100 p-4 rounded-xl">
                <h3 className="font-semibold">Maheshwari Academy, Katihar</h3>
                <p className="text-sm text-gray-600">
                  April 2018 - April 2021
                </p>
              </div>

            </div>

            {/* Professional Qualifications */}
            <h2 className="font-semibold mb-4">
              Professional Qualifications
            </h2>

            <div className="space-y-4">

              <div className="bg-blue-100 p-4 rounded-xl">
                <h3 className="font-semibold">CCNA Certification</h3>
                <p className="text-sm text-gray-600">
                  at Addis Ababa University, May 2019 - September 2021
                </p>
              </div>

              <div className="bg-blue-100 p-4 rounded-xl">
                <h3 className="font-semibold">
                  Google UI / UX Certification
                </h3>
                <p className="text-sm text-gray-600">
                  September 2021 - September 2022
                </p>
              </div>

              <div className="bg-blue-100 p-4 rounded-xl">
                <h3 className="font-semibold">Web Developer</h3>
                <p className="text-sm text-gray-600">
                  at EAI, May 2019 - September 2021
                </p>
                <ul className="text-sm text-gray-600 list-disc ml-5 mt-2">
                  <li>
                    Collaborated with teammates to deliver valuable features
                    meeting business and customer needs.
                  </li>
                </ul>
              </div>

            </div>

          </div>
        {/**jghdggdggd */}

        {/* Academic Details Form */}
<div className="mt-10">

  <h2 className="font-semibold mb-6">
    Academic Records / Academic Details
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Institution */}
    <div>
      <label className="text-sm mb-2 block">Name of Institution</label>
      <input
        type="text"
        placeholder="GEC Siwan"
        className="w-full bg-blue-100 p-3 rounded-lg outline-none"
      />
    </div>

    {/* Department */}
    <div>
      <label className="text-sm mb-2 block">Department</label>
      <input
        type="text"
        placeholder="CSE(IoT)"
        className="w-full bg-blue-100 p-3 rounded-lg outline-none"
      />
    </div>

    {/* Course */}
    <div>
      <label className="text-sm mb-2 block">Course</label>
      <div className="bg-blue-100 rounded-lg px-3 py-2">
        <select className="w-full bg-transparent outline-none">
          <option>Computer Science</option>
          <option>IT</option>
          <option>Electronics</option>
        </select>
      </div>
    </div>

    {/* Location */}
    <div>
      <label className="text-sm mb-2 block">Location</label>
      <input
        type="text"
        placeholder="Siwan Bihar"
        className="w-full bg-blue-100 p-3 rounded-lg outline-none"
      />
    </div>

    {/* Start Date */}
    <div>
      <label className="text-sm mb-2 block">Start Date</label>
      <div className="flex items-center bg-blue-100 rounded-lg px-3">
        <input
          type="date"
          className="w-full bg-transparent p-3 outline-none"
        />
      </div>
    </div>

    {/* End Date */}
    <div>
      <label className="text-sm mb-2 block">End Date</label>
      <div className="flex items-center bg-blue-100 rounded-lg px-3">
        <input
          type="date"
          className="w-full bg-transparent p-3 outline-none"
        />
      </div>
    </div>

  </div>

  {/* Description */}
  <div className="mt-6">
    <label className="text-sm mb-2 block">Description</label>
    <textarea
      rows="4"
      placeholder="• Gathering and evaluating product requirements..."
      className="w-full bg-blue-100 p-4 rounded-lg outline-none"
    />
  </div>

  {/* Button */}
  <button className="mt-6 bg-green-700 text-white px-10 py-3 rounded-lg shadow-md hover:bg-green-800 transition">
    Update
  </button>

</div>
    </Layout>
  )
}

export default Education