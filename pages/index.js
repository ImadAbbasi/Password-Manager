"use client";
import Head from "next/head";
import { getSession, signOut, useSession } from "next-auth/react";
import Layout from "@/layout/Layout";

export default function Home() {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <main className="flex flex-col justify-center items-center w-full">
        <div className="text-blue-400 text-3xl font-bold underline">
          Hello World!
        </div>
        <div>
          <h5>{session?.user?.name}</h5>
          <h5>{session?.user?.email}</h5>
        </div>
        <div>
          <button
            className=" mt-5 py-2 px-4 rounded-md bg-red-500 text-gray-50"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </main>
    </Layout>
  );
}

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
