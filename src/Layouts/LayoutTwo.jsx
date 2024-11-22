import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'

const LayoutTwo = () => {
    return (
        <>
            <div className="flex justify-center ">
                <Outlet />
                <Navbar />
            </div>
        </>
    )
}

export default LayoutTwo