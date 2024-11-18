import React, { useState } from 'react'
import './Welcome.css'
import Register from '../Register/Register'
import Login from '../Login/Login'

const Welcome = () => {

    const [slideShow, setSlideShow] = useState(false)

    const [regShow, setRegShow] = useState(false)

    const [loginShow, setLoginShow] = useState(false)

    const handleRegButton = () => {
        setRegShow(true)
        setSlideShow(true)
        setLoginShow(false)
    }

    const handleLoginButton = () => {
        setLoginShow(true)
        setSlideShow(true)
        setRegShow(false)
    }

    return (
        <>
            <section className='welcomeSection'>

                <ul className='welcomeRow'>
                    <h1>Welcome to Mubin's Domain</h1>
                    <img src="images/hello_icon.gif" alt="hello_image" />
                    <p>Hello User. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, doloremque!</p>
                    <li>Don't Have Account? Please<button onClick={handleRegButton}>Register→</button></li>
                    <li>Already Have Account? Go To<button onClick={handleLoginButton}>Login→</button></li>
                </ul>


                <ul className={`flex relative ${slideShow ? "duration-500 mr-[-35%]" : "mr-[-80%] duration-500"}`}>

                    <li className={regShow ? "duration-500 translate-x-[30px]" : "translate-x-[700px] duration-500"}>
                        <Register slideBack={()=>setSlideShow(!slideShow)}/>
                    </li>

                    <li className={loginShow ? "duration-500 translate-x-[-670px]" : "translate-x-[700px] duration-500"}>
                        <Login slideBack={()=>setSlideShow(!slideShow)}/>
                    </li>

                </ul>
            </section>
        </>
    )
}

export default Welcome