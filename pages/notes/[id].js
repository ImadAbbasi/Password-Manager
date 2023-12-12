import Layout from "@/layout/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { add_note_validate } from "@/lib/validate";

import { IoMdArrowBack } from "react-icons/io";

const NoteDetails = () => {
  const [note, setNote] = useState({});
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: {
      title: "",
      note: "",
    },
    validate: add_note_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/editNotes?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const data = await response.json();
      setNote(data.updatedNote);
      router.reload();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  useEffect(() => {
    const fetchNoteDetails = async () => {
      if (session && id) {
        try {
          const response = await fetch(`http://localhost:3000/api/notes/${id}`);
          const data = await response.json();
          setNote(data);
          formik.setValues({
            title: data.title,
            note: data.note,
          });
        } catch (error) {
          console.error("Error Fetching Data!", error);
        }
      }
    };

    fetchNoteDetails();
  }, [session, id]);

  return (
    <Layout>
      <div>
        <div>
          <Link href="/notes">
            <button className="bg-gray-100 p-2 md:p-3 mb-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              <IoMdArrowBack size={25} />
            </button>
          </Link>
        </div>
        <div className="bg-gray-100 p-4 md:p-5 w-full rounded-md shadow-sm flex flex-col justify-between gap-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="">
              <h2 className="text-lg lg:text-2xl font-semibold">Title</h2>
              <input
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full py-1 mt-2 px-4 rounded-xl focus:outline-blue-400 border-2 bg-inherit"
              />
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
            <div className="">
              <h2 className="text-lg lg:text-2xl font-semibold">Note</h2>
              <textarea
                name="note"
                autoComplete="off"
                placeholder="Title"
                value={formik.values.note}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full py-1 mt-2 px-4 rounded-xl focus:outline-blue-400 border-2 bg-inherit"
              />
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
            <div className="flex gap-2 justify-center md:justify-end mt-4">
              <button
                type="button"
                className="py-1 px-3 border-2 border-blue-400 bg-blue-400 hover:bg-inherit text-sm md:text-base hover:text-blue-400 rounded-md text-white font-semibold transition-all duration-300 shadow-md"
                onClick={formik.resetForm}
              >
                Reset
              </button>
              <button
                type="submit"
                className="py-1 px-3 border-2 border-fuchsia-400 bg-fuchsia-400 hover:bg-inherit text-sm md:text-base hover:text-fuchsia-400 rounded-md text-white font-semibold transition-all duration-300 shadow-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        {/* Add more details as needed */}
      </div>
    </Layout>
  );
};

export default NoteDetails;
