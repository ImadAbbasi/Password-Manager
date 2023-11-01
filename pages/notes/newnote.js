import SubNav from "@/components/SubNav";
import React from "react";
import Layout from "@/layout/Layout";
import { useFormik } from "formik";
import { add_note_validate } from "@/lib/validate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NewNote = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: "",
      note: "",
    },
    validate: add_note_validate,
    onSubmit,
  });

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
    await fetch("http://localhost:3000/api/notes/addNotes", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000/notes");
      });
    // console.log(values);
  }

  return (
    <Layout>
      <SubNav
        link1="All Notes"
        link2="Add Note"
        path1="/notes"
        path2="/notes/newnote"
      />
      <section className="w-2/4 mx-auto my-10 flex flex-col gap-5">
        <div className="title">
          <h1 className="text-gray-800 text-2xl font-bold text-center">
            Add a New Note
          </h1>
        </div>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <div className="border rounded-xl border-gray-400">
              <input
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Title"
                className="w-full py-2 px-4 rounded-xl focus:outline-none border-none border bg-inherit"
                {...formik.getFieldProps("title")}
              />
            </div>
            <div className="h-3 text-center">
              {formik.errors.title && formik.touched.title ? (
                <span className="text-red-500 text-xs">
                  {formik.errors.title}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <div>
              <textarea
                cols="35"
                rows="5"
                name="note"
                autoComplete="off"
                placeholder="Add Note..."
                className="w-full py-2 px-4 rounded-xl focus:outline-none border border-gray-400 bg-inherit"
                {...formik.getFieldProps("note")}
              />
            </div>
            <div className="h-3 text-center">
              {formik.errors.note && formik.touched.note ? (
                <span className="text-red-500 text-xs">
                  {formik.errors.note}
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

export default NewNote;
