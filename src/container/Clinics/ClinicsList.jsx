import React from "react";
import { ListClinics } from "../../../Data/Data";
import ClinicCard from "./ClinicCard";
import { BiSearch } from "react-icons/bi";
import Container from "../../components/Container";

function ClinicsList() {
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
                Allergist, Tashkent ({ListClinics.length})
              </h1>
              <select className="mt-[15px] bg-white px-3 py-2 rounded-[10px] outline-none border-2 border-[#0E91A5] text-[#084d58] font-semibold">
                <option value="1">By Default</option>
                <option value="2">Rating</option>
                <option value="3">By Price</option>
                <option value="4">Experience</option>
              </select>
            </div>
            <div className=" rounded-2xl p-5 my-4 ">
              <div>
                {ListClinics.map((data) => (
                  <ClinicCard data={data} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ClinicsList;
