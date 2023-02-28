import { Transition } from "@headlessui/react";
import Dropdown from "react-bootstrap/Dropdown";
import FTLifePartnerPlus_Logo from "../img/FTLifePartnerPlus_Logo.png";
import "../css/Navbarcss.css";
import { useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import user from "../img/user.png";
import Cookies from "js-cookie";


const PlusNavbar = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleMouseEnter() {
    setIsOpen(true);
  }

  function handleMouseLeave() {
    setIsOpen(false);
  }
  return (
    <div>
      <nav className="shadow ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 md:flex md:justify-center">
          <div className="flex items-center justify-between h-16 md:w-2/3">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <img
                  className="h-12 pointer"
                  src={FTLifePartnerPlus_Logo}
                  alt="Workflow"
                  onClick={() => {
                    window.location = "/home";
                  }}
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4 ">
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <Dropdown
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      show={isOpen}
                    >
                      <Dropdown.Toggle
                        onMouseEnter={handleToggle}
                        id={
                          location.pathname === "/BrokerCom"
                            ? "dropdown-basic "
                            : "dropdown-basic-unactive"
                        }
                        className=""
                      >
                        CMS
                      </Dropdown.Toggle>

                      <Dropdown.Menu show style={{ marginTop: "-0.5rem" }}>
                        <Dropdown.Item
                          href="/BrokerCom"
                          className={
                            location.pathname === "/BrokerCom"
                              ? "active"
                              : "inactive"
                          }
                        >
                          Brokers Communications
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="/Categories"
                          className={
                            location.pathname === "/Categories"
                              ? "active"
                              : "inactive"
                          }
                        >
                          Categories
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="/EventCalendar"
                          className={
                            location.pathname === "/EventCalendar"
                              ? "active"
                              : "inactive"
                          }
                        >
                          Event Calendar
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="/QuickLinks"
                          className={
                            location.pathname === "/QuickLinks"
                              ? "active"
                              : "inactive"
                          }
                        >
                          Quick Links
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <a className="m-16 relative group " href="/Campaign">
                    <span
                      className={
                        location.pathname === "/Campaign"
                          ? "text-ft hover:text-ft "
                          : "text-gray-900  "
                      }
                    >
                      Campaign
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-ft transition-all group-hover:w-full">
                      {" "}
                    </span>
                  </a>

                  <a className="m-16 relative group" href="/DocCenter">
                    <span
                      className={
                        location.pathname === "/DocCenter"
                          ? "text-ft hover:text-ft "
                          : "text-gray-900  "
                      }
                    >
                      Document Center
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-ft transition-all group-hover:w-full"></span>
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex justify-end items-center h-16">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    中IEN
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      style={{ textAlign: "center" }}
                      href="/"
                      className={
                        location.pathname === "/eng" ? "active " : "inactive"
                      }
                    >
                      EN
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ textAlign: "center" }}
                      className={
                        location.pathname === "/trad" ? "active " : "inactive"
                      }
                      href="/"
                    >
                      繁
                    </Dropdown.Item>
                    <Dropdown.Item
                      style={{ textAlign: "center" }}
                      className={
                        location.pathname === "/simp" ? "active " : "inactive"
                      }
                      href="/"
                    >
                      簡
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/*  Divider */}
                <hr className="w-px h-6 bg-slate-400 mx-3 " />
                <img
                      className="w-8 h-8 rounded-full"
                      src={user}
                      width="32"
                      height="32"
                      alt="User"
                    />
                <Dropdown>
                  <Dropdown.Toggle  id="dropdown-basic">
                  
                
                      <span className="truncate text-sm font-medium group-hover:text-slate-800">
                        {props.username}
                      </span>
              
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      style={{ textAlign: "center" }}
                      href="/login"
                      className="hover:bg-ft hover:text-white"
                      onClick={() => {Cookies.remove('PLUSID')}}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-ft inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-ft focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Dropdown>
                <Dropdown.Toggle
                  id={
                    location.pathname === "/BrokerCom"
                      ? "dropdown-basic "
                      : "dropdown-basic-unactive"
                  }
                  className="text-ft hover:bg-ft hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  CMS
                </Dropdown.Toggle>
          
                <Dropdown.Menu className="fixed">
                  <Dropdown.Item
                    href="/BrokerCom"
                    className={
                      location.pathname === "/BrokerCom"
                        ? "active"
                        : "inactive"
                    }
                  >
                    Brokers Communications
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/Categories"
                    className={
                      location.pathname === "/Categories"
                        ? "active"
                        : "inactive"
                    }
                  >
                    Categories
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/EventCalendar"
                    className={
                      location.pathname === "/EventCalendar"
                        ? "active"
                        : "inactive"
                    }
                  >
                    Event Calendar
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/QuickLinks"
                    className={
                      location.pathname === "/QuickLinks"
                        ? "active"
                        : "inactive"
                    }
                  >
                    Quick Links
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          
              <a
                href="/Campagin"
                className="text-ft hover:bg-ft hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Campaign
              </a>
          
              <a
                href="/DocCenter"
                className="text-ft hover:bg-ft hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Document Center
              </a>
          
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="text-ft hover:bg-ft hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  中IEN
                </Dropdown.Toggle>
                <Dropdown.Menu className="fixed">
                  <Dropdown.Item href="#/action-1">EN</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">繁</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">簡</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          
              <a
                href="/DocCenter"
                className="text-ft hover:bg-ft hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </a>
            </div>
          </div>
          
          )}
        </Transition>
      </nav>
    </div>
  );
};

export default PlusNavbar;
