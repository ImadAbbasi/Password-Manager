import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SubNav = ({ link1, link2, path1, path2 }) => {
  const router = useRouter();
  const { pathname } = router;

  const linkClass = (path) =>
    `text-xs md:text-lg font-semibold py-2 px-4 ${
      pathname === path
        ? "text-blue-400 border-b-4 border-blue-400"
        : "text-gray-800 hover:text-blue-400"
    }`;

  return (
    <div className="flex justify-center w-auto">
      <div className="flex justify-between bg-gray-100 shadow-md w-full md:w-2/3 lg:w-1/2 rounded-md">
        <div className="flex justify-around gap-4 w-full">
          <Link href={path1}>
            <button
              className={linkClass(path1)}
              onClick={() => window.scrollTo(0, 0)}
            >
              {link1}
            </button>
          </Link>
          <Link href={path2}>
            <button
              className={linkClass(path2)}
              onClick={() => window.scrollTo(0, 0)}
            >
              {link2}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubNav;

{
  /* <Link
          href={path1}
          className={pathname === path1 ? activeLink : inActiveLink}
        >
          <button
            className={
              pathname === path1
                ? "border-b-4 border-blue-400 py-2 px-4 bg-pink-400 w-auto md:w-full text-center"
                : "py-2 px-4 w-full text-center"
            }
          >
            {link1}
          </button>
        </Link>
        <Link
          href={path2}
          className={pathname === path2 ? activeLink : inActiveLink}
        >
          <button
            className={
              pathname === path2
                ? "border-b-4 border-blue-400 py-2 px-4 w-auto"
                : "py-2 px-4 w-full md:text-center"
            }
          >
            {link2}
          </button>
        </Link> */
}
