import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../context/User.context"

export default function GuestRoute({children}) {
  const {token} = useContext(UserContext) 

  if (token) {
    return <Navigate to={'/'}/>
  }else {
    return children
  }
}
