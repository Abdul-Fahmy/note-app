import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext()

export default function UserProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'))

    function logOut() {
        setToken(null)
        localStorage.removeItem('token')

    }

    return <UserContext.Provider value={{token,setToken,logOut}}>{children}</UserContext.Provider>
}
