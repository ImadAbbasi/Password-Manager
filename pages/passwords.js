import React from "react";
import Layout from "@/layout/Layout";
import SubNav from "@/components/SubNav";

const Passwords = () => {
  return (
    <Layout>
      <SubNav
        link1="All Passwords"
        link2="Add Password"
        path1="/passwords"
        path2="/passwords/newpass"
      />
      <div>Passwords</div>
    </Layout>
  );
};

export default Passwords;
