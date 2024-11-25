import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './Login.css'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { RiArrowRightWideLine } from 'react-icons/ri'
import { Bounce, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userDataReducers } from '../../Slices/UserSlice'
import { getDatabase, ref, set } from "firebase/database";

const Login = ({ slideBack }) => {

    // ==================== All useStates Hooks
    const [show, setShow] = useState(false)

    // --- for form data useState
    const [loginData , setloginData]  = useState({ email: "", password: "" })
    const [loginError, setloginError] = useState({ emailError: "", passwordError: "" })

    const auth = getAuth() // for firebase authentications

    const db = getDatabase() // for firebase real time database

    const navigate = useNavigate() // for navigate to other page

    const dispatch = useDispatch() // for sending sata to redux reducers

    // for form submit function
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!loginData.email) { // if email input is empty
            setloginError((prev) => ({ ...prev, emailError: "Enter Your Registered Email" }))
        }
        if (!loginData.password) { // if password input is empty
            setloginError((prev) => ({ ...prev, passwordError: "Enter Your Password" }))
        }
        else {
            signInWithEmailAndPassword(auth, loginData.email, loginData.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    // if email is not varified 
                    if (user.emailVerified === false) {

                        toast.error('Email is not varified', { // email is not varified toast massage
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
                    else {

                        toast.success('Login Successful 😁✌️', { // login successful toast massage
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

                        navigate("/") // navigating to home

                        dispatch(userDataReducers(user)) // sending user data to redux's reducers to update the store

                        localStorage.setItem("currentUser", JSON.stringify(user)) // to save login user's data in local storage

                        set(ref(db, 'allUsers/' + user.uid), { // write data in firebase's realtime database
                            userName: user.displayName,
                            userImage : user.photoURL
                        })
                    }
                })
                .catch((error) => {

                    // error code from firebase
                    const errorCode = error.code;

                    // if email/password doesn't match
                    if (errorCode == "auth/invalid-credential") {

                        toast.error('Something is Wrong!🤔', { // something wrong toast massage
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

                    // if email is disabled 
                    if (errorCode == "auth/user-disabled") {

                        toast.error('Profile is Disabled', { // profile is disabled toast massage
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

                {/* login form */}
                <form onSubmit={handleSubmit}>

                    {/* email part */}
                    <div className="emailLogin">
                        <input type="email"

                            placeholder='example@gmail.com'

                            onChange={(e) => (setloginData((prev) => ({ ...prev, email: e.target.value })), setloginError((prev) => ({ ...prev, emailError: "" })))}
                        />

                        <p className="error">{loginError.emailError}</p>
                    </div>

                    {/* password part */}
                    <div className="passLogin">
                        <input type={show ? "text" : "password"}

                            placeholder='Password...'

                            onChange={(e) => (setloginData((prev) => ({ ...prev, password: e.target.value })), setloginError((prev) => ({ ...prev, passwordError: "" })))}
                        />

                        <p className="error">{loginError.passwordError}</p>

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

                    <Link to={"/forgetPassword"} className="forgotPassword">Forgot Password?</Link>

                    {/* login button */}
                    <button className='loginButton block'>Login</button>

                </form>

                <button className='slideBack' onClick={slideBack}><RiArrowRightWideLine /></button>

            </section>
        </>
    )
}

export default Login