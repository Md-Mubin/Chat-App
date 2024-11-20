// ====================== All Imports
import                                  './Register.css'
import React, { useState }         from 'react'
import { ClipLoader }              from 'react-spinners'
import { Bounce, toast }           from 'react-toastify'
import { RiArrowRightWideLine }    from 'react-icons/ri'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'

const Register = ({ slideBack }) => {

    // ==================== All useStates Hooks
    const [show  , setShow]   = useState(false)
    const [reShow, setReShow] = useState(false)
    const [spiner, setSpiner] = useState(false)

    // --- for form data useState
    const [formData , setFormData]  = useState({ userName: "", email: "", password: "" })
    const [formError, setFormError] = useState({ userNameError: "", emailError: "", passwordError: "" })

    const auth = getAuth() // for firebase authentications

    // for form submit function
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.userName) { // if username input is empty
            setFormError((prev) => ({ ...prev, userNameError: "Please Enter Your Name" }))
        }
        if (!formData.email) { // if email input is empty
            setFormError((prev) => ({ ...prev, emailError: "Please Enter Your Email" }))
        }
        if (!formData.password) { // if password input is empty
            setFormError((prev) => ({ ...prev, passwordError: "Please Give A Password" }))
        }
        else {

            setSpiner(true) // for spinner turns on

            // create users in firebase
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user; // user

                    updateProfile(auth.currentUser, {
                        displayName: formData.userName,
                        photoURL: "images/default_profile_id.png"

                    }).then(() => {
                        // Profile updated!
                        sendEmailVerification(auth.currentUser)
                            .then(() => {

                                setSpiner(false) // for spinner turns off

                                // --- Email Verification Sent Toast
                                toast.success('Email Verified Send', { // email verified send toast massage
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
                            });

                    })
                })
                .catch((error) => {
                    const errorCode = error.code;

                    setSpiner(false) // for spinner turns off

                    if (errorCode == "auth/email-already-in-use") {

                        // --- Email Alreday in Used Toast
                        toast.info('Email is already in use', { // email already in use toast massage
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

                    // if password is lower than 6 charecter
                    if(errorCode == "auth/weak-password"){

                       setFormError((prev)=>({...prev, passwordError: "Weak Password"})) 
                    }
                });
        }
    }

    return (
        <>
            <section className='registerSection'>
                <h6>Register</h6>

                {/* register form */}
                <form>

                    {/* user name */}
                    <div className="userName">
                        <input type="text"

                            placeholder='user name. . .'

                            onChange={(e) => (setFormData((prev) => ({ ...prev, userName: e.target.value })), setFormError((prev) => ({ ...prev, userNameError: "" })))} // onchange of username input
                        />

                        {/* user name input error */}
                        <p className='error'>{formError.userNameError}</p>
                    </div>

                    {/* email part */}
                    <div className="emailRegister">
                        <input type="email"

                            placeholder='example...@gmail.com'

                            onChange={(e) => (setFormData((prev) => ({ ...prev, email: e.target.value })), setFormError((prev) => ({ ...prev, emailError: "" })))} // onchange of email input
                        />

                        {/* email input error */}
                        <p className="error">{formError.emailError}</p>
                    </div>

                    {/* password part */}
                    <div className="passRegister">
                        <input type={show ? "text" : "password"}

                            placeholder='Password. . .'

                            onChange={(e) => (setFormData((prev) => ({ ...prev, password: e.target.value })), setFormError((prev) => ({ ...prev, passwordError: "" })))} // onchange of password input
                        />

                        {/* password input error */}
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

                    {/* re-password part */}
                    <div className="re-passRegister">
                        <input type={reShow ? "text" : "password"}

                            value={formData.password}

                            readOnly // can not change the value menually

                            placeholder='Re-Enter Password. . .'
                        />

                        {/* for toggle password show and !show */}
                        <button type='button' onClick={() => setReShow(!reShow)} className='showPassButton'>
                            {
                                reShow ?
                                    <FaRegEye />
                                    :
                                    <FaRegEyeSlash />
                            }
                        </button>
                    </div>

                    {/* register submit button */}
                    {
                        spiner ?
                            <button type='button' className='registerButton pt-2'><ClipLoader color='#fff' /></button>
                            :
                            <button onClick={handleSubmit} className='registerButton'>Register</button>
                    }

                </form>

                <button className='slideBack' onClick={slideBack}><RiArrowRightWideLine /></button>

            </section>
        </>
    )
}

export default Register