import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-900 font-medium">
        <p>CONTACT US</p>
      </div>
      <div className="flex  flex-col my-10 md:flex-row gap-12">
        <img
          src={assets.contact_image}
          alt="contact"
          className="w-full md:max-w-[360px]"
        />
        <div className="flex flex-col gap-5 justify-center md:w-2/4 text-sm text-gray-500 ml-12">
          <p className="font-semibold text-gray-500">Our OFFICE</p>
          <p>54709 Willms Station Suite 350,<br/> Washington, USA</p>
          <p>Tel: (415) 555‑0132</p>
          <p>Email: greatstackdev@gmail.com</p>
          <p>Careers at PRESCRIPTO</p>
          <p>Learn more about our teams and job openings.</p>
          <button className="border border-gray-300 w-1/4 p-3 hover:bg-black hover:text-white rounded-lg">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
