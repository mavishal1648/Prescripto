import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="bg-primary  flex flex-col md:flex-row rounded-lg md:px-10 lg:px-20">
      {/* Left side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-white font-semibold lg:text-5xl text-3xl md:text-4xl leading-tight md:leading-tight lg:leading-tight p-3">
          Book Appointment <br /> With Trusted Doctors..
        </p>
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <img src={assets.group_profiles} alt="group-profiles" className="w-28" />
          <p className="text-white text-sm font-light p-3">
            Simply browse through our extensive list of trusted doctors,
             schedule your appointment hassle-free.
          </p>
        </div>
        <a href="#speciality" className="bg-white rounded-full flex flex-row p-3 gap-2 font-medium ml-3">Book appointment <img src={assets.arrow_icon} alt="arrow-icon" className="w-3" /> </a>
      </div>
      {/* right side */}
      <div className="md:w-1/2 relative">
        <img src={assets.header_img} alt="header-img" className="w-full md:absolute bottom-0 h-auto rounded-lg"/>
      </div>
    </div>
  );
};

export default Header;
