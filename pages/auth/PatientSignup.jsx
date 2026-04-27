import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../src/components/config/Index";
import { uploadFileToFirebase } from "../../src/utils/uploadToFirebase";

function PatientSignup() {
  const navigate = useNavigate();
  const photoInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    age: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const photoPreview = useMemo(() => {
    return photoFile ? URL.createObjectURL(photoFile) : "";
  }, [photoFile]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let photoURL = "";

      if (photoFile) {
        photoURL = await uploadFileToFirebase(photoFile, "patients/profile");
      }

      const payload = {
        ...formData,
        age: Number(formData.age),
        photo: photoURL,
      };

      await request.post("/auth/signup/patient", payload);

      alert("Patient account created successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-[140px] pb-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#013040] mb-6">
          Patient Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <fieldset
            disabled={isLoading}
            className="grid grid-cols-2 gap-4 disabled:opacity-70"
          >
            <div className="col-span-2 flex flex-col items-center">
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#0E91A5]/20 bg-gray-100 flex items-center justify-center shadow-sm"
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Patient preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-400 text-center px-3">
                    Upload photo
                  </span>
                )}
              </button>

              <p className="text-sm text-gray-500 mt-3">
                Click photo to upload
              </p>
            </div>

            <input
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <select
              name="gender"
              value={formData.gender}
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
              value={formData.age}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="passwordConfirm"
              type="password"
              placeholder="Confirm password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="col-span-2 bg-[#0E91A5] text-white py-3 rounded-xl font-semibold disabled:opacity-70"
            >
              {isLoading ? "Creating account..." : "Create Patient Account"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PatientSignup;
