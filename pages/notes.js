import Search from "@/components/Search";
import SubNav from "@/components/SubNav";
import Layout from "@/layout/Layout";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

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

  return (
    <Layout>
      <SubNav
        link1="Notes"
        link2="AddNew"
        path1="/notes"
        path2="/notes/newnote"
      />
      <div className="bg-gray-100 p-5 my-5">
        <div className="">
          <Search onSearch={handleSearch} clear={clear} />
        </div>
        {searchedNotes.length > 0
          ? // Display searched notes
            searchedNotes.map((note) => <div key={note._id}>{note.title}</div>)
          : // Display all notes
            notes.map((note) => <div key={note._id}>{note.title}</div>)}
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
