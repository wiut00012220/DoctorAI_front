import React, { useState } from "react";
import { BiHeart, BiStar } from "react-icons/bi";

function ClinicCard({ data }) {
  const [isPhone, setIsPhone] = useState(false);

  return (
    <div className="bg-white flex flex-row justify-start gap-10 mb-4 p-5 py-8 rounded-[10px] shadow-xl">
      <div className="w-fit relative">
        <div className="absolute  border-1 border-[#0d91a6] bg-white p-2 rounded-full top-[-10px] right-[-10px]">
          <BiHeart color="red" className="h-6 w-6" />
        </div>
        <div className="h-32 w-32  border-3 rounded-[10px] p-2 shadow-md shadow-[#0d91a6] border-[#0d91a6]">
          <img
            src={`${data.image}`}
            alt="doctor"
            className=" object-contain h-full w-full rounded-[10px]"
          />
        </div>
      </div>
      <div className="w-1/3  ">
        <h1 className="font-bold text-[20px]">{data.name}</h1>
        <div className="flex gap-4 text-gray-500 text-[14px] mb-2">
          <h1>{data.description}</h1>
        </div>
        <button className="bg-[#0d91a6] py-1 px-2 rounded-full text-white mt-4">
          Read more
        </button>
      </div>
      <div className="w-1/3">
        <div className="flex justify-start gap-2 items-center mb-2">
          <img src="/Departure.svg" alt="" className="h-8 w-8" />
          <h1 className="text-[14px]">{data.address}</h1>
        </div>

        <p className="text-[12px]">Doctor's appointment time at the clinic</p>
        <div className="flex justify-start gap-2 items-center">
          <img src="/Calendar.svg" alt="" className="7-6 w-7" />
          <div className="text-sm text-gray-700">
            <h1 className="text-[14px]">{data.workingHours}</h1>
          </div>
        </div>
        <div className="flex gap-10 mt-2">
          <button
            onClick={() => setIsPhone(true)}
            className="bg-[#0d91a6] text-white py-2 px-3 rounded-full "
          >
            {isPhone ? <h1>{data.phone}</h1> : <h1>Call +998...</h1>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClinicCard;
