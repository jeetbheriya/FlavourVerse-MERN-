import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'

function MainNavigation() {
  return (
    <> 
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default MainNavigation