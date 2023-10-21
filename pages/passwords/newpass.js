import SubNav from "@/components/SubNav";
import React, { useState } from "react";
import Layout from "@/layout/Layout";
import styles from "@/styles/login.module.css";
import { useFormik } from "formik";

import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { CgWebsite } from "react-icons/cg";

import { add_pass_validate } from "@/lib/validate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const New = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const formik = useFormik({
    initialValues: {
      site: "",
      username: "",
      email: "",
      password: "",
    },
    validate: add_pass_validate,
    onSubmit,
  });
  // const allData = { ...values, ref: session?.user?.email };
  // console.log(allData);

  async function onSubmit(values) {
    const dataToSend = {
      ...values,
      ref: session?.user?.email,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    };
    await fetch("http://localhost:3000/api/passwords/addPass", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000/passwords");
      });
  }

  return (
    <Layout>
      <SubNav
        link1="All Passwords"
        link2="Add Password"
        path1="/passwords"
        path2="/passwords/newpass"
      />
      <section className="w-2/4 mx-auto my-10 flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-2xl font-bold text-center">
            Add a New Password
          </h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <div className="flex items-center border rounded-xl border-gray-400">
              <input
                type="text"
                name="site"
                autoComplete="off"
                placeholder="Site Name"
                className={`${styles.input_text} w-full py-2 px-4 rounded-xl focus:outline-none border-none border bg-inherit`}
                {...formik.getFieldProps("site")}
              />
              <span className="px-4">
                <CgWebsite size={20} />
              </span>
            </div>
            <div className="h-3 text-center">
              {formik.errors.site && formik.touched.site ? (
                <span className="text-red-500 text-xs">
                  {formik.errors.site}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center border rounded-xl border-gray-400">
              <input
                type="text"
                name="username"
                autoComplete="off"
                placeholder="Username"
                className={`${styles.input_text} w-full py-2 px-4 rounded-xl focus:outline-none border-none border bg-inherit`}
                {...formik.getFieldProps("username")}
              />
              <span className="px-4">
                <HiOutlineUser size={20} />
              </span>
            </div>
            <div className="h-3 text-center">
              {formik.errors.username && formik.touched.username ? (
                <span className="text-red-500 text-xs">
                  {formik.errors.username}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center border rounded-xl border-gray-400">
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Email"
                className={`${styles.input_text} w-full py-2 px-4 rounded-xl focus:outline-none border-none border bg-inherit`}
                {...formik.getFieldProps("email")}
              />
              <span className="px-4">
                <HiAtSymbol size={20} />
              </span>
            </div>
            <div className="h-3 text-center">
              {formik.errors.email && formik.touched.email ? (
                <span className="text-red-500 text-xs">
                  {formik.errors.email}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center border rounded-xl border-gray-400">
              <input
                type={`${!show ? "password" : "text"}`}
                name="password"
                autoComplete="off"
                placeholder="Password"
                className={`${styles.input_text} w-full py-2 px-4 rounded-xl focus:outline-none border-none border bg-inherit`}
                {...formik.getFieldProps("password")}
              />
              <span className="px-4" onClick={() => setShow(!show)}>
                <HiFingerPrint size={20} />
              </span>
            </div>
            <div className="h-3 text-center">
              {formik.errors.password && formik.touched.password ? (
                <span className="text-red-500 text-xs">
                  {formik.errors.password}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-400 border text-white rounded-xl py-2 text-lg font-semibold hover:bg-gray-100 hover:border-blue-300 hover:text-blue-400 hover:border-2 duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default New;
