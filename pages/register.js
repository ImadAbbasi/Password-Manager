import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/layout/layout";
import Link from "next/link";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import styles from "../styles/login.module.css";
import { useFormik } from "formik";
import { register_validate } from "@/lib/validate";
import { useRouter } from "next/router";

const Register = () => {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: register_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000");
      });
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        {/* title */}
        <div className="title">
          <h1 className="text-gray-800 text-3xl font-bold">Rgister Now</h1>
        </div>

        {/* form */}
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="input-group flex items-center border rounded-xl relative">
            <input
              type="text"
              name="username"
              autoComplete="off"
              placeholder="Username"
              className={`${styles.input_text}
                w-full py-2 px-4 rounded-xl bg-slate-100 focus:outline-none border-none`}
              {...formik.getFieldProps("username")}
            />
            <span className="px-4">
              <HiOutlineUser size={20} />
            </span>
          </div>
          {formik.errors.username && formik.touched.username ? (
            <span className="text-xs text-red-500">
              {formik.errors.username}
            </span>
          ) : (
            <></>
          )}
          <div className="input-group flex items-center border rounded-xl relative">
            <input
              type="email"
              name="email"
              autoComplete="on"
              placeholder="Email"
              className={`${styles.input_text}
                w-full py-2 px-4 rounded-xl bg-slate-100 focus:outline-none border-none`}
              {...formik.getFieldProps("email")}
            />
            <span className="px-4">
              <HiAtSymbol size={20} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-xs text-red-500">{formik.errors.email}</span>
          ) : (
            <></>
          )}
          <div className="input-group flex items-center border rounded-xl relative">
            <input
              type={`${!show.password ? "password" : "text"}`}
              name="password"
              placeholder="Password"
              autoComplete="off"
              className={`${styles.input_text}
                w-full py-2 px-4 rounded-xl bg-slate-100 focus:outline-none border-none`}
              {...formik.getFieldProps("password")}
            />
            <span
              className="px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={20} className="" />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          ) : (
            <></>
          )}
          <div className="input-group flex items-center border rounded-xl relative">
            <input
              type={`${!show.cpassword ? "password" : "text"}`}
              name="cpassword"
              autoComplete="off"
              placeholder="Confirm Password"
              className={`${styles.input_text}
                w-full py-2 px-4 rounded-xl bg-slate-100 focus:outline-none border-none`}
              {...formik.getFieldProps("cpassword")}
            />
            <span
              className="px-4"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <HiFingerPrint size={20} className="" />
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-xs text-red-500">
              {formik.errors.cpassword}
            </span>
          ) : (
            <></>
          )}

          {/* login button */}
          <div className="input-button">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-fuchsia-300 border rounded-md py-2 text-gray-50 text-lg font-semibold hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 hover:border duration-300"
            >
              Register
            </button>
          </div>
        </form>

        {/* register link */}
        <p className="text-center text-gray-400">
          Already havve an account?{" "}
          <Link href={"/login"}>
            <span className="text-blue-400 hover:text-fuchsia-400 hover:underline underline-offset-4">
              Sign In
            </span>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Register;
