import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'


const Navbar = () => {
    const {token,setToken} = useContext(AdminContext);
    const {dToken,setDToken} = useContext(DoctorContext);
    const navigate = useNavigate();
    

    const logout = ()=>{
        if(token){
            localStorage.removeItem('token');
            setToken('');
        }
        if(dToken){
            localStorage.removeItem('dToken');
            setDToken('');
        }
        navigate('/login');
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                {token?'Admin':'Doctor'}
            </p>
        </div>
        <button onClick={logout} className='bg-primary text-white px-10 py-2 rounded-full text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
