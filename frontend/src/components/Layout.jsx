import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import React from 'react';


const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default Layout