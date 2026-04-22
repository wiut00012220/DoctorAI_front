import React, { useEffect, useState } from "react";
import { BsPhone } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import request from "../../components/config/Index";
import { Modal } from "./BookingModal";
import Loading from "../../assets/Animation/loading.json";
import Lottie from "lottie-react";
import Container from "../../components/Container";
import { FaStar } from "react-icons/fa";

function DocDetail() {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const { id } = useParams();

  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await request.get(`/doctors/${id}`);
      setData(res?.data?.data?.doctor || null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      <div className="flex justify-center items-center bg-[#013040] pt-[130px] gap-2 pb-[20px]"></div>

      <Container>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Lottie
              animationData={Loading}
              loop
              autoplay
              className="h-[40%] w-[40%]"
            />
          </div>
        ) : !data ? (
          <div className="py-20 text-center text-gray-500">
            Doctor not found
          </div>
        ) : (
          <div className="my-10">
            <div className="flex gap-4">
              <div className="max-w-[270px]">
                <div>
                  <img
                    src={data.photo || "/doctor-placeholder.jpg"}
                    alt={data.firstName}
                    className="w-[270px] h-[350px] object-cover rounded-[20px] border-[10px] border-[#0E91A5] shadow-md shadow-[#0E91A5]"
                  />
                </div>

                <div className="w-full rounded-[20px] shadow-md shadow-[#0E91A5] p-4 mt-4 border border-[#0E91A5]">
                  <h1 className="mb-2 font-semibold">Contact info:</h1>

                  <div className="flex gap-2 mb-3">
                    <img src="/Clinic.svg" alt="" className="h-8 w-8" />
                    <h1 className="text-[14px] font-bold">{data.clinicName}</h1>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <img src="/Departure.svg" alt="" className="h-8 w-8" />
                    <h1 className="text-[12px] text-gray-600">
                      {data.location}
                    </h1>
                  </div>

                  <div className="flex gap-3 items-center mb-3">
                    <BsPhone className="w-6 h-6" color="#0E91A5" />
                    <p className="text-[16px] text-gray-600">{data.phone}</p>
                  </div>

                  <div className="flex gap-3 items-center">
                    <MdEmail className="w-6 h-6" color="#0E91A5" />
                    <p className="text-[16px] text-gray-600">{data.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <div className="rounded-[20px] w-full p-5 border border-[#0E91A5] shadow-md shadow-[#0E91A5]">
                  <h1 className="text-[23px] font-extrabold border-l-6 border-[#0E91A5] pl-4">
                    {data.firstName} {data.lastName}
                  </h1>

                  <div className="ml-6 grid grid-cols-2 my-10 gap-5">
                    <div>
                      <div className="flex gap-2 items-center mb-2">
                        <h1 className="font-semibold text-[18px] text-gray-600">
                          Speciality:
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.specialization}
                      </p>
                    </div>

                    <div>
                      <div className="flex gap-2 items-center mb-2">
                        <h1 className="font-semibold text-[18px] text-gray-600">
                          Experience:
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.experience} years
                      </p>
                    </div>

                    <div>
                      <div className="flex gap-2 items-center mb-2">
                        <h1 className="font-semibold text-[18px] text-gray-600">
                          Consultation fee:
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.consultationFee?.toLocaleString()} so&apos;m
                      </p>
                    </div>

                    <div>
                      <div className="flex gap-2 items-center mb-2">
                        <h1 className="mb-1 font-semibold text-[18px] text-gray-600">
                          Consultation type:
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.consultationType}
                      </p>
                    </div>

                    <div>
                      <div className="flex gap-2 items-center mb-2">
                        <h1 className="font-semibold text-[18px] text-gray-600">
                          Available days:
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.availableDays?.join(", ")}
                      </p>
                    </div>

                    <div>
                      <div className="flex gap-2 items-center mb-2">
                        <h1 className="font-semibold text-[18px] text-gray-600">
                          Available time:
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.availableTime}
                      </p>
                    </div>

                    <div>
                      <div className="flex gap-2 items-center mb-2">
                        <h1 className="font-semibold text-[18px] text-gray-600">
                          Languages:
                        </h1>
                      </div>
                      <p className="text-[16px] font-bold">
                        {data.languages?.join(", ")}
                      </p>
                    </div>

                    <div>
                      <div className="flex gap-2 items-center mb-2">
                        <h1 className="font-semibold text-[18px] text-gray-600">
                          Rating:
                        </h1>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[16px] font-bold">
                          {data.ratingsAverage} ({data.ratingsQuantity})
                        </p>
                        <FaStar color="#0E91A5" className="w-5 h-5" />
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          setSelectedDoctor(data);
                          setOpenModal(true);
                        }}
                        className="py-2 px-3 rounded-md bg-[#0E91A5] text-white hover:shadow-[#0E91A5] hover:shadow-md hover:scale-110 transition-all duration-300 cursor-pointer"
                      >
                        Book consultation
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] w-full p-5 border border-[#0E91A5] shadow-md shadow-[#0E91A5] mt-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold mb-2">
                      About the Doctor
                    </h2>
                    <button onClick={handleMenu}>
                      {!openMenu ? (
                        <BiPlusCircle className="w-10 h-10" />
                      ) : (
                        <BiMinusCircle className="w-10 h-10" />
                      )}
                    </button>
                  </div>

                  <div className={`${openMenu ? "mt-4" : "hidden"}`}>
                    <Section title="BIO" items={data.bio} />
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
    <div className="pl-2 space-y-1 text-gray-700">
      <p>{items}</p>
    </div>
  </div>
);
