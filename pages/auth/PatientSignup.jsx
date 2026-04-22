import React, { useState } from "react";
import request from "../../src/components/config/Index";

function PatientSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    age: "",
    email: "",
    password: "",
    passwordConfirm: "",
    photo: "",
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

    const payload = {
      ...formData,
      age: Number(formData.age),
    };

    setIsLoading(true);
    try {
      const res = await request.post("/auth/signup/patient", payload);
      console.log(res.data);
      alert("Patient signup successful");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-[140px] pb-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#013040] mb-6">
          Patient Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
          <input
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />

          <select
            name="gender"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
          <input
            name="passwordConfirm"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            className="border p-3 rounded-xl"
          />
          <input
            name="photo"
            placeholder="Photo URL"
            onChange={handleChange}
            className="border p-3 rounded-xl col-span-2"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="col-span-2 bg-[#0E91A5] text-white py-3 rounded-xl font-semibold"
          >
            {isLoading ? "Submitting..." : "Create Patient Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PatientSignup;
