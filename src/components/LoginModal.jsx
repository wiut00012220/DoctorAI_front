import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import request from "../../src/components/config/Index";

function LoginModal({ setOpenLoginModal, setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await request.post("/auth/login", formData);

      const token = res.data.token;
      const user = res.data.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setOpenLoginModal(false);

      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "doctor") {
        navigate("/doctor");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePatientSignup = () => {
    setOpenLoginModal(false);
    navigate("/signup/patient");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 relative">
        <button
          onClick={() => setOpenLoginModal(false)}
          className="absolute right-4 top-4 text-black"
        >
          <RxCross1 size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#013040] mb-2">
          Login
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your account or create a patient account
        </p>

        <form onSubmit={handleLogin}>
          <fieldset
            disabled={isLoading}
            className="space-y-4 disabled:opacity-70"
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full text-black"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full text-black"
            />

            <button
              type="submit"
              className="w-full bg-[#0E91A5] text-white py-3 rounded-xl font-semibold disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={handlePatientSignup}
              className="w-full border-2 border-[#0E91A5] text-[#0E91A5] py-3 rounded-xl font-semibold hover:bg-[#0E91A5] hover:text-white"
            >
              Sign up as Patient
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
