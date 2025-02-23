import React, { useContext, useState} from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

  const [state,setState] = useState('Admin');
  const [email,setEmail] = useState('');  
  const [password,setPassword] = useState('');
  const {setToken,backendUrl} = useContext(AdminContext);
  const {setDToken} = useContext(DoctorContext);


  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try{
      if(state==='Admin'){
        const response = await axios.post(backendUrl+'api/admin/login',{email,password});
        if(response.data.success){
          localStorage.setItem('token',response.data.token);
          setToken(response.data.token);

        }else{
          toast.error(response.data.message);
        }
      }else{
        const response = await axios.post(backendUrl+'api/doctor/login',{email,password});
        if(response.data.success){
          console.log('response.data.token',response.data.token);
          localStorage.setItem('dToken',response.data.token);
          setDToken(response.data.token);
        }else{
          toast.error(response.data.message);
        }
      }
    }catch(error){

    }
  }


  return (
   <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
    <div className='flex flex-col gap-3 items-start m-auto p-8  min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
      <p className='text-2xl font-semibold m-auto '><span className='text-primary'>{state}</span> Login</p>
      <div className='w-full '>
        <p>Email</p>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='email' required/>
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type='password' required/>
      </div>
      <button className='bg-primary text-white w-full py-2 rounded text-lg font-light'>Login</button>
      {
        state==='Admin'?
        <p className='text-black'>Doctor Login ? <span className='text-red-600 underline hover:text-lg' onClick={()=>setState('Doctor')} >Click Here</span></p>
        : <p className='text-black'>Admin Login ? <span className='text-red-600 underline hover:text-lg' onClick={()=>setState('Admin')}>Click Here</span></p>
      }
    </div>
   </form>
  )
}

export default Login