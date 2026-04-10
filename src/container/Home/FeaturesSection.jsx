import React from "react";
import Container from "../../components/Container";
import {
  FaUserMd,
  FaMapMarkedAlt,
  FaRobot,
  FaCalendarAlt,
  FaLock,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserMd className="text-3xl text-[#0E91A5]" />,
    title: "Smart Doctor Matching",
    desc: "Connects patients with the most suitable specialists in seconds.",
  },
  {
    icon: <FaMapMarkedAlt className="text-3xl text-[#0E91A5]" />,
    title: "Clinic Navigation",
    desc: "Guides users to nearby clinics with maps and route details.",
  },
  {
    icon: <FaRobot className="text-3xl text-[#0E91A5]" />,
    title: "24/7 AI Assistant",
    desc: "Answers medical questions anytime through intelligent chat.",
  },
  {
    icon: <FaCalendarAlt className="text-3xl text-[#0E91A5]" />,
    title: "Appointment Scheduling",
    desc: "Patients can book appointments online without calls.",
  },
  {
    icon: <FaLock className="text-3xl text-[#0E91A5]" />,
    title: "Secure & Compliant",
    desc: "All data is protected with top-grade security standards.",
  },
  {
    icon: <FaChartLine className="text-3xl text-[#0E91A5]" />,
    title: "Health Insights & Reports",
    desc: "Get real-time analytics and patient insights to improve clinical decisions and care outcomes.",
  },
];

function FeaturesSection() {
  return (
    <div className="bg-[#F5F5F5]">
      <Container>
        <div className="pt-[96px] text-center flex flex-col items-center justify-center  pb-[64px]">
          <h1 className="text-[#0E91A5] text-[16px] font-semibold border-b-2 border-[#0E91A5] max-w-fit">
            Features
          </h1>

          <h1 className="text-[40px] font-semibold max-w-[768px] ">
            Discover the Future of Healthcare with AIDoctor
          </h1>
          <p className="text-[16px] font-normal max-w-[768px] text-gray-600 mt-[10px]">
            Experience the AI-powered assistant trusted by clinics and patients
            to simplify healthcare. From finding the right doctor to booking
            appointments, AIDoctor automates over 70% of routine
            interactions—saving time, reducing wait, and delivering care faster
            than ever.
          </p>
        </div>
        <div className="mx-[32px] grid grid-cols-3 gap-[32px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center px-[20px] py-[35px] bg-white rounded-xl shadow-md"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#0E91A5] flex justify-center items-center shadow-md shadow-[#0E91A5] mb-[20px]">
                {feature.icon}
              </div>
              <h1 className="text-center text-[20px] font-bold mb-[10px]">
                {feature.title}
              </h1>
              <p className="text-center text-[14px] font-normal text-gray-600">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default FeaturesSection;
