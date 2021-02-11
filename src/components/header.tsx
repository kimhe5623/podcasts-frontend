import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import pocastsLogo from "../images/podcasts-logo-main.png";

import { useState } from "react";
import { UserRole } from "../__generated__/globalTypes";

export const Header: React.FC = () => {
  const { data } = useMe();
  const history = useHistory();
  const [showMenu, setShowOrNot] = useState(false);
  const [currentPath, setPath] = useState('');

  const isHambergerMenuInit: boolean = window.innerWidth < 600;
  const [isHamburgerMenu, setIsHamburger] = useState(isHambergerMenuInit);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const meData = useMe();

  const onClickLogOut = () => {
    setShowOrNot(false);
    setIsHamburgerOpen(false);
    localStorage.clear();
    history.push('/');
    window.location.reload();
  }

  window.addEventListener("resize", (ev) => {
    if (window.innerWidth < 600) {
      setIsHamburger(true);
    } else {
      setIsHamburger(false);
      setIsHamburgerOpen(false);
    }
  });

  document.addEventListener("click", (ev) => {
    //console.log(ev.target);
    if (ev.composedPath()[2] !== document.getElementById("dropboxBtn")) {
      setShowOrNot(false);
    }
    setPath(window.location.pathname);
  });

  const onClickLogo = () => {
    if (currentPath === '/') {
      window.location.reload();
    } else {
      history.push('/');
      window.location.reload();
    }
  }

  const onClickHamburgerMenu = () => {
    setIsHamburgerOpen(false);
  }


  return (
    <header className="py-4">
      <div className="w-full px-5 2xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" onClick={onClickLogo}>
          <img src={pocastsLogo} className=" w-32" alt="Ouber Eats" />
        </Link>
        {
          isHamburgerMenu ?
            (
              <>
                <div
                  onClick={() => {
                    setIsHamburgerOpen(true);
                  }}
                  className="flex flex-row items-center text-violet-900 text-2xl cursor-pointer">
                  <FontAwesomeIcon icon={faBars} />
                </div>
                {
                  isHamburgerOpen && (
                    <div className="absolute top-0 left-0 w-screen h-screen grid grid-cols-3">
                      <div
                        onClick={() => {
                          setIsHamburgerOpen(false);
                        }}
                        className="bg-dark bg-opacity-50 col-start-1 col-span-1 z-30" />
                      <div className="flex bg-white col-start-2 col-span-2 z-30 pt-8">
                        <div
                          className=" text-black text-lg grid auto-rows-max w-full">
                          <div className="z-30 border-b-2 border-gray-200 py-4 flex flex-col justify-center items-center bg-white">
                            <span><b>Hello,</b></span>
                            <span>{data?.me.email}</span>
                          </div>
                          {
                            meData.data?.me.role === UserRole.Listener && (
                              <>
                                <Link to={`/subscriptions`}>
                                  <div
                                    onClick={onClickHamburgerMenu}
                                    className="z-30 border-b-2 border-gray-200 py-4 cursor-pointer flex justify-center items-center bg-white hover:bg-violet-100">
                                    Subscriptions
                                  </div>
                                </Link>
                              </>
                            )
                          }
                          {
                            meData.data?.me.role === UserRole.Host && (
                              <>
                                <Link to={`/dashboard`}>
                                  <div
                                    onClick={onClickHamburgerMenu}
                                    className="z-30 border-b-2 border-gray-200 py-4 cursor-pointer flex justify-center items-center bg-white hover:bg-violet-100">
                                    Dashboard
                                  </div>
                                </Link>
                                <Link to={`/create-new-podcast`}>
                                  <div
                                    onClick={onClickHamburgerMenu}
                                    className="z-30 border-b-2 border-gray-200 py-4 cursor-pointer flex justify-center items-center bg-white hover:bg-violet-100">
                                    New Podcast
                                  </div>
                                </Link>
                              </>
                            )
                          }
                          <Link to={`/edit-profile`}>
                            <div
                              onClick={onClickHamburgerMenu}
                              className="z-30 border-b-2 border-gray-200 py-4 cursor-pointer flex justify-center items-center bg-white hover:bg-violet-100">
                              Edit Profile
                          </div>
                          </Link>
                          <Link to={`/`} onClick={onClickLogOut}>
                            <div
                              className="z-30 border-b-2 border-gray-200 py-4 cursor-pointer flex justify-center items-center bg-white hover:bg-violet-100">
                              Log Out
                          </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                }
              </>
            )
            :
            (
              <div className="flex flex-row items-center">
                {meData.data?.me.role === UserRole.Listener &&
                  (
                    <>
                      <div className="flex flex-col justify-center items-center group cursor-pointer text-center mr-16">
                        <Link to={`/subscriptions`}>
                          <span className="text-violet-900 hover:bg-violet-100 text-center p-2">Subscriptions</span>
                        </Link>
                      </div>
                    </>
                  )
                }
                {meData.data?.me.role === UserRole.Host &&
                  (
                    <>
                      <div className="flex flex-col justify-center items-center group cursor-pointer text-center mr-5">
                        <Link to={`/dashboard`}>
                          <span className="text-violet-900 hover:bg-violet-100 text-center p-2">Dashboard</span>
                        </Link>
                      </div>

                      <div className="flex flex-col justify-center items-center group cursor-pointer text-center mr-16">
                        <Link to={`/create-new-podcast`}>
                          <span className="text-violet-900 hover:bg-violet-100 text-center p-2">New Podcast</span>
                        </Link>
                      </div>
                    </>
                  )
                }

                <div
                  className="relative inline-block"
                  onMouseOver={() => setShowOrNot(true)}
                >
                  <span
                    id="dropboxBtn"
                    className="text-xs cursor-pointer mr-3"
                  >
                    <FontAwesomeIcon icon={faUser} className="text-2xl text-violet-900" />
                  </span>

                  {
                    showMenu
                      ? (
                        <ul
                          className="absolute 2xl:right-1/4 right-1/4 top-8 w-40 bg-white border-2 border-violet-400 text-base rounded-lg">
                          <li className="mb-1 px-2 py-4 border-b border-violet-400"><b>Hello,</b> {data?.me.email}</li>
                          <Link to="/edit-profile">
                            <li className="hover:bg-violet-400 my-1 px-2 py-4 border-b border-violet-400">Edit Profile</li>
                          </Link>
                          <Link to="/" onClick={onClickLogOut}>
                            <li className="hover:bg-violet-400 mt-1 px-2 py-4">Log Out</li>
                          </Link>
                        </ul>
                      )
                      : (
                        null
                      )
                  }
                </div>
              </div>
            )
        }
      </div>
    </header >
  );
};