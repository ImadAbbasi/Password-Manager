import React, { useEffect, useState } from "react";
import Layout from "@/layout/Layout";
import SubNav from "@/components/SubNav";
import { getSession, useSession } from "next-auth/react";
import Search from "@/components/Search";

import { MdDelete } from "react-icons/md";
import { deletePassword } from "@/utils/delete";

const Passwords = () => {
  const { data: session } = useSession();
  const [passwords, setPasswords] = useState([]);
  const [searchedPass, setSearchedPass] = useState([]);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    if (session) {
      fetch(
        `http://localhost:3000/api/passwords/getPass?email=${session?.user?.email}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Sort passwords alphabetically by site name
          const sortedPasswords = data.sort((a, b) =>
            a.site.localeCompare(b.site)
          );
          setPasswords(sortedPasswords);
        })
        .catch((error) => {
          console.error("Error fetching Saved Passwords", error);
        });
    }
  }, [session]);

  const handleSearch = (query) => {
    const filteredPasswords = passwords.filter((password) =>
      password.site.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedPass(filteredPasswords);
  };

  const clear = () => {
    setSearchedPass(passwords);
  };

  const handleCopyPassword = (password) => {
    const textArea = document.createElement("textarea");
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    setTooltip(true);
    setTimeout(() => {
      setTooltip(false);
    }, 1000);

    document.body.removeChild(textArea);
  };

  const handleDeletePassword = async (id) => {
    try {
      await deletePassword(id);
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  return (
    <Layout>
      <SubNav
        link1="Passwords"
        link2="Add New"
        path1="/passwords"
        path2="/passwords/newpass"
      />
      <div className="py-2 px-1 md:p-5 my-5">
        <div className="bg-gray-100 p-2 md:p-5 mb-5 rounded-md">
          <Search onSearch={handleSearch} clear={clear} />
        </div>
        <div className="flex flex-col gap-5">
          {searchedPass.length > 0
            ? searchedPass?.map((pass) => (
                <div
                  key={pass._id}
                  className="bg-gray-100 p-2 md:p-5 flex flex-col md:flex-row justify-between items-center gap-1 md:gap-0 rounded-md shadow-sm hover:shadow-lg transition duration-200"
                >
                  <div>
                    <h2 className="text-blue-400 text-base md:text-lg font-bold uppercase overflow-clip text-center md:text-left">
                      {pass.site}
                    </h2>
                    <p className="text-gray-600 text-xs md:text-base overflow-clip">
                      {pass.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      id="copy-button"
                      className="py-1 px-3 border-2 border-blue-400 bg-blue-400 hover:bg-inherit text-xs md:text-base hover:text-blue-400 rounded-md text-white font-semibold transition-all duration-300 shadow-md flex justify-between items-center"
                      onClick={() => handleCopyPassword(pass.password)}
                    >
                      Copy Password
                      {/* Tooltip */}
                      {tooltip && (
                        <div className="tooltip bg-gray-800 text-white text-xs rounded py-1 px-2 absolute top-0 left-1/2 transform -translate-x-1/2 opacity-1 transition-opacity duration-300">
                          Copied!
                        </div>
                      )}
                    </button>
                    <button
                      className="p-1 w-7 h-7 border-2 border-rose-500 bg-rose-500 hover:bg-inherit text-sm md:text-base hover:text-rose-500 rounded-full text-white font-semibold transition-all duration-300 shadow-md flex justify-between items-center"
                      onClick={() => handleDeletePassword(pass._id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              ))
            : passwords?.map((pass) => (
                <div
                  key={pass._id}
                  className="bg-gray-100 p-2 md:p-5 flex flex-col md:flex-row justify-between items-center gap-1 md:gap-0 rounded-md shadow-sm hover:shadow-lg transition duration-200"
                >
                  <div>
                    <h2 className="text-blue-400 text-base md:text-lg font-bold uppercase overflow-clip text-center md:text-left">
                      {pass.site}
                    </h2>
                    <p className="text-gray-600 text-xs md:text-base overflow-clip">
                      {pass.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      id="copy-button"
                      className="py-1 px-3 border-2 w-auto border-blue-400 bg-blue-400 hover:bg-inherit text-xs md:text-base hover:text-blue-400 rounded-md text-white font-semibold transition-all duration-300 shadow-md flex justify-between items-center"
                      onClick={() => handleCopyPassword(pass.password)}
                    >
                      Copy Password
                      {/* <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 relative -top-10 right-20 transform -translate-x-1/2 opacity-1 transition-opacity duration-300">
                        Copied!
                      </div> */}
                    </button>
                    {/* Tooltip */}
                    {tooltip && (
                      <div className="tooltip bg-gray-800 text-white text-xs rounded py-1 px-2 absolute top-0 left-1/2 transform -translate-x-1/2 opacity-1 transition-opacity duration-300">
                        Copied!
                      </div>
                    )}

                    <button
                      className="p-1 w-7 h-7 border-2 border-rose-500 bg-rose-500 hover:bg-inherit text-sm md:text-base hover:text-rose-500 rounded-full text-white font-semibold transition-all duration-300 shadow-md flex justify-between items-center"
                      onClick={() => handleDeletePassword(pass._id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </Layout>
  );
};

export default Passwords;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
