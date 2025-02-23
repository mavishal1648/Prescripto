import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const [doc, setDoc] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const navigate = useNavigate();
  const { token, backendUrl, getDoctorsData, doctors } = useContext(AppContext);

  const getAvailableSlot = async () => {
    setDocSlots([]);

    let today = new Date();

    // if time is past 9pm start tmwr...
    let startDate = new Date();
    let endOfToday = new Date(today);
    endOfToday.setHours(21, 0, 0, 0);

    if (today >= endOfToday) {
      startDate.setDate(today.getDate() + 1); // Start tmwr..
    }

    for (let i = 0; i < 7; i++) {
      // Calculate the date for each day
      let currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // End of the day time
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0 && today.getDate() === currentDate.getDate()) {
        
        // If current minutes are between 0 and 30, set the time to the next half hour
        if (today.getMinutes() > 0 && today.getMinutes() <= 30) {
          currentDate.setHours(today.getHours());
          currentDate.setMinutes(30); // Set to the next half hour
        }
        // If current minutes are greater than 30, set the time to the next full hour
        else if (today.getMinutes() > 30) {
          currentDate.setHours(today.getHours() + 1);
          currentDate.setMinutes(0); // Set to the next full hour
        } 
      } else {
        // For all other days, start at 10:00 AM
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          doc.slots_booked[slotDate] &&
          doc.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const findDoc = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDoc(docInfo);
  };
  useEffect(() => {
    findDoc();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlot();
  }, [doc]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const response = await axios.post(
        backendUrl + "api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    doc && (
      <div>
        {/* Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Image */}
          <div>
            <img
              src={doc.image}
              alt=""
              className="bg-primary w-full sm:max-w-72 rounded-lg"
            />
          </div>
          {/* Name , Experience */}
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
              {doc.name}{" "}
              <img
                src={assets.verified_icon}
                className="w-4"
                alt="verified-icon"
              />
            </p>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-gray-800 text-md">
                {doc.degree} - {doc.speciality}
              </p>
              <button className="px-2 rounded-full border border-gray-500 text-black">
                {doc.experience}
              </button>
            </div>
            {/* Description */}
            <div>
              <p className="flex items-center gap-2 mt-5 text-gray-800 text-lg font-medium ">
                About <img src={assets.info_icon} className="w-4" />
              </p>
              <p className="mt-1 text-sm leading-5 text-gray-500 max-w-[-70%]">
                {doc.about}
              </p>
            </div>
            {/* fee */}
            <div className="mt-5">
              <p className="text-sm">
                Appointment Fee: <span>{doc.fees}$</span>
              </p>
            </div>
          </div>
        </div>
        {/* Booking */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-600">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((slot, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                >
                  <p>{slot[0] && daysOfWeek[slot[0].dateTime.getDay()]}</p>
                  <p>{slot[0] && slot[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 overflow-x-scroll w-full mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((slot, index) => (
                <p
                  onClick={() => setSlotTime(slot.time)}
                  className={`text-sm font-light flex-shrink-0 cursor-pointer px-5 py-2 rounded-full ${
                    slot.time === slotTime
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  {slot.time.toLowerCase()}
                </p>
              ))}
          </div>
          <div>
            <button
              className="bg-primary text-white px-10 py-2 rounded-full mt-5 font-light"
              onClick={bookAppointment}
            >
              Book appointment
            </button>
          </div>
        </div>
        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={doc.speciality} />
      </div>
    )
  );
};

export default Appointment;
