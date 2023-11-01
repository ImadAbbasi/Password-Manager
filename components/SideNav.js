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
    "text-lg flex items-center gap-1 rounded-md text-gray-800 font-semibold hover:scale-105 transition duration-300 hover:text-blue-400 w-full";
  const activeLink =
    "text-lg flex items-center gap-1 rounded-md font-bold scale-105 shadow-md p-1 bg-gradient-to-r from-blue-400 to-fuchsia-300 text-white md:w-full md:border-r-4 border-white";
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="p-2 md:p-5 col-span-1">
      <div className="flex flex-col flex-shrink gap-8">
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
              <span className="hidden md:block">PassGenerator</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
