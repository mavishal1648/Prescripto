import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const {setToken,backendUrl,token} = useContext(AppContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if(state === "Sign Up"){
        const response = await axios.post(backendUrl+"api/user/register",{name,email,password});
        if(response.data.success){
          localStorage.setItem("token",response.data.token);
          setToken(response.data.token);
          toast.success(response.data.message);
        }else{
          toast.error(response.data.message);
        }
      }else{
        const response = await axios.post(backendUrl+"api/user/login",{email,password});
        if(response.data.success){
          localStorage.setItem("token",response.data.token);
          setToken(response.data.token);
          toast.success(response.data.message);
        }else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(token){
      navigate("/");
    }
  },[token])

  return (
    <form  onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 items-start m-auto p-8 min-w-[350px] sm:min-w-96 border rounded-lg text-zinc-600 shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="text-sm text-zinc-400">
          {state === "Sign Up"
            ? "Please sign up to book appointment"
            : "Please login up to book appointment"}
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-400 rounded w-full mt-2 p-2"
            />
          </div>
        )}
        
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-gray-400 rounded w-full mt-2 p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-gray-400 rounded w-full mt-2 p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="mt-2 p-2 bg-primary w-full text-white rounded">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
