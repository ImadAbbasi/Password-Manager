import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import Link from "next/link";

const Nav = () => {
  const [dropdown, setDropdown] = useState(false);
  const { data: session } = useSession();
  const email = session?.user?.email;

  function handleSignOut() {
    signOut();
  }

  return (
    <div className="shadow-md bg-gray-100 w-full sticky top-0">
      <div className="flex justify-between items-center py-2 mx-2 md:mx-5">
        <div className="flex">
          <Link href={"/"} className="text-2xl flex items-center gap-2">
            <RiLockPasswordFill
              size={44}
              className="text-blue-400 p-1 md:p-2 border-2 rounded-full shadow-sm"
            />
            <span className="font-bold hidden md:block text-transparent bg-gradient-to-r from-blue-400 to-fuchsia-300 bg-clip-text ">
              Pass Manager
            </span>
          </Link>
        </div>
        <div className="flex items-center border-2 p-1 gap-4 rounded-full shadow-sm">
          <div>
            {session?.user?.image ? (
              <img
                src={session?.user?.image}
                alt="user-pic"
                className="w-8 h-8 rounded-full bg-blue-400"
              />
            ) : (
              <div>
                <p className="w-6 md:w-8 h-6 md:h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-fuchsia-300 text-center text-white font-semibold text-lg md:text-2xl">
                  {email?.slice(0, 1).toUpperCase()}
                </p>
              </div>
            )}
          </div>
          <MdArrowDropDown
            size={25}
            className="cursor-pointer"
            onClick={() => setDropdown(!dropdown)}
          />
        </div>
      </div>

      {/* Dropdown */}
      {dropdown && (
        <div className="absolute top-16 right-10 py-4 px-6 rounded-md bg-gradient-to-r from-blue-400 to-fuchsia-300 shadow-md">
          <div className="">
            <p className="text-gray-100 font-semibold border-b-2">
              {session?.user?.email}
            </p>
            {/* <hr className="" /> */}
            <button
              className="mt-2 font-bold text-red-500 w-full flex items-center justify-center gap-2"
              onClick={handleSignOut}
            >
              Sign Out
              <BiLogOut size={25} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
