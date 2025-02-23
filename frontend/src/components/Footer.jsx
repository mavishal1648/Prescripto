import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left */}
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-40" />
          <p className="text-sm w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            dignissimos beatae aliquam eaque voluptatem, autem in debitis magnam
            doloribus fugiat, corporis molestiae repellendus nobis itaque
            adipisci, cupiditate nihil nostrum dolorum.
          </p>
        </div>
        {/* middle */}
        <div>
          <p className="font-medium text-xl mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="list-disc ml-3" onClick={()=>{navigate('/')}}>Home</li>
            <li className="list-disc ml-3" onClick={()=>{navigate('/about')}}>About us</li>
            <li className="list-disc ml-3" onClick={()=>{navigate('/contact')}}>Contact us</li>
          </ul>
        </div>
        {/* right */}
        <div>
          <p className="font-medium text-xl mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="list-disc ml-3"> +91 123456789</li>
            <li className="list-disc ml-3">prescripto@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border-none outline-none h-0.5 bg-gray-400" />
        <p className="text-sm text-gray-600 mt-3 text-center mb-4">Copyright &copy; 2024 Prescripto</p>
      </div>
    </div>
  );
};

export default Footer;
