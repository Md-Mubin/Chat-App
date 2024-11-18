import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { RiArrowRightWideLine } from 'react-icons/ri'
import { Bounce, toast } from 'react-toastify'

const Login = ({ slideBack }) => {

    const [show, setShow] = useState(false)

    const [formData, setFormData] = useState({ email: "", password: "" })
    const [formError, setFormError] = useState({ emailError: "", passwordError: "" })

    const auth = getAuth()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.email) {
            setFormError((prev) => ({ ...prev, emailError: "Enter Your Registered Email" }))
        }
        if (!formData.password) {
            setFormError((prev) => ({ ...prev, passwordError: "Enter Your Password" }))
        }
        else {
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    if (user.emailVerified === false) {
                        // --- email is not varified toast
                        toast.error('Email is not varified', {
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
                    } else {
                        // --- email is not varified toast
                        toast.success('Login Successful 😁✌️', {
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
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode)
                    if (errorCode == "auth/invalid-credential") {
                        // --- if password does not match
                        toast.error('Something is Wrong!🤔', {
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
                    }

                    if (errorCode == "auth/user-disabled") {
                        // --- if user has been diabled 
                        toast.error('Profile is Disabled', {
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
                    }
                });
        }
    }

    return (
        <>
            <section className='loginSection'>
                <h6>Login</h6>
                <form onSubmit={handleSubmit}>
                    <div className="emailLogin">
                        <input type="email"

                            placeholder='example@gmail.com'

                            onChange={(e) => (setFormData((prev) => ({ ...prev, email: e.target.value })), setFormError((prev) => ({ ...prev, emailError: "" })))}
                        />

                        <p className="error">{formError.emailError}</p>
                    </div>

                    <div className="passLogin">
                        <input type={show ? "text" : "password"}

                            placeholder='Password...'

                            onChange={(e) => (setFormData((prev) => ({ ...prev, password: e.target.value })), setFormError((prev) => ({ ...prev, passwordError: "" })))}
                        />

                        <p className="error">{formError.passwordError}</p>

                        {/* for toggle password show and !show */}
                        <button type='button' onClick={() => setShow(!show)} className='showPassButton'>
                            {
                                show ?
                                    <FaRegEye />
                                    :
                                    <FaRegEyeSlash />
                            }
                        </button>
                    </div>

                    <button className='loginButton'>Login</button>
                </form>
                <button className='slideBack' onClick={slideBack}><RiArrowRightWideLine /></button>
            </section>
        </>
    )
}

export default Login