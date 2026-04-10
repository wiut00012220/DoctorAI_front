import React from "react";
import { BiSearch } from "react-icons/bi";
import Container from "../../components/Container";
import { SpecClinic } from "../../../Data/Data";
import ClinicCard from "./ClinicCard";
import { Link } from "react-router-dom";
function ClinicCount() {
  return (
    <div>
      <div className="flex justify-center items-center bg-[#013040] pt-[130px] gap-2 pb-[20px]">
        <input
          type="text"
          placeholder="Search for Clinics"
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
          <div className=" bg-white p-10 rounded-2xl">
            <h1 className="text-[24px] font-bold mb-[10px]">Clinics</h1>
            <div className="grid grid-cols-3 gap-4 bg-[#0d91a6]/10 p-4 rounded-[10px]">
              {SpecClinic.map((data) => (
                <Link
                  key={data.name}
                  to={"/doctors/listClinics"}
                  className="flex items-center gap-3 cursor-pointer "
                >
                  <h1 className="text-[18px] font-semibold text-[#075561] border-b-2 hover:text-[#4a828b]">
                    {data.name}
                  </h1>
                  <h1 className="text-[18px] font-normal"> ({data.count})</h1>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default ClinicCount;
