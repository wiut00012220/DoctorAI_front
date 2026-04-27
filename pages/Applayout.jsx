import React, { useState } from "react";
import Navbar from "../src/components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../src/components/Footer";
import { RxCross1 } from "react-icons/rx";

function Applayout() {
  const [openModal, setOpenModal] = useState(false);
  const [openClinicModal, setOpenClinicModal] = useState(false);

  return (
    <div className="relative">
      <Navbar
        setOpenModal={setOpenModal}
        setOpenClinicModal={setOpenClinicModal}
      />
      <Outlet />
      <Footer />
      {openModal && <Modal setOpenModal={setOpenModal} />}
      {openClinicModal && (
        <ClinicModal setOpenClinicModal={setOpenClinicModal} />
      )}
    </div>
  );
}
export default Applayout;
