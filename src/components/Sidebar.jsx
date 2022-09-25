import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick }) => {
  return (
    <div className="mt-10">
      {links.map((item) => {
        return (
          <NavLink key={item.name} to={item.to} className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gay-400 hover:text-cyan-400 text-white" onClick={() => handleClick && handleClick()}>
            <item.icon className="w-6 h-6 mr-2" />
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, SetMobileMenuOpen] = useState(false);
  return (
    <>
      <div
        className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]
      "
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
    </>
  );
};

export default Sidebar;
