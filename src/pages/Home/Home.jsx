import { Button, Drawer } from "flowbite-react";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";
import NoteDetails from "../../components/NoteDetails/NoteDetails";
import { NoteContext } from "../../context/Note.context";

export default function Home() {
  const { token } = useContext(UserContext);
  const {getUserNotes,notesInfo,notesError,setNotesError} = useContext(NoteContext)
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

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  async function onSubmit(values) {
    let toastId = toast.loading("Waiting...");
    const options = {
      url: "https://note-sigma-black.vercel.app/api/v1/notes",
      method: "POST",
      headers: {
        token: `3b8ny__${token}`,
      },
      data: values,
    };

    try {
      let { data } = await axios.request(options);
      if (data.msg === "done") {
        toast.success("Note Added successfully");
        values.title = '';
        values.content = ''
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
      title: '',
      content: '',
    },
    onSubmit,
  });
  //

  useEffect(() => {
    getUserNotes();
  }, [notesInfo]);

  return (
    <>
      <div className="flex  items-end justify-end mt-6 pr-5">
        <Button
          className="bg-gray-900 text-white hover:!bg-gray-950"
          onClick={() => setIsOpen(true)}
        >
          Add Note
        </Button>
      </div>
      {(notesError === "not notes found") ? <div className="container flex justify-center items-center mt-6"><h2 className="text-center font-semibold text-xl">No Notes Yet, Add your First Note by Clicking on Add Note button</h2> </div> : <div className="container mt-4">
        <div className="px-4 grid grid-cols-12 gap-8">
          {notesInfo
            ? notesInfo.map((note) => (
                <div key={note._id} className="col-span-12 md:col-span-6 lg:col-span-4">
                  <NoteDetails noteInfo={note} />
                </div>
              ))
            : <h2>loading....</h2>}
        </div>
      </div>
        
      }
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
                  setNotesError('')
                }, 1000);
              }}
              type="submit"
              className="btn bg-gray-800 hover:bg-gray-950"
            >
              {" "}
              Add Note
            </button>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
