import React, { useState } from "react";
import Head from "next/head";
import FormLayout from "@/layout/formLayout";
import Link from "next/link";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import styles from "../styles/login.module.css";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "@/lib/validate";
import { useRouter } from "next/router";

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  // formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
    if (status.ok) router.push(status.url);
  }

  // google handler function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000/" });
  }
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000/" });
  }

  return (
    <FormLayout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        {/* title */}
        <div className="title">
          <h1 className="text-gray-800 text-3xl font-bold">Login</h1>
        </div>

        {/* form */}
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="input-group flex items-center border rounded-xl relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="on"
              className={`${styles.input_text}
                w-full py-2 px-4 rounded-xl bg-slate-100 focus:outline-none border-none`}
              // onChange={formik.handleChange}
              // value={formik.values.email}
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
              type={`${!show ? "password" : "text"}`}
              name="password"
              placeholder="Password"
              autoComplete="off"
              className={`${styles.input_text}
                w-full py-2 px-4 rounded-xl bg-slate-100 focus:outline-none border-none`}
              // onChange={formik.handleChange}
              // value={formik.values.password}
              {...formik.getFieldProps("password")}
            />
            <span className="px-4" onClick={() => setShow(!show)}>
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

          {/* login button */}
          <div className="input-button">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-400 to-fuchsia-300 border rounded-md py-2 text-gray-50 text-lg font-semibold hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 hover:border duration-300"
            >
              Login
            </button>
          </div>

          <div className="input-button">
            <button
              type="button"
              className="w-full border py-2 flex justify-center items-center gap-2 hover:bg-gray-200 rounded-md duration-300"
              onClick={handleGoogleSignin}
            >
              Sign in with Google
              <Image
                src={"./assets/google.svg"}
                width={20}
                height={20}
                alt="google"
              ></Image>
            </button>
          </div>

          <div className="input-button">
            <button
              type="button"
              className="w-full border py-2 flex justify-center items-center gap-2 hover:bg-gray-200 rounded-md duration-300"
              onClick={handleGithubSignin}
            >
              Sign in with Github{" "}
              <Image
                src={"./assets/github.svg"}
                width={25}
                height={25}
                alt="github"
              ></Image>
            </button>
          </div>
        </form>

        {/* register link */}
        <p className="text-center text-gray-400">
          Dont't have an account yet?{" "}
          <Link href={"/register"}>
            <span className="text-blue-400 hover:text-fuchsia-400 hover:underline underline-offset-4">
              Sign Up
            </span>
          </Link>
        </p>
      </section>
    </FormLayout>
  );
};

export default Login;
