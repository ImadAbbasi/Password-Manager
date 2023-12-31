import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Profile = ({ session }) => {
  return (
    <section className="container mx-auto text-center">
      <h3 className="text-4xl font-bold">Profile Page</h3>
      <Link href={"/"}>Home Page</Link>
    </section>
  );
};

export default Profile;

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

  // authorized user return session
  return {
    props: { session },
  };
}
