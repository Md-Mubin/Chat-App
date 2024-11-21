import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { Bounce, toast } from 'react-toastify'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { GoGear } from 'react-icons/go'
import { GiExitDoor } from 'react-icons/gi'
import { FaRegUserCircle } from 'react-icons/fa'
import { PiMoonDuotone, PiSunDuotone } from 'react-icons/pi'

const Navbar = () => {

    const [darkmode, setDarkmode] = useState(false)

    useEffect(() => {
        if (darkmode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [darkmode])

    const auth = getAuth()

    const handleLogout = () => {
        signOut(auth).then(() => {
            toast.info('Log-Out Complete', { // logout successful toast massage
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        })
    }

    return (
        <>
            <nav>
                <ul>
                    <Link className='hover:text-blue-500' to={"/massages"}><IoChatboxEllipsesOutline /> <span>Chats</span> </Link>
                    <Link className='hover:text-purple-400' to={"/userProfile"}><FaRegUserCircle /> <span>Profile</span> </Link>
                    <Link className='hover:text-black dark:hover:text-white'to={"/settings"}><GoGear /> <span>Settings</span> </Link>
                    <Link className='hover:text-red-600' onClick={handleLogout} to={"/"}><GiExitDoor /> <span>Log Out</span> </Link>
                </ul>

                <button onClick={() => setDarkmode(!darkmode)}>
                    {
                        darkmode ?
                            <PiSunDuotone />  
                            :
                            <PiMoonDuotone /> 
                    }

                    <span>
                        {
                            darkmode?
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