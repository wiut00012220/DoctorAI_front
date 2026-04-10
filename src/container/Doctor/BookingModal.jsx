import { RxCross1 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import request from "../../components/config/Index";

export const Modal = ({ setOpenModal, selectedDoctor }) => {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    doctor: selectedDoctor.id,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const BookAppointment = async (e) => {
    e.preventDefault();
    try {
      const res = await request.post("/shared/consulation/create/", form);
      console.log(res.data);
      setOpenModal(false); // Optional: close modal on success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-50 fixed inset-0 bg-black/90 flex items-center justify-center">
      <form
        onSubmit={BookAppointment}
        className="bg-white p-6 rounded shadow-lg w-[700px]"
      >
        <div className="flex flex-row items-center justify-between border-b pb-2">
          <h2 className="text-xl font-bold">Register online</h2>
          <button
            onClick={() => setOpenModal(false)}
            type="button"
            className="bg-[#0E91A5] p-2 rounded-[4px]"
          >
            <RxCross1 size={15} color="white" />
          </button>
        </div>

        <div className="flex flex-row gap-10 my-4 bg-[#0E91A5]/15 rounded-2xl p-4">
          <div>
            <div className="w-32 h-32 rounded-full border-4 border-[#0E91A5] shadow-md shadow-[#0E91A5]">
              <img
                src={`https://backend.xorazmfc.uz${selectedDoctor.photo}`}
                alt="doctor"
                className="object-cover h-full w-full rounded-full"
              />
            </div>
            <div className="flex gap-2 items-center mt-4">
              <h1 className="font-semibold text-[14px] text-black">
                Rating: {selectedDoctor.rating}
              </h1>
              <FaStar color="#0E91A5" className="h-5 w-5" />
            </div>
          </div>

          <div>
            <h1 className="font-bold text-[20px]">
              {selectedDoctor.last_name} {selectedDoctor.first_name}{" "}
              {selectedDoctor.middle_name}
            </h1>
            <div className="text-neutral-600 text-[18px] mb-2">
              <p>{selectedDoctor.specialties}</p>
            </div>
            <h1 className="text-[16px] mb-2">
              Experience: {selectedDoctor.experience_years}
            </h1>
            <div className="flex justify-start gap-2 items-center">
              <img src="/Clinic.svg" alt="" className="h-8 w-8" />
              <h1 className="text-[16px] ">{selectedDoctor.clinic.name}</h1>
            </div>
            <h1 className="font-semibold">Appointment at the clinic</h1>
            <p className="text-red-800 text-[16px]">
              {selectedDoctor.initial_consultation_price}
            </p>
          </div>
        </div>

        <div className="space-y-3 mt-[10px]">
          <div>
            <label htmlFor="full_name" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="px-3 py-2 border-2 border-[#0E91A5] w-full rounded-[5px] outline-none focus:shadow-md focus:shadow-[#0E91A5] transition-all duration-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="px-3 py-2 border-2 border-[#0E91A5] w-full rounded-[5px] outline-none focus:shadow-md focus:shadow-[#0E91A5] transition-all duration-500"
            />
          </div>
        </div>

        <div className="float-end">
          <button
            type="submit"
            className="bg-[#0E91A5] px-3 py-2 text-white font-medium text-[16px] rounded-[5px] mt-[15px] hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-[#0E91A5]"
          >
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
};
