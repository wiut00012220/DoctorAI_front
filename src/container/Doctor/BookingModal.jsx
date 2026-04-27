import React, { useState } from "react";
import request from "../../components/config/Index";

export function Modal({ selectedDoctor, setOpenModal }) {
  const [formData, setFormData] = useState({
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    consultationType: "offline",
    patientNote: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first to book consultation.");
      return;
    }

    try {
      setLoading(true);

      await request.post(
        "/appointments",
        {
          doctor: selectedDoctor._id,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          reason: formData.reason,
          consultationType: formData.consultationType,
          patientNote: formData.patientNote,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessage("Appointment booked successfully!");

      setTimeout(() => {
        setOpenModal(false);
      }, 1200);
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white w-[450px] rounded-xl p-6 relative">
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-3 right-4 text-2xl"
        >
          ×
        </button>

        <h1 className="text-2xl font-bold mb-2 text-[#0E91A5]">
          Book Consultation
        </h1>

        <p className="mb-5 font-semibold">
          Dr. {selectedDoctor?.firstName} {selectedDoctor?.lastName}
        </p>

        <form onSubmit={handleBookAppointment} className="space-y-4">
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md"
          />

          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md"
          />

          <select
            name="consultationType"
            value={formData.consultationType}
            onChange={handleChange}
            className="w-full border p-3 rounded-md"
          >
            <option value="offline">Offline</option>
            <option value="online">Online</option>
          </select>

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            placeholder="Reason for appointment"
            className="w-full border p-3 rounded-md h-24"
          />

          <textarea
            name="patientNote"
            value={formData.patientNote}
            onChange={handleChange}
            placeholder="Additional note"
            className="w-full border p-3 rounded-md h-20"
          />

          {message && (
            <p className="text-sm font-semibold text-[#0E91A5]">{message}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-[#0E91A5] text-white py-3 rounded-md disabled:opacity-60"
          >
            {loading ? "Booking..." : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}
