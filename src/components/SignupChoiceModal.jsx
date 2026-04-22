import React from "react";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

function SignupChoiceModal({ setOpenSignupChoice }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 relative">
        <button
          onClick={() => setOpenSignupChoice(false)}
          className="absolute right-4 top-4 text-black"
        >
          <RxCross1 size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#013040] mb-2">
          Choose account type
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Please select how you want to continue
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              setOpenSignupChoice(false);
              navigate("/signup/doctor");
            }}
            className="w-full bg-[#0E91A5] text-white py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Continue as Doctor
          </button>

          <button
            onClick={() => {
              setOpenSignupChoice(false);
              navigate("/signup/patient");
            }}
            className="w-full border-2 border-[#0E91A5] text-[#0E91A5] py-3 rounded-xl font-semibold hover:bg-[#0E91A5] hover:text-white"
          >
            Continue as Patient
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupChoiceModal;
