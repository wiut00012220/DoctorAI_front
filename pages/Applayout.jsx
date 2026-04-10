import React, { useState } from "react";
import Navbar from "../src/components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../src/components/Footer";
import { RxCross1 } from "react-icons/rx";

function Applayout() {
  const [openModal, setOpenModal] = useState(false);
  const [openClinicModal, setOpenClinicModal] = useState(false);

  return (
    <div className="relative">
      <Navbar
        setOpenModal={setOpenModal}
        setOpenClinicModal={setOpenClinicModal}
      />
      <Outlet />
      <Footer />
      {openModal && <Modal setOpenModal={setOpenModal} />}
      {openClinicModal && (
        <ClinicModal setOpenClinicModal={setOpenClinicModal} />
      )}
    </div>
  );
}

const Modal = ({ setOpenModal }) => {
  return (
    <div className="z-50 fixed inset-0 bg-black/90 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg ">
        <div className="flex flex-row  items-center justify-between border-b-1 border-[#0E91A5] pb-2">
          <h2 className="text-xl font-bold ">Login</h2>
          <button
            onClick={() => setOpenModal(false)}
            className=" bg-[#0E91A5] p-2 rounded-[4px]"
          >
            <RxCross1 size={15} color="white" />
          </button>
        </div>
        <div className="space-y-3 mt-[10px]">
          <div>
            <label htmlFor="" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="px-3 py-2 border-2 border-[#0E91A5] w-full rounded-[5px] outline-none  focus:shadow-md focus:shadow-[#0E91A5] transition-all duration-500"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="px-3 py-2 border-2 border-[#0E91A5] w-full rounded-[5px] outline-none focus:shadow-md focus:shadow-[#0E91A5] transition-all duration-500"
            />
          </div>
        </div>
        <div className="float-end">
          <button className="bg-[#0E91A5] px-3 py-2 text-white font-medium text-[16px] rounded-[5px] mt-[15px] hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-[#0E91A5]">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const ClinicModal = ({ setOpenClinicModal }) => {
  return (
    <div className="z-50 fixed inset-0 bg-black/90 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg ">
        <div className="flex flex-row  items-center justify-between border-b-1 border-[#0E91A5] pb-2">
          <h2 className="text-xl font-bold ">Login</h2>
          <button
            onClick={() => setOpenClinicModal(false)}
            className=" bg-[#0E91A5] p-2 rounded-[4px]"
          >
            <RxCross1 size={15} color="white" />
          </button>
        </div>
        <div className="space-y-3 mt-[10px]">
          <div>
            <label htmlFor="" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="px-3 py-2 border-2 border-[#0E91A5] w-full rounded-[5px] outline-none  focus:shadow-md focus:shadow-[#0E91A5] transition-all duration-500"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="px-3 py-2 border-2 border-[#0E91A5] w-full rounded-[5px] outline-none focus:shadow-md focus:shadow-[#0E91A5] transition-all duration-500"
            />
          </div>
        </div>
        <div className="float-end">
          <button className="bg-[#0E91A5] px-3 py-2 text-white font-medium text-[16px] rounded-[5px] mt-[15px] hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-[#0E91A5]">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default Applayout;
