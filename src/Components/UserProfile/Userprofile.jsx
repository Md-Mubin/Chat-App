import React from 'react'
import './Userprofile.css'
import { useSelector } from 'react-redux'

const Userprofile = () => {

    const userData = useSelector((state) => state.userData.value)

    return (
        <>
            <section>
                <div className="container">
                    <ul className='userCart'>
                        <ul className='userProfileHead'>
                            <img src={userData.photoURL} alt="image" className='m-auto' />
                            <li>{userData.displayName}</li>
                        </ul>
                        <ul className='userInfosCol'>
                            <li><span>Name: </span> {userData.displayName}</li>
                            <li><span>Email:</span> {userData.email}</li>
                            <li><span>Address:</span> </li>
                            <li><span>Age:</span> </li>
                            <li><span>Contact:</span> </li>
                        </ul>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Userprofile