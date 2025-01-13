import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import axios from "axios";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage] = useState(false);
  const { userData, setUserData,token,backendUrl,loadUserData} = useContext(AppContext);
  
  const updateProfile = async()=>{
    try {
      const formData = new FormData();
      formData.append("name",userData.name);
      formData.append("phone",userData.phone);
      formData.append("address",JSON.stringify(userData.address));
      formData.append("date_of_birth",userData.date_of_birth);
      formData.append("gender",userData.gender);
      if(image){
        formData.append("image",image);
      }
      const response = await axios.post(backendUrl+'api/user/update-profile',formData,{headers:{Authorization:token}});
      if(response.data.success){
        toast.success(response.data.message);
        loadUserData();
        setIsEdit(false);
        setImage(false);
      }else{
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {
        isEdit ? <label htmlFor="image">
          <div className="inline-block cursor-pointer relative">
            <img className="w-36 rounded opacity-75" src={image?URL.createObjectURL(image):userData.image} alt=""/>
            <img className="w-10 absolute bottom-16 right-12" src={image?'':assets.upload_icon} alt=""/> 
          </div>
          <input type="file" id="image" hidden onChange={(e)=>setImage(e.target.files[0])}/>
        </label>: <img src={userData.image} alt="profile_img" className="w-36 rounded"/>
      }
      {isEdit ? (
        <input
          type="text"
          value={userData.name}
          placeholder={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="bg-gray-100 text-3xl max-w-60 mt-4"
        />
      ) : (
        <p className="font-medium text-3xl mt-4 text-neutral-800">{userData.name}</p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none"/>
      <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
        <p className="font-medium underline">Email id:</p>
        <p className="font-medium text-blue-600">{userData.email}</p>
        <p className="font-medium underline">Phone:</p>

        {isEdit ? (
          <input
            type="text"
            value={userData.phone}
            placeholder={userData.phone}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="bg-gray-100 text-md max-w-50 "
          />
        ) : (
          <p className="font-medium text-blue-600">{userData.phone}</p>
        )}
        <p className="font-medium underline">Address:</p>
        {isEdit ? (
          <div>
            <input
              type="text"
              value={userData.address?.line1 || ""}
              placeholder={userData.address?.line1 || "Enter Line 1"}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              className="bg-gray-100 text-md w-full mt-1 "
            />
            <br />
            <input
              type="text"
              value={userData.address?.line2 || ""}
              placeholder={userData.address?.line2 || "Enter Line 2"}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
              className="bg-gray-100 text-md w-full mt-1"
            />
          </div>
        ) : (
          <p className="font-medium text-blue-600">
            {userData.address?.line1 || "No address available"}
            <br />
            {userData.address?.line2 || "No address available"}
          </p>
        )}
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_5fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium underline">Gender:</p>
          {isEdit ? (
            <select
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
              className="bg-gray-100 text-md w-24 mt-1"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="font-medium text-red-600">{userData.gender}</p>
          )}
          <p className="font-medium underline">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.date_of_birth}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  date_of_birth: e.target.value,
                }))
              }
              className="bg-gray-100 text-md w-24 mt-1"
            />
          ) : (
            <p className="font-medium text-red-600">{userData.date_of_birth}</p>
          )}
        </div>
      </div>
      <div>
        {
          isEdit ? (
            <button
              className="px-5 mt-5 border border-black rounded bg-primary text-white font-light"
              onClick={updateProfile}
            >
              Save Information
            </button>
          ) : (
            <button
              className="px-5 mt-5 border border-black rounded font-light bg-black text-white"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )
        }
      </div>
    </div>
  );
};

export default MyProfile;