import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "./Container";
import { BiSolidArrowFromLeft } from "react-icons/bi";
import SignupChoiceModal from "./SignupChoiceModal";
import LoginModal from "./LoginModal";

function Navbar() {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [openSignupChoice, setOpenSignupChoice] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

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
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown((prev) => !prev)}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={user.photo || "/default-user.png"}
                      alt={user.firstName || "User"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#0E91A5]"
                    />

                    <span className="text-white font-semibold">
                      {user.firstName}
                    </span>
                  </button>

                  {/* DROPDOWN */}
                  {openDropdown && (
                    <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg overflow-hidden z-50">
                      <button
                        onClick={() => {
                          setOpenDropdown(false);
                          navigate("/profile");
                        }}
                        className="w-full text-left px-4 py-3 text-black hover:bg-gray-100"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          handleLogout();
                          setOpenDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setOpenSignupChoice(true)}
                    className="cursor-pointer flex items-center justify-center gap-1 neon-button border border-[#0E91A5] text-[#0E91A5] px-3 py-1 rounded-md"
                  >
                    <BiSolidArrowFromLeft />
                    <span>Sign up</span>
                  </button>

                  <button
                    onClick={() => setOpenLoginModal(true)}
                    className="cursor-pointer neon-button border border-[#0E91A5] text-[#0E91A5] px-3 py-1 rounded-md"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </Container>
      </nav>

      {openSignupChoice && (
        <SignupChoiceModal setOpenSignupChoice={setOpenSignupChoice} />
      )}

      {openLoginModal && (
        <LoginModal setOpenLoginModal={setOpenLoginModal} setUser={setUser} />
      )}
    </>
  );
}

export default Navbar;
