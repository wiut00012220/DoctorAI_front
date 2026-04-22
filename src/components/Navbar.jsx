import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import { BiSolidArrowFromLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import SignupChoiceModal from "./SignupChoiceModal";

function Navbar({ setOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openSignupChoice, setOpenSignupChoice] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 text-white font-semibold transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-md shadow-md shadow-[#0E91A5] top-2 left-[5%] w-[90%] border-3 border-[#0E91A5] bg-black rounded-full text-[18px]"
            : "bg-transparent w-full text-[20px]"
        }`}
      >
        <Container>
          <div
            className={`flex justify-between cursor-pointer ${
              isScrolled ? "my-3" : "my-6"
            }`}
          >
            <div className="flex items-center justify-start gap-6 md:w-[300px]">
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-[#0E91A5] font-bold" : ""}`
                }
              >
                Doctors
              </NavLink>

              <NavLink
                to="/clinics"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-[#0E91A5] font-bold" : ""}`
                }
              >
                Clinics
              </NavLink>
            </div>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 md:w-[200px] text-[24px]"
            >
              <img
                src="/Logo2.svg"
                alt="logo"
                className={`transition-all duration-300 ${
                  isScrolled ? "h-[44px] w-[44px]" : "h-[64px] w-[64px]"
                }`}
              />
              <h1>AIDoctor</h1>
            </Link>

            <div className="text-[18px] font-normal flex items-center justify-end gap-4 md:w-[300px]">
              <button
                onClick={() => setOpenSignupChoice(true)}
                className="cursor-pointer flex items-center justify-center gap-1 neon-button border border-[#0E91A5] text-[#0E91A5] px-3 py-1 rounded-md"
              >
                <BiSolidArrowFromLeft />
                <span>Sign up</span>
              </button>

              <button
                onClick={() => setOpenModal(true)}
                className="cursor-pointer neon-button border border-[#0E91A5] text-[#0E91A5] px-3 py-1 rounded-md"
              >
                Login
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {openSignupChoice && (
        <SignupChoiceModal setOpenSignupChoice={setOpenSignupChoice} />
      )}
    </>
  );
}

export default Navbar;
