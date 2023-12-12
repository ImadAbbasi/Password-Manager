import Search from "@/components/Search";
import SubNav from "@/components/SubNav";
import Layout from "@/layout/Layout";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { MdDelete } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";

import { deleteNote } from "@/utils/deleteNote";
import Link from "next/link";

const Notes = () => {
  const { data: session } = useSession();
  const [notes, setNotes] = useState([]);
  const [searchedNotes, setSearchedNotes] = useState([]);

  useEffect(() => {
    if (session) {
      fetch(
        `http://localhost:3000/api/notes/getNotes?email=${session?.user?.email}`
      )
        .then((response) => response.json())
        .then((data) => {
          setNotes(data);
        })
        .catch((error) => {
          console.error("Error Fetching Saved Notes!", error);
        });
    }
  }, [session]);

  const handleSearch = (query) => {
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedNotes(filteredNotes);
  };

  const clear = () => {
    setSearchedNotes(notes);
  };
  const handleDeletePassword = async (id) => {
    try {
      await deleteNote(id);
    } catch (error) {
      console.error("Error Deleting Note!", error);
    }
  };

  return (
    <Layout>
      <SubNav
        link1="Notes"
        link2="AddNew"
        path1="/notes"
        path2="/notes/newnote"
      />
      <div className="py-2 px-1 md:p-5 my-5">
        <div className="bg-gray-100 p-2 md:p-5 mb-5 rounded-md">
          <Search onSearch={handleSearch} clear={clear} />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          {searchedNotes.length > 0
            ? // Display searched notes
              searchedNotes.map((note) => (
                <div
                  key={note._id}
                  className="bg-gray-100 p-2 md:p-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md shadow-sm hover:shadow-lg transition duration-200 h-32 md:h-48 flex flex-col justify-between"
                >
                  {/* <Link href={`/notes/${note._id}`}> */}
                  <div>
                    <h2 className="text-blue-400 text-base md:text-lg font-bold uppercase overflow-clip text-center md:text-left">
                      {note.title}
                    </h2>
                    <p className="text-gray-600 text-xs md:text-base overflow-y-scroll h-10 md:h-20">
                      {note.note}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link href={`/notes/${note._id}`}>
                      <button className="p-1 w-7 h-7 border-2 border-blue-400 bg-blue-400 hover:bg-inherit text-sm md:text-base hover:text-blue-400 rounded-full text-white font-semibold transition-all duration-300 shadow-md flex justify-between items-center">
                        <RiFileEditFill size={20} />
                      </button>
                    </Link>
                    <button className="p-1 w-7 h-7 border-2 border-rose-500 bg-rose-500 hover:bg-inherit text-sm md:text-base hover:text-rose-500 rounded-full text-white font-semibold transition-all duration-300 shadow-md flex justify-between items-center">
                      <MdDelete
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation(); // Stop propagation to prevent the link from triggering
                          handleDeletePassword(note._id);
                        }}
                      />
                    </button>
                  </div>
                  {/* </Link> */}
                </div>
              ))
            : // Display all notes
              notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-gray-100 p-2 md:p-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-md shadow-sm hover:shadow-lg transition duration-200 h-32 md:h-48 flex flex-col justify-between"
                >
                  {/* <Link href={`/notes/${note._id}`}> */}
                  <div>
                    <h2 className="text-blue-400 text-base md:text-lg font-bold uppercase overflow-clip text-center md:text-left">
                      {note.title}
                    </h2>
                    <p className="text-gray-600 text-xs md:text-base overflow-y-scroll h-10 md:h-20">
                      {note.note}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link href={`/notes/${note._id}`}>
                      <button className="p-1 w-7 h-7 border-2 border-blue-400 bg-blue-400 hover:bg-inherit text-sm md:text-base hover:text-blue-400 rounded-full text-white font-semibold transition-all duration-300 shadow-md flex justify-between items-center">
                        <RiFileEditFill size={20} />
                      </button>
                    </Link>
                    <button className="p-1 w-7 h-7 border-2 border-rose-500 bg-rose-500 hover:bg-inherit text-sm md:text-base hover:text-rose-500 rounded-full text-white font-semibold transition-all duration-300 shadow-md flex justify-between items-center">
                      <MdDelete
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation(); // Stop propagation to prevent the link from triggering
                          handleDeletePassword(note._id);
                        }}
                      />
                    </button>
                  </div>
                  {/* </Link> */}
                </div>
              ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notes;

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
