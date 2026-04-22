import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import request from "../../src/components/config/Index";
import { uploadFileToFirebase } from "../../src/utils/uploadToFirebase";

function DoctorSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    age: "",
    email: "",
    password: "",
    passwordConfirm: "",
    specialization: "",
    certificateNumber: "",
    experience: "",
    clinicName: "",
    location: "Tashkent",
    consultationFee: "",
    bio: "",
    languages: "",
    consultationType: "",
    availableDays: [],
    availableTime: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const photoInputRef = useRef(null);

  const photoPreview = useMemo(() => {
    return photoFile ? URL.createObjectURL(photoFile) : "";
  }, [photoFile]);

  const certificatePreview = useMemo(() => {
    return certificateFile ? URL.createObjectURL(certificateFile) : "";
  }, [certificateFile]);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      if (certificatePreview) URL.revokeObjectURL(certificatePreview);
    };
  }, [photoPreview, certificatePreview]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "availableDays") {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          availableDays: [...prev.availableDays, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          availableDays: prev.availableDays.filter((day) => day !== value),
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
  };

  const handleCertificateChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCertificateFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      let photoURL = "";
      let certificateImageURL = "";

      if (photoFile) {
        photoURL = await uploadFileToFirebase(photoFile, "doctors/profile");
      }

      if (certificateFile) {
        certificateImageURL = await uploadFileToFirebase(
          certificateFile,
          "doctors/certificates",
        );
      }

      const payload = {
        ...formData,
        age: Number(formData.age),
        experience: Number(formData.experience),
        consultationFee: Number(formData.consultationFee),
        languages: formData.languages
          .split(",")
          .map((lang) => lang.trim())
          .filter(Boolean),
        photo: photoURL,
        certificateImage: certificateImageURL,
      };

      await request.post("/auth/signup/doctor", payload);

      alert("Doctor created successfully. Waiting for admin approval.");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const isCertificateImage = certificateFile?.type?.startsWith("image/");
  const isCertificatePdf = certificateFile?.type === "application/pdf";

  return (
    <div>
      <div className="bg-[#013040] h-[120px]" />

      <div className="h-auto bg-[#F5F5F5] py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-[#013040] mb-6">
            Doctor Sign Up
          </h1>

          <form onSubmit={handleSubmit}>
            <fieldset
              disabled={isLoading}
              className="grid grid-cols-2 gap-4 disabled:opacity-70"
            >
              <div className="col-span-2 flex flex-col items-center mb-2">
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
                  className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#0E91A5]/20 bg-gray-100 flex items-center justify-center shadow-sm cursor-pointer hover:opacity-90 transition"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400 text-center px-3">
                      Upload photo
                    </span>
                  )}
                </button>

                <p className="text-sm text-gray-500 mt-3">
                  Click the profile picture to choose an image
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

              <input
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="certificateNumber"
                placeholder="Certificate number"
                value={formData.certificateNumber}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <div className="col-span-2">
                <label className="block mb-2 font-medium">
                  Certificate file
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleCertificateChange}
                  className="border p-3 rounded-xl w-full"
                />
              </div>

              {certificateFile && (
                <div className="col-span-2 border rounded-2xl p-4 bg-gray-50">
                  <p className="font-medium text-[#013040] mb-3">
                    Certificate preview
                  </p>

                  {isCertificateImage && (
                    <img
                      src={certificatePreview}
                      alt="Certificate preview"
                      className="w-full max-h-[320px] object-contain rounded-xl border bg-white"
                    />
                  )}

                  {isCertificatePdf && (
                    <iframe
                      src={certificatePreview}
                      title="Certificate PDF preview"
                      className="w-full h-[400px] rounded-xl border bg-white"
                    />
                  )}

                  {!isCertificateImage && !isCertificatePdf && (
                    <div className="p-4 rounded-xl border bg-white">
                      <p className="text-sm text-gray-600">
                        Selected file:{" "}
                        <span className="font-medium">
                          {certificateFile.name}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              <input
                name="experience"
                type="number"
                placeholder="Experience (years)"
                value={formData.experience}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="clinicName"
                placeholder="Clinic name"
                value={formData.clinicName}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="consultationFee"
                type="number"
                placeholder="Consultation fee"
                value={formData.consultationFee}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="consultationType"
                placeholder="online / offline / both"
                value={formData.consultationType}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="availableTime"
                placeholder="09:00 - 17:00"
                value={formData.availableTime}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />
              <input
                name="languages"
                placeholder="Uzbek, Russian"
                value={formData.languages}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <textarea
                name="bio"
                placeholder="Doctor bio"
                value={formData.bio}
                onChange={handleChange}
                className="border p-3 rounded-xl col-span-2 min-h-[120px]"
              />

              <div className="col-span-2">
                <p className="font-semibold mb-2">Available days</p>
                <div className="flex flex-wrap gap-4">
                  {weekDays.map((day) => (
                    <label key={day} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="availableDays"
                        value={day}
                        checked={formData.availableDays.includes(day)}
                        onChange={handleChange}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="col-span-2 bg-[#0E91A5] text-white py-3 rounded-xl font-semibold disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Creating account..." : "Create Doctor Account"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorSignup;
