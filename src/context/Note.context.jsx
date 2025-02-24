import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const NoteContext = createContext(null)




export default function NoteProvider({children}) {
const {token} = useContext(UserContext)
    const [notesInfo, setNotes] = useState(null)
    const [notesError, setNotesError] = useState(null)

// Get Notes
async function getUserNotes() {
    const options = {
        url:'https://note-sigma-black.vercel.app/api/v1/notes',
        method:'GET',
        headers:{
            token: `3b8ny__${token}`
        }
    }

    try {
        let {data} = await axios.request(options)
        if (data.msg === 'done') {
            setNotes(data.notes)
        }
        
        
    } catch (error) {
        setNotesError(error.response.data.msg)
        
    }
}
    
// Delete Note 
async function deleteNote({id}) {
    let toastId = toast.loading("Waiting")
    const options = {
        url:`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        method:'DELETE',
        headers:{
            token:`3b8ny__${token}`
        }
    }
    try {
        let {data} = await axios.request(options)
        if (data.msg === 'done') {
            toast.success('Note Deleted Successfully')
            getUserNotes()
        }
        
    } catch (error) {
        console.log(error.response.data.msg);
        
        
    }finally{
        toast.dismiss(toastId)
    }
}    

    return <NoteContext.Provider value={{ notesInfo,deleteNote,getUserNotes,notesError,setNotesError}} >{children}</NoteContext.Provider>
}