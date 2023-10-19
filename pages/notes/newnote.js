import SubNav from "@/components/SubNav";
import React from "react";
import Layout from "@/layout/Layout";

const NewNote = () => {
  return (
    <Layout>
      <SubNav
        link1="All Notes"
        link2="Add Note"
        path1="/notes"
        path2="/notes/newnote"
      />
      <div>New Note</div>
    </Layout>
  );
};

export default NewNote;
