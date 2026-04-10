import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import { useLocation, useParams } from "react-router-dom";
import request from "../../components/config/Index";
import { BiSearch } from "react-icons/bi";
import { Modal } from "./BookingModal";
import Container from "../../components/Container";
import Lottie from "lottie-react";
import Loading from "../../assets/Animation/loading.json";

function ListDocs() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [docList, setDocList] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");

  const getList = async () => {
    setIsLoading(true);
    try {
      let res = await request.get(`/doctors/category/${id}/doctor/list/`);
      setDocList(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-center items-center bg-[#013040] pt-[130px] gap-2 pb-[20px]">
        <input
          type="text"
          placeholder="Search Doctors"
          className="px-3 py-2 rounded-[10px] border-[#0E91A5] border-2 bg-white outline-none"
        />
        <select className="bg-[white] px-3 py-2 rounded-[10px] outline-none border-2 border-[#0E91A5] text-[#084d58] font-semibold">
          <option value="1">Tashkent</option>
          <option value="2">Namangan</option>
          <option value="3">Andijon</option>
          <option value="4">Samarqand</option>
        </select>
        <button className="p-2.5 rounded-[10px] bg-[#0d91a6] text-white text-[20px]">
          <BiSearch />
        </button>
      </div>
      <div className="bg-[#F5F5F5] py-10">
        <Container>
          <div className="mx-[100px]">
            <div>
              <h1 className="text-[34px] font-semibold">
                {name}, Tashkent ({docList.length})
              </h1>
              <select className="mt-[15px] bg-white px-3 py-2 rounded-[10px] outline-none border-2 border-[#0E91A5] text-[#084d58] font-semibold">
                <option value="1">By Default</option>
                <option value="2">Rating</option>
                <option value="3">By Price</option>
                <option value="4">Experience</option>
              </select>
            </div>
            <div className=" rounded-2xl p-5 my-4 ">
              {isLoading === true ? (
                <div className="flex justify-center items-center">
                  <Lottie
                    animationData={Loading}
                    loop
                    autoplay
                    className="h-[30%] w-[30%]"
                  />
                </div>
              ) : (
                <div>
                  {docList.map((doc) => (
                    <DoctorCard
                      data={doc}
                      setSelectedDoctor={setSelectedDoctor}
                      setOpenModal={setOpenModal}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
      {openModal && (
        <Modal selectedDoctor={selectedDoctor} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}

export default ListDocs;
