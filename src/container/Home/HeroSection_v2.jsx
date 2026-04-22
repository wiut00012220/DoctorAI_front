import React, { useState } from "react";
import Container from "../../components/Container";
import Lottie from "lottie-react";
import robotAnimation from "../../assets/BOTAni.json";
import arrow from "../../assets/arrow.json";
import request from "../../components/config/Index";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../assets/Animation/AILoading.json";

function HeroSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await request.post("/ai/analyze-symptoms", {
        symptoms: input,
        location: "Tashkent",
      });

      const analysis = res?.data?.data?.analysis;
      const doctors = res?.data?.data?.recommendedDoctors || [];

      const aiText = `
Summary: ${analysis?.summary || "No summary"}

Recommended specialist: ${analysis?.recommendedSpecialization || "Unknown"}

Urgency: ${analysis?.urgencyLevel || "Unknown"}

Advice: ${analysis?.advice || "No advice available"}
      `.trim();

      const aiMessage = {
        role: "ai",
        text: aiText,
        analysis,
        doctors,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, something went wrong. Try again.",
          doctors: [],
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <div className="bg-[url(/banner.svg)] w-full h-auto bg-cover bg-no-repeat">
      <Container>
        <div className="flex flex-row items-center gap-4 py-[100px]">
          <div className="text-white">
            <h1 className="text-[60px] font-bold">
              Find the Right Care-Guided by Smart Technology
            </h1>
            <p className="text-[16px] font-normal w-[80%]">
              Your AI health assistant connects you with the right doctor or
              clinic — instantly, reliably, and personally.
            </p>
          </div>

          <div className="relative h-[550px] w-full bg-center bg-cover bg-no-repeat flex flex-col justify-between gap-3">
            <Lottie
              animationData={robotAnimation}
              loop
              autoplay
              className={`absolute inset-0 w-full h-full z-0 transition-all duration-1500 ${
                messages.length !== 0 ? "hidden" : ""
              }`}
            />

            <div
              className={`w-full bg-[#0E91A5]/40 backdrop-blur-md h-[100%] mt-10 border-2 border-[#0E91A5] transition-all duration-300 overflow-auto ${
                messages.length === 0 ? "invisible" : ""
              }`}
            >
              <div className="p-3 space-y-3">
                {messages.map((msg, index) => (
                  <div key={index}>
                    <div
                      className={`mb-2 p-3 rounded-lg max-w-[70%] whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-black text-white ml-auto"
                          : "bg-[#0E91A5] text-white mr-auto"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.role === "ai" && msg.analysis && (
                      <div className="mb-3 bg-white rounded-[10px] p-3">
                        <h2 className="text-[#0E91A5] font-bold text-[16px] mb-2">
                          AI Analysis
                        </h2>

                        <p className="text-[14px] text-black mb-2">
                          <span className="font-semibold">Specialist:</span>{" "}
                          {msg.analysis.recommendedSpecialization}
                        </p>

                        <p className="text-[14px] text-black mb-2">
                          <span className="font-semibold">Urgency:</span>{" "}
                          {msg.analysis.urgencyLevel}
                        </p>

                        <p className="text-[14px] text-black mb-2">
                          <span className="font-semibold">Emergency:</span>{" "}
                          {msg.analysis.emergencyWarning ? "Yes" : "No"}
                        </p>

                        {msg.analysis.possibleConditions?.length > 0 && (
                          <div className="mb-2">
                            <p className="font-semibold text-black text-[14px]">
                              Possible conditions:
                            </p>
                            <ul className="list-disc pl-5 text-[14px] text-gray-700">
                              {msg.analysis.possibleConditions.map(
                                (condition, i) => (
                                  <li key={i}>{condition}</li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {msg.role === "ai" && msg.doctors?.length > 0 && (
                      <div>
                        <Link
                          to={`/listDoc/${
                            msg.doctors[0]?._id
                          }?name=${encodeURIComponent(
                            msg.analysis?.recommendedSpecialization || "",
                          )}`}
                          className="flex items-center justify-end"
                        >
                          <h1 className="text-white text-[16px] underline">
                            See more
                          </h1>
                          <Lottie
                            animationData={arrow}
                            loop
                            autoplay
                            className="h-[8%] w-[8%]"
                          />
                        </Link>

                        {msg.doctors.slice(0, 3).map((doc) => (
                          <div
                            key={doc._id}
                            className="bg-white flex rounded-[10px] p-3 gap-4 mb-2"
                          >
                            <div className="flex flex-col items-center">
                              <div className="w-15 h-15 rounded-full border-2 border-[#0E91A5] shadow-md shadow-[#0E91A5] overflow-hidden">
                                <img
                                  src={doc.photo || "/doctor-placeholder.jpg"}
                                  alt={doc.firstName}
                                  className="object-cover h-full w-full rounded-full"
                                />
                              </div>

                              <div className="flex gap-2 items-center mt-1">
                                <h1 className="font-medium text-[12px] text-black">
                                  {doc.ratingsAverage}
                                </h1>
                                <FaStar color="#0E91A5" className="h-3 w-3" />
                              </div>
                            </div>

                            <div className="flex-1">
                              <h1 className="font-medium text-[16px] text-black">
                                {doc.firstName} {doc.lastName}
                              </h1>

                              <div className="text-neutral-600 text-[14px] mb-1">
                                <p>{doc.specialization}</p>
                              </div>

                              <h1 className="text-[14px] mb-1 text-black">
                                Experience: {doc.experience} years
                              </h1>

                              <h1 className="text-[14px] font-medium text-black">
                                Consultation fee
                              </h1>

                              <p className="text-red-800 text-[13px]">
                                {doc.consultationFee?.toLocaleString()}{" "}
                                so&apos;m
                              </p>
                            </div>

                            <div className="ml-2">
                              <h1 className="text-black text-[16px] font-bold">
                                {doc.clinicName}
                              </h1>

                              <div className="flex justify-start gap-2 items-center mb-2">
                                <img
                                  src="/Departure.svg"
                                  alt=""
                                  className="h-4 w-4"
                                />
                                <h1 className="text-[14px] text-black">
                                  {doc.location}
                                </h1>
                              </div>

                              <div>
                                <p className="text-[14px] font-bold text-black">
                                  Consultation type
                                </p>
                                <h1 className="text-[14px] font-bold text-[#0E91A5]">
                                  {doc.consultationType}
                                </h1>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <Lottie
                    animationData={Loading}
                    loop
                    autoplay
                    className="h-[50%] w-[50%]"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4 items-center bg-[#0E91A5]/20 backdrop-blur-md px-2 pt-2 pb-8 rounded-2xl">
              <input
                type="text"
                placeholder="Describe your symptoms..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="py-2 px-4 w-full text-white bg-black outline-none border-3 border-[#0E91A5] focus:shadow-md focus:shadow-[#0E91A5] focus:border-[#0E91A5]/90 rounded-full"
              />
              <button
                onClick={handleSubmit}
                className="bg-[#0E91A5] px-2 py-3 rounded-full text-white font-bold whitespace-nowrap"
              >
                Find Doctor
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HeroSection;
