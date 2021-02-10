import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import pocastsLogo from "../images/podcasts-logo-main.png";

import { useState } from "react";

export const Header: React.FC = () => {
  const { data } = useMe();
  const history = useHistory();
  const [showMenu, setShowOrNot] = useState(false);
  const [currentPath, setPath] = useState('');

  const onClickLogOut = () => {
    setShowOrNot(false);
    localStorage.clear();
    history.push('/');
    window.location.reload();
  }

  document.addEventListener("click", (ev) => {
    setPath(window.location.pathname);
  });

  const onClickLogo = () => {
    if(currentPath === '/') {
      window.location.reload();
    } else {
      history.push('/');
    }
  }


  return (
    <header className="py-4">
      <div className="w-full px-5 2xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/" onClick={onClickLogo}>
          <img src={pocastsLogo} className=" w-32" alt="Ouber Eats" />
        </Link>

        <span className="text-xs cursor-pointer" onClick={() => setShowOrNot((current) => !current)}>
          <FontAwesomeIcon icon={faUser} className="text-2xl text-violet-900" />
        </span>

        {
          showMenu
            ? (
              <ul
                className="absolute right-24 top-12 w-36 bg-white border-2 border-violet-400 text-base rounded-lg">
                <li className="mb-1 px-2 py-4 border-b border-violet-400"><b>Hello,</b> {data?.me.email}</li>
                <Link to="/edit-profile" onClick={() => setShowOrNot(false)}>
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
    </header>
  );
};