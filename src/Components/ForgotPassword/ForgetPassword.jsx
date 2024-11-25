import React, { useState } from 'react'
import './ForgetPassword.css'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { Bounce, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {

    // =============== All Hooks
    const [resetEmail, setResetEmail] = useState("")
    const [resetEmailError, setResetEmailError] = useState("")
    
    const auth = getAuth() // authentication from firebase

    // =============== reset password button function
    const handleResetPassword = (e) => {
        e.preventDefault()

        if (!resetEmail) {
            setResetEmailError("Enter Email to Reset Password")
        } else {
            sendPasswordResetEmail(auth, resetEmail)
                .then(() => {
                    toast.info('Password Reset Massgae Send!', { // passowrd reset massage
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
    }

    // =============== function will run after pressing "Enter" 
    const handleEnter = (e)=>{
        if(e.key == "Enter"){
            handleResetPassword(e)
        }
    }

    return (
        <>
            <section>
                <div className="container">
                    <form className='resetPassword relative'>

                        <input

                            type="email"

                            placeholder='Reset Password Email...'

                            onKeyDown={(e)=>handleEnter(e)}

                            onChange={(e) => { setResetEmail(e.target.value), setResetEmailError("") }}

                        />

                        <div className="resetEmailError">{resetEmailError}</div>

                        <Link className='goBack' to={'/userCreate'}>← Go back</Link>

                        <button onClick={handleResetPassword}>Reset Password</button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default ForgetPassword