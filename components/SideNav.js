import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { FaStickyNote } from "react-icons/fa";
import { CgPassword } from "react-icons/cg";

const SideNav = () => {
  const inActiveLink =
    "text-lg flex items-center text-gray-800 gap-1 font-semibold hover:scale-105 transition duration-300 hover:text-blue-400 w-full";
  const activeLink =
    "text-lg flex items-center gap-1 font-bold scale-105 shadow-md p-1 text-blue-400 w-full border-r-4 border-blue-400";
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="p-2 md:p-5 col-span-1">
      <div className="flex flex-col flex-shrink gap-8">
        {/* <div className="flex">
          <Link href={"/"} className="text-2xl flex items-center gap-2">
            <RiLockPasswordFill
              size={40}
              className="text-blue-400 p-1 border-2 mt-2 rounded-full shadow-sm"
            />
            <span className="font-bold hidden md:block text-transparent bg-gradient-to-r from-blue-400 to-fuchsia-300 bg-clip-text ">
              Pass Manager
            </span>
          </Link>
        </div> */}
        <div className="flex flex-col justify-center items-center md:items-stretch gap-4">
          <div className="flex">
            <Link
              href={"/"}
              className={pathname === "/" ? activeLink : inActiveLink}
            >
              <AiFillHome size={25} />
              <span className="hidden md:block">DashBoard</span>
            </Link>
          </div>
          <div className="flex">
            <Link
              href={"/passwords"}
              className={
                pathname.includes("/passwords") ? activeLink : inActiveLink
              }
            >
              <MdPassword size={25} />
              <span className="hidden md:block">Passwords</span>
            </Link>
          </div>
          <div className="flex">
            <Link
              href={"/notes"}
              className={
                pathname.includes("/notes") ? activeLink : inActiveLink
              }
            >
              <FaStickyNote size={23} />
              <span className="hidden md:block">Notes</span>
            </Link>
          </div>
          <div className="flex">
            <Link
              href={"generate"}
              className={pathname === "/generate" ? activeLink : inActiveLink}
            >
              <CgPassword size={25} />
              <span className="hidden md:block">Password Generator</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
