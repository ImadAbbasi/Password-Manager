import SubNav from "@/components/SubNav";
import Layout from "@/layout/Layout";
import React from "react";

const Notes = () => {
  return (
    <Layout>
      <SubNav
        link1="All Notes"
        link2="Add Note"
        path1="/notes"
        path2="/notes/newnote"
      />
      <div>Notes</div>
    </Layout>
  );
};

export default Notes;
