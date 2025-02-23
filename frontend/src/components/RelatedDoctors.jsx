import React, { useContext, useEffect,useState} from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({docId,speciality}) => {
    const {doctors} = useContext(AppContext);
    const [relatedDoctors, setRelatedDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(doctors.length>0 && speciality){
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelatedDoctors(doctorsData);
        }
    },[doctors,speciality,docId])

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
    <h1 className="text-2xl md:text-3xl font-medium">Top Doctors to Book</h1>
    <p className="sm:w-2/3 text-sm text-center">
      Simply browse through our extensive list of trusted doctors.
    </p>
    <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
      {relatedDoctors.slice(0,5).map((doc, index) => (
        <div
          onClick={() => {navigate(`/appointment/${doc._id}`); scrollTo(0, 0);}}
          className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          key={index}
        >
          <img className="bg-blue-50" src={doc.image} alt={doc.name} />
          <div className="p-4">
          <div className={`flex items-center gap-2 text-sm text-center ${doc.available ? 'text-green-500' : 'text-red-500'} `}> 
                <p className={`w-2 h-2 ${doc.available ? 'bg-green-500' : 'bg-red-500'}  rounded-full`}></p>
                <p>{doc.available ? "Available" : "Not Available"}</p>
              </div>
            <p className="font-medium text-lg">{doc.name}</p>
            <p className="text-sm font-serif">{doc.speciality}</p>
          </div>
        </div>
      ))}
    </div>
    <button
      className="bg-blue-100 px-10 py-2 rounded-full mt-5"
      onClick={() => {
        navigate("/doctors");
        scrollTo(0, 0);
      }}
    >
      more
    </button>
  </div>
  )
}

export default RelatedDoctors