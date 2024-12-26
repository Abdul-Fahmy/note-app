import { useContext, useState } from "react";
import { NoteContext } from "../../context/Note.context";
import { Drawer } from "flowbite-react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { UserContext } from "../../context/User.context";
import axios from "axios";

export default function NoteDetails({noteInfo }) {
    let {title, content,_id} = noteInfo;
    const {token} = useContext(UserContext)
    const {deleteNote,getUserNotes } = useContext(NoteContext)

     const [isOpen, setIsOpen] = useState(false);
    
      const handleClose = () => setIsOpen(false);

      const customTheme = {
        root: {
          base: "fixed z-40 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800",
          backdrop: "fixed inset-0 z-30 bg-gray-900/50 dark:bg-gray-900/80",
          edge: "bottom-16",
          position: {
            top: {
              on: "left-0 right-0 top-0 w-full transform-none",
              off: "left-0 right-0 top-0 w-full -translate-y-full",
            },
            right: {
              on: "right-0 top-0 h-screen w-80 transform-none",
              off: "right-0 top-0 h-screen w-80 translate-x-full",
            },
            bottom: {
              on: "bottom-0 left-0 right-0 w-full transform-none",
              off: "bottom-0 left-0 right-0 w-full translate-y-full",
            },
            left: {
              on: "left-0 top-0 h-screen w-80 transform-none",
              off: "left-0 top-0 h-screen w-80 -translate-x-full",
            },
          },
        },
        header: {
          inner: {
            closeButton:
              "absolute end-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-black-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
            closeIcon: "h-6 w-6",
            titleIcon: "me-2.5 h-8 w-8",
            titleText:
              "mb-4 inline-flex items-center text-2xl font-semibold text-black-500 dark:text-white-400",
          },
          collapsed: {
            on: "hidden",
            off: "block",
          },
        },
        items: {
          base: "",
        },
      };

      async function onSubmit(values) {
        let toastId = toast.loading("Waiting...");
        const options = {
          url: `https://note-sigma-black.vercel.app/api/v1/notes/${_id}`,
          method: "PUT",
          headers: {
            token: `3b8ny__${token}`,
          },
          data: values,
        };
    
        try {
          let { data } = await axios.request(options);
          if (data.msg === "done") {
            toast.success("Note Updated successfully");
            getUserNotes();
          }
        } catch (error) {
          console.log(error);
        } finally {
          toast.dismiss(toastId);
        }
      }
    
    
    
      let formik = useFormik({
        initialValues: {
          title: title,
          content: content,
        },
        onSubmit,
      });




  return (
    <>
      <div>
        <div className="card-item grow flex flex-col justify-center items-start bg-gray-100 py-4 px-6 rounded-lg gap-8">
          <div className="px-3 space-y-4 w-full">
          <div className="title flex justify-start items-center gap-3">
          <h2 className="font-semibold uppercase">Title :</h2>
          <p>{title}</p>
          </div>
          <div className="content border-solid border-gray-300 rounded-md border px-3 py-1">
            <h3 className="font-semibold uppercase">Content:</h3>
            <p>{content}</p>
          </div>
          </div>
          <div className="buttons flex items-center gap-4">
          <button onClick={()=>{
            deleteNote({id:_id})
          }} className="btn bg-red-600 hover:bg-red-700 transition-colors duration-300">
          Delete
        </button>
        <button
        onClick={()=>{
          setIsOpen(true)
        }}
        className="btn bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300">
          Update
        </button>
          </div>
        </div>
        
      </div>

       <Drawer theme={customTheme} open={isOpen} onClose={handleClose}>
              <Drawer.Header title="Note App" />
              <Drawer.Items>
                <h3 className="mb-2 font-semibold">Add Your Note :</h3>
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                  <div className="title">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Your Note Title"
                      name="title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                  </div>
                  <div className="content">
                    <textarea
                      className="form-control"
                      name="content"
                      placeholder="Enter Your Note Content"
                      rows={4}
                      onChange={formik.handleChange}
                      value={formik.values.content}
                    ></textarea>
                  </div>
                  <button
                    onClick={() => {
                      setTimeout(() => {
                        handleClose();
                      }, 1000);
                    }}
                    type="submit"
                    className="btn bg-gray-800 hover:bg-gray-950"
                  >
                    {" "}
                    Update Note
                  </button>
                </form>
              </Drawer.Items>
            </Drawer>
    </>
  );
}
