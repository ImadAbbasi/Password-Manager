import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SubNav = ({ link1, link2, path1, path2 }) => {
  console.log(link1, link2, path1, path2);
  const router = useRouter();
  const { pathname } = router;

  const inActiveLink =
    "text-lg font-semibold text-gray-800 hover:text-blue-400";
  const activeLink = "text-lg font-bold text-blue-400";

  return (
    <div className="flex justify-center">
      <div className="flex justify-between bg-gray-100 shadow-md w-1/3 rounded-md">
        <div
          className={
            pathname === path1
              ? "border-b-4 border-blue-400 py-2 px-4 w-full text-center"
              : "py-2 px-4 w-full text-center"
          }
        >
          <Link
            href={path1}
            className={pathname === path1 ? activeLink : inActiveLink}
          >
            {link1}
          </Link>
        </div>
        <div
          className={
            pathname === path2
              ? "border-b-4 border-blue-400 py-2 px-4 w-full text-center"
              : "py-2 px-4 w-full text-center"
          }
        >
          <Link
            href={path2}
            className={pathname === path2 ? activeLink : inActiveLink}
          >
            {link2}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubNav;
