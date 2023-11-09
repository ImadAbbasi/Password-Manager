import React from "react";
import Layout from "@/layout/Layout";

const Generate = () => {
  return (
    <Layout>
      <div>Generate Password</div>
    </Layout>
  );
};

export default Generate;

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
