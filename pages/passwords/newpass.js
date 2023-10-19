import SubNav from "@/components/SubNav";
import React from "react";
import Layout from "@/layout/Layout";

const New = () => {
  return (
    <Layout>
      <SubNav
        link1="All Passwords"
        link2="Add Password"
        path1="/passwords"
        path2="/passwords/newpass"
      />
      <div>New</div>
    </Layout>
  );
};

export default New;
