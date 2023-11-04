import React, { useEffect, useState } from "react";
import Layout from "@/layout/Layout";
import SubNav from "@/components/SubNav";
import { useSession } from "next-auth/react";

const Passwords = () => {
  const { data: session } = useSession();
  const [passwords, setPasswords] = useState([]);
  useEffect(() => {
    if (session) {
      fetch(
        `http://localhost:3000/api/passwords/getPass?email=${session?.user?.email}`
      )
        .then((response) => response.json())
        .then((data) => {
          setPasswords(data);
        })
        .catch((error) => {
          console.error("Error fetching Saved Passwords", error);
        });
    }
  }, [session]);

  console.log(passwords);

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
