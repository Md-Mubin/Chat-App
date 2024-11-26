import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { GoGear } from 'react-icons/go'
import { GiExitDoor } from 'react-icons/gi'
import { FaRegUserCircle } from 'react-icons/fa'
import { PiMoonDuotone, PiSunDuotone } from 'react-icons/pi'
import { FaUsersViewfinder } from 'react-icons/fa6'

const Navbar = () => {

    // ==================== All useStates Hooks
    const [darkmode, setDarkmode] = useState(false)

    // ========== saving the mode when user visitor
    useEffect(() => {
        const savedMode = localStorage.getItem("mode") || "light";
        
        localStorage.setItem("mode", savedMode);
        document
            .querySelector("html")
            .classList.toggle("dark", savedMode === "dark");
    }, []);

    // ========== changing the mode on toggle
    const handelMode = () => {
        if (localStorage.getItem("mode") == "light") {
            localStorage.setItem("mode", "dark");
            document
                .querySelector("html")
                .classList.add("dark");
            setDarkmode(!darkmode);
        } else {
            localStorage.setItem("mode", "light");
            document
                   .querySelector("html")
                   .classList.remove("dark");
            setDarkmode(!darkmode);
        }
    };

    // ========== Navigation function
    const navigate = useNavigate()

    // ========== Logout Handle
    const handleLogout = () => {
        localStorage.removeItem("currentUser")
        navigate("/userCreate")
    }

    return (
        <>
            <nav>

                {/* ========== Navbar Items ========== */}
                <ul>
                    <Link className='hover:text-blue-500' to={"/allUsers"}><FaUsersViewfinder /> <span>Users</span> </Link>
                    <Link className='hover:text-blue-500' to={"/massages"}><IoChatboxEllipsesOutline /> <span>Chats</span> </Link>
                    <Link className='hover:text-purple-400' to={"/"}><FaRegUserCircle /> <span>Profile</span> </Link>
                    <Link className='hover:text-black dark:hover:text-white' to={"/settings"}><GoGear /> <span>Settings</span> </Link>
                    <button className='hover:text-red-600 h-fit' onClick={handleLogout}><GiExitDoor /> <span>Log Out</span> </button>
                </ul>

                {/* ========== Darkmode Toggle Button ========== */}
                <button className='mt-10' onClick={handelMode}>
                    {
                        darkmode ?
                            <PiSunDuotone />
                            :
                            <PiMoonDuotone />
                    }

                    <span>
                        {
                            darkmode ?
                                "Light Mode"
                                :
                                "Dark Mode"
                        }
                    </span>
                </button>
            </nav>
        </>
    )
}

export default Navbar