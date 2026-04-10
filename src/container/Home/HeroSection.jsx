import React, { useState } from "react";
import Container from "../../components/Container";
import Lottie from "lottie-react";
import robotAnimation from "../../assets/BOTAni.json";
import chattingAnimation from "../../assets/Chatting.json";
import arrow from "../../assets/arrow.json";
import request from "../../components/config/Index";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../../assets/Animation/AILoading.json";

function HeroSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    try {
      const res1 = await request.post(
        "/ai/descripbe_your_symptoms/",
        { text: input },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN":
              "059zpA0A28qsMjsurfDuEV8AFTm8SJy1wJteNLLYs3GK5cGQ7NAeOaV4QMWjRjLv",
          },
        }
      );

      const fullSpecialist = res1.data.specialist?.[0] || "";
      const specialist = fullSpecialist.split(/[\/ (]/)[0];

      console.log(specialist);

      const res2 = await request.post(
        "/ai/find_doctors_and_clinics/",
        { text: specialist },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN":
              "059zpA0A28qsMjsurfDuEV8AFTm8SJy1wJteNLLYs3GK5cGQ7NAeOaV4QMWjRjLv",
          },
        }
      );

      const aiMessage = {
        role: "ai",
        text: res1.data.ai,
        doctors: res2.data.doctors.slice(0, 3),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, something went wrong. Try again." },
      ]);
    }

    setInput("");
  };

  console.log(messages);
  console.log(result);

  return (
    <div className="bg-[url(/banner.svg)] w-full h-auto bg-cover bg-no-repeat">
      <Container>
        <div className="flex flex-col items-center">
          <div className="pt-[150px] text-white text-center">
            <h1 className="text-[74px] font-bold ">
              Find the Right Care-Guided by Smart Technology
            </h1>
            <p className="text-[20px] font-normal">
              Your AI health assistant connects you with the right doctor or
              clinic — instantly, reliably, and personally.
            </p>
          </div>
          <div className="relative h-[470px] w-[50%] bg-center bg-cover bg-no-repeat flex flex-col justify-between gap-3">
            {/* <Lottie
              animationData={robotAnimation}
              loop
              autoplay
              className={`absolute inset-0 w-full h-full z-0 transition-all duration-1500 ${
                messages.length !== 0 ? "rotate-45 left-90" : ""
              }`}
            /> */}
            <Lottie
              animationData={robotAnimation}
              loop
              autoplay
              className={`absolute inset-0 w-full h-full z-0 transition-all duration-1500 ${
                messages.length !== 0 ? "hidden" : ""
              }`}
            />

            <Lottie
              animationData={chattingAnimation}
              loop
              autoplay
              className={`absolute inset-0 w-[80%] h-[80%] top-5 z-0   md:left-130 transition-all duration-1500 ${
                messages.length !== 0 ? "" : "hidden"
              }`}
            />

            <div
              className={`w-full bg-[#0E91A5]/40 backdrop-blur-md h-[100%] mt-10 border-2 border-[#0E91A5] transition-all duration-300 overflow-auto ${
                messages.length === 0 ? "invisible" : ""
              }`}
            >
              <div className="p-3">
                {messages.map((msg, index) => (
                  <div>
                    <div
                      key={index}
                      className={` mb-2 p-2 rounded-lg max-w-[50%] ${
                        msg.role === "user"
                          ? "bg-black text-white self-end ml-auto"
                          : "bg-[#0E91A5] text-white self-start mr-auto"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {isLoading === true ? (
                      <Lottie
                        animationData={Loading}
                        loop
                        autoplay
                        className="h-[50%] w-[50%]"
                      />
                    ) : (
                      <div>
                        {msg.role === "ai" && msg?.doctors?.length !== 0 && (
                          <div>
                            <Link
                              to={`/listDoc/${
                                msg.doctors[0]?.category?.id
                              }?name=${encodeURIComponent(
                                msg.doctors[0]?.category?.name
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
                            {msg.doctors?.map((doc) => (
                              <div className="bg-white flex rounded-[10px] p-2 gap-4 mb-2">
                                <div className="flex flex-col  items-center">
                                  <div className="w-15 h-15 rounded-full border-2 border-[#0E91A5] shadow-md shadow-[#0E91A5]">
                                    <img
                                      src={`https://backend.xorazmfc.uz${doc.photo}`}
                                      alt="doctor"
                                      className="object-cover h-full w-full  rounded-full"
                                    />
                                  </div>
                                  <div className="flex gap-2 items-center mt-1">
                                    <h1 className=" font-medium text-[12px] text-black">
                                      {doc.rating}
                                    </h1>
                                    <FaStar
                                      color="#0E91A5"
                                      className="h-3 w-3"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <h1 className="font-medium text-[16px] ">
                                    {doc.last_name} {doc.first_name}{" "}
                                    {doc.middle_name}
                                  </h1>
                                  <div className="flex gap-4 text-neutral-600 font-regular text-[14px] mb-2">
                                    <p>{doc.specialties}</p>
                                  </div>
                                  <h1 className="text-[14px] mb-2 font-regular">
                                    Experience: {doc.experience_years} years
                                  </h1>
                                  <h1 className="text-[14px] font-medium">
                                    Appointment at the clinic
                                  </h1>
                                  <p className="text-red-800 text-[13px]">
                                    {doc.initial_consultation_price} so'm
                                  </p>
                                </div>
                                <div className="ml-2">
                                  <div className="flex justify-start gap-2">
                                    <img
                                      src={`https://backend.xorazmfc.uz${doc.clinic.image}`}
                                      alt=""
                                      className="h-5 w-5"
                                    />
                                    <h1 className="text-black text-[16px] font-bold">
                                      {doc.clinic.name}
                                    </h1>
                                  </div>
                                  <div className="flex justify-start gap-2 items-center mb-2">
                                    <img
                                      src="/Departure.svg"
                                      alt=""
                                      className="h-4 w-4"
                                    />
                                    <h1 className="text-[14px]">
                                      {doc.clinic.address}
                                    </h1>
                                  </div>
                                  <div className="">
                                    <p className="text-[14px] font-bold">
                                      Doctor's appointment time
                                    </p>
                                    <h1 className="text-[14px] font-bold text-[#0E91A5]">
                                      {doc.clinic.working_days},
                                      {doc.clinic.working_hours}
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-4 items-center  bg-[#0E91A5]/20 backdrop-blur-md px-2 pt-2 pb-8 rounded-t-2xl">
              <input
                type="text"
                placeholder="Try it out!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="py-2 px-4 w-full text-white bg-black   outline-none border-3 border-[#0E91A5] focus:border-3 focus:shadow-md focus:shadow-[#0E91A5] focus:border-[#0E91A5]/90 rounded-full "
              />
              <button
                onClick={handleSubmit}
                className=" bg-[#0E91A5] px-2 py-3 rounded-full text-white font-bold whitespace-nowrap"
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
