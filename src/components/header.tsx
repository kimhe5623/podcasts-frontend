import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import pocastsLogo from "../images/podcasts-logo-main.png";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <header className="py-8">
      <div className="w-full px-5 2xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={pocastsLogo} className="w-24" alt="Ouber Eats" />
        </Link>
        <Link to="/edit-profile">
          <span className="text-xs"><FontAwesomeIcon icon={faUser} className="text-xl text-violet-900" /></span>
        </Link>
      </div>
    </header>
  );
};