import React from 'react'
import { useSelector } from 'react-redux'

const Userprofile = () => {

    const userData = useSelector((state)=> state.userData.value)
    console.log(userData)
    
    return (
        <>
            <section className='w-full h-screen flex flex-col items-center gap-10 mt-10'>
                <h1 className='text-center'>Welcome</h1>
                <img src={userData.photoURL} alt="" />
                <p>{userData.displayName}</p>
            </section>
        </>
    )
}

export default Userprofile