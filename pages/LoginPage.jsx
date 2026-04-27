import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../src/components/config/Index";

function Login() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await request.post("/auth/login", formData);

      const token = res.data.token;
      const user = res.data.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful");

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

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-[140px] pb-10">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#013040] mb-6">Login</h1>

        <form onSubmit={handleSubmit}>
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
              className="border p-3 rounded-xl w-full"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-3 rounded-xl w-full"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0E91A5] text-white py-3 rounded-xl font-semibold disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Login;
