import React, { useRef, useState } from "react";
import Container from "../../components/Container";
import { BiMinus, BiPlus } from "react-icons/bi";

const faqs = [
  {
    index: 1,
    question: "How does the AI assistant help me find the right doctor?",
    answer:
      "Our AI assistant analyzes your symptoms and matches you with the most suitable doctor based on specialty, experience, and patient reviews.",
  },
  {
    index: 2,
    question: "Can I book an appointment directly through the platform?",
    answer:
      "Yes, once a doctor is recommended, you can book an available time slot directly from the platform.",
  },
  {
    index: 3,
    question: "Is my personal health data safe and secure?",
    answer:
      "Absolutely. We use advanced encryption and comply with international healthcare data protection standards to keep your information secure.",
  },
  {
    index: 4,
    question:
      "How accurate are the doctor recommendations from the AI assistant?",
    answer:
      "Our AI is trained on verified medical datasets and improves over time using real user feedback to provide highly accurate doctor matches.",
  },
  {
    index: 5,
    question: "Can I search for doctors based on my symptoms?",
    answer:
      "Yes. You can enter your symptoms, and the AI will suggest doctors or medical specialties that best fit your condition.",
  },
  {
    index: 6,
    question: "What if no doctor is available for my condition?",
    answer:
      "If no exact match is found, the assistant will recommend the closest relevant specialist or clinic to ensure you get help quickly.",
  },
  {
    index: 7,
    question: "How do I know the ratings and reviews are trustworthy?",
    answer:
      "All reviews come from verified patients who have used our platform. We also use AI moderation to prevent fake or misleading feedback.",
  },
  {
    index: 8,
    question: "Is this service available 24/7?",
    answer:
      "Yes, our AI assistant is available anytime to help you with medical queries, find doctors, or book appointments — day or night.",
  },
  {
    index: 9,
    question:
      "Can I get recommendations for clinics as well, not just doctors?",
    answer:
      "Of course. Our system can suggest clinics near you that are best suited for your health needs, in addition to individual doctors.",
  },
  {
    index: 10,
    question: "Do I need to create an account to use the AI assistant?",
    answer:
      "No account is required for basic recommendations. However, to book appointments or access saved history, registration is needed.",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef([]);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="py-[96px] bg-[#F5F5F5]">
      <Container>
        <div className=" text-center flex flex-col items-center justify-center  pb-[64px]">
          <h1 className="text-[#0E91A5] text-[16px] font-semibold border-b-2 border-[#0E91A5] max-w-fit">
            FAQs
          </h1>

          <h1 className="text-[40px] font-semibold max-w-[768px] ">
            Have Questions?
          </h1>
          <p className="text-[16px] font-normal max-w-[768px] text-gray-600 mt-[10px]">
            Our FAQ section answers everything you need to know about using our
            Doctor AI Assistant — from finding the right doctor and booking
            appointments to how our AI provides guidance and support. Get clear,
            helpful answers to ensure your experience is smooth, secure, and
            fully personalized.
          </p>
        </div>
        <div className="mx-[142px]">
          <div className="columns-1 md:columns-2 gap-4 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="break-inside-avoid bg-white p-[32px] rounded-2xl shadow-md"
                >
                  <div className="flex  justify-between   items-start">
                    <h1 className="text-[22px] font-medium text-neutral-800">
                      {faq.question}
                    </h1>
                    <button
                      className={`transition-all duration-300 ${
                        isOpen
                          ? "bg-[#0E91A5] p-1.5 rounded-[5px] shadow-md"
                          : "bg-[#F7F7FF] p-1.5 rounded-[5px] shadow-md"
                      }`}
                      onClick={() => handleToggle(index)}
                    >
                      {isOpen ? <BiMinus color="white" /> : <BiPlus />}
                    </button>
                  </div>

                  <div
                    ref={(el) => (ref.current[index] = el)}
                    style={{
                      height: isOpen
                        ? ref.current[index]?.scrollHeight + "px"
                        : "0px",
                      overflow: "hidden",
                      transition: "height 0.5s ease",
                    }}
                  >
                    <div className="">
                      <h1 className="text-[14px] text-neutral-600 font-normal">
                        {faq.answer}
                      </h1>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default FaqSection;
