import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignUp from "./pages/SignUp/SignUp"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import GuestRoute from "./components/GuestRoute/GuestRoute"
import { Toaster } from "react-hot-toast"
import UserProvider from "./context/User.context"
import NoteProvider from "./context/Note.context"

function App() {
  const routes = createBrowserRouter([
    {
      path:'/',element:<ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
      ,children:[
        {
          index:true,element:<Home/>
        }
      ]
      ,
    },
    {
      path:'/',element:<GuestRoute>
        <Layout/>
      </GuestRoute>,
      children:[{
        path:'login',element:<Login/>,
      },
      {path:'signUp',element:<SignUp/>}
    ]
    }
  ])

  return (
    <>
    <UserProvider>
    <NoteProvider>
    <RouterProvider router={routes}>
      
      </RouterProvider>
    </NoteProvider>
    </UserProvider>
      <Toaster/>
    </>
  )
}

export default App
