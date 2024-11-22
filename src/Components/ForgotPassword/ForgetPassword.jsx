import React, { useState } from 'react'
import './ForgetPassword.css'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { Bounce, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const ForgetPassword = () => {

    const [resetEmail, setResetEmail] = useState("")
    const [resetEmailError, setResetEmailError] = useState("")

    const auth = getAuth()

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

    return (
        <>
            <section>
                <div className="container">
                    <form className='resetPassword relative'>

                        <input

                            type="email"

                            placeholder='Reset Password Email...'

                            onChange={(e) => { setResetEmail(e.target.value), setResetEmailError("") }}

                        />

                        <div className="resetEmailError">{resetEmailError}</div>

                        <Link className='ml-[-20%] hover:scale-105 duration-200 will-change-transform mt-2' to={'/'}>← Go back</Link>

                        <button onClick={handleResetPassword}>Reset Password</button>

                    </form>
                </div>
            </section>
        </>
    )
}

export default ForgetPassword