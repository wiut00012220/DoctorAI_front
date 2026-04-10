import React, { useEffect, useState } from "react";

import { BsPhone, BsTelegram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { PiPlus } from "react-icons/pi";
import { BiMinus, BiMinusCircle, BiPlusCircle, BiSearch } from "react-icons/bi";
import { useParams } from "react-router-dom";
import request from "../../components/config/Index";
import { Modal } from "./BookingModal";
import Loading from "../../assets/Animation/loading.json";
import Lottie from "lottie-react";
import Container from "../../components/Container";

function DocDetail() {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const handleMenu = () => {
    return setOpenMenu((prev) => !prev);
  };

  const [data, setData] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    try {
      let res = await request.get(`/doctors/doctor/${id}`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div>
      <div className="flex justify-center items-center bg-[#013040] pt-[130px] gap-2 pb-[20px]"></div>
      <Container>
        {isLoading === true ? (
          <div className="flex justify-center items-center">
            <Lottie
              animationData={Loading}
              loop
              autoplay
              className="h-[40%] w-[40%]"
            />
          </div>
        ) : (
          <div className="my-10">
            <div className="flex gap-4 ">
              <div className="max-w-[270px]">
                <div>
                  <img
                    src={`https://backend.xorazmfc.uz${data.photo}`}
                    alt=""
                    className="w-[270px] h-[350px] object-cover rounded-[20px] border-[10px] border-[#0E91A5] shadow-md shadow-[#0E91A5]"
                  />
                </div>
                <div className="w-full rounded-[20px] shadow-md shadow-[#0E91A5] p-4 mt-4 border-1 border-[#0E91A5] ">
                  <h1 className="mb-2">Contact info:</h1>
                  <div className="flex gap-2 mb-3">
                    <img src="/Clinic.svg" alt="" className="h-8 w-8" />
                    <h1 className="text-[14px] font-bold">
                      {data?.clinic?.name}
                    </h1>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <img src="/Departure.svg" alt="" className="h-8 w-8" />
                    <h1 className="text-[12px] text-gray-600">
                      {data?.clinic?.address}
                    </h1>
                  </div>
                  <div className="flex gap-3 items-center mb-3">
                    <BsPhone className="w-6 h-6" color="#0E91A5" />
                    <p className="text-[16px] text-gray-600">
                      {data.phone_number}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <BsTelegram className="w-6 h-6" color="#0E91A5" />
                    <p className="text-[16px] text-gray-600">
                      {data.telegram_url}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="rounded-[20px] w-full p-5 border-1 border-[#0E91A5] shadow-md shadow-[#0E91A5]">
                  <h1 className="text-[23px] font-extrabold border-l-6 border-[#0E91A5] pl-4">
                    {data.last_name} {data.first_name} {data.middle_name}
                  </h1>
                  <div className="ml-6 grid grid-cols-2 my-10 gap-5">
                    <div className="">
                      <div className="flex gap-2 items-center mb-2">
                        {/* <img
                        src="/img/svg/IdCard.svg"
                        alt=""
                        className="w-10 h-10"
                      /> */}
                        <h1 className=" font-semibold text-[18px] text-gray-600">
                          Speciality:
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        -{data?.specialties}
                      </p>
                    </div>
                    <div className="">
                      <div className="flex gap-2 items-center mb-2">
                        {/* <img
                        src="/img/svg/Calendar.svg"
                        alt=""
                        className="w-8 h-8 "
                      /> */}
                        <h1 className=" font-semibold text-[18px] text-gray-600">
                          Experience:
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.experience_years} years
                      </p>
                    </div>
                    <div className="">
                      <div className="flex gap-2 items-center mb-2">
                        {/* <img src="/img/money.svg" alt="" className="w-8 h-8 " /> */}
                        <h1 className="font-semibold text-[18px] text-gray-600">
                          Initial consultation
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.initial_consultation_price === 0 ? (
                          <p>-free</p>
                        ) : (
                          <p>{data.initial_consultation_price} so'm</p>
                        )}
                      </p>
                    </div>
                    <div className="">
                      <div className="flex gap-2 items-center mb-2">
                        {/* <img src="/img/money.svg" alt="" className="w-8 h-8 " /> */}
                        <h1 className="mb-1 font-semibold text-[18px] text-gray-600">
                          Follow-up consultation
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.follow_up_consultation_price === 0 ? (
                          <p>-free</p>
                        ) : (
                          <p>{data.follow_up_consultation_price} so'm</p>
                        )}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          setSelectedDoctor(data);
                          setOpenModal(true);
                        }}
                        setSelectedDoctor
                        className="py-2 px-3 rounded-md bg-[#0E91A5] text-white hover:shadow-[#0E91A5] hover:shadow-md hover:scale-110 transition-all duration-300 cursor-pointer"
                      >
                        Book consultation
                      </button>
                    </div>
                  </div>
                </div>
                <div className="rounded-[20px] w-full p-5 border-1 border-[#0E91A5] shadow-md shadow-[#0E91A5] mt-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold mb-2">
                      About the Doctor
                    </h2>
                    <button onClick={() => handleMenu()}>
                      {openMenu === false ? (
                        <BiPlusCircle className="w-10 h-10" />
                      ) : (
                        <BiMinusCircle className="w-10 h-10" />
                      )}
                    </button>
                  </div>
                  <div className={`${openMenu === true ? "mt-4" : "hidden"}`}>
                    <Section title="WORK ACTIVITIES" items={data.description} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
      {openModal && (
        <Modal selectedDoctor={selectedDoctor} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}

export default DocDetail;

const Section = ({ title, items }) => (
  <div className="mt-6">
    <h3 className="text-md font-semibold uppercase tracking-wide text-[#0c6e7d] mb-2">
      {title}:
    </h3>
    <div className="list-disc pl-6 space-y-1 text-gray-700">
      <p>{items}</p>
    </div>
  </div>
);
