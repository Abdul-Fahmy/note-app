import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

export default function Layout() {
  return (
   <>
    <NavBar/>
   <div className="min-h-screen">
    <Outlet/>
   </div></>
  )
}
