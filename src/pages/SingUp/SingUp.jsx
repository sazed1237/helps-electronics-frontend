import React, { useState } from 'react';
import signinIcon from '../../assets/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { imageTobase64 } from '../../utils/imageTobase64';
import summaryApi from '../../common/api';
import { toast } from 'react-toastify';


const SingUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [profilePhoto, setProfilePhoto] = useState()
    const navigate = useNavigate()


    const handleUploadPhoto = async (event) => {
        const file = event.target.files[0]

        const profilePhoto = await imageTobase64(file)
        console.log('profile photo', profilePhoto)
        setProfilePhoto(profilePhoto)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const confirmPassword = form.confirmPassword.value

        if (password === confirmPassword) {
            const userData = { name, email, password, profilePhoto }

            console.log('userData', userData)

            const dataResponse = await fetch(summaryApi.singUp.url, {
                method: summaryApi.singUp.method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const data = await dataResponse.json()
            console.log("data in data response", data)

            if (data.success) {
                toast.success(data.message)
                navigate('/login')
            } else {
                toast.error(data.message)
            }

        } else {
            throw new Error("Password doesn't match")
        }

    }

    return (
        <div className='container mx-auto p-4'>
            <div className='bg-white p-5 w-full max-w-md mx-auto '>
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full '>
                    <div>
                        <img src={profilePhoto || signinIcon} alt="" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label >
                            <div className='text-center w-full text-xs bg-slate-300 pb-2 bg-opacity-80 absolute bottom-0 cursor-pointer'>
                                <span>Upload<br />photo</span>
                                <input type="file" name="profilePic" className='hidden' onChange={handleUploadPhoto} />
                            </div>
                        </label>
                    </form>
                </div>

                <form className='mt-7' onSubmit={handleSubmit}>
                    <div>
                        <div className='text-md mb-3'>
                            <label htmlFor="">Name</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="name" name="name" placeholder='Enter your name' className='w-full h-full outline-none bg-transparent' required />
                            </div>
                        </div>

                        <div className='text-md mb-3'>
                            <label htmlFor="">Email</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email" name="email" placeholder='Enter your email' className='w-full h-full outline-none bg-transparent' required />
                            </div>
                        </div>

                        <div className='text-md mb-3'>
                            <label htmlFor="">Password</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? 'text' : 'password'} name="password" placeholder='Enter your password' className='w-full h-full outline-none bg-transparent' required />
                                <div className='text-xl cursor-pointer' onClick={() => setShowPassword(previous => !previous)}>
                                    <span>
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='text-md'>
                            <label htmlFor="">Confirm Password</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? 'text' : 'password'} name="confirmPassword" placeholder='Enter your confirm password' className='w-full h-full outline-none bg-transparent' required />
                            </div>
                        </div>

                        <input className='btn bg-red-500 px-3 py-1 rounded-sm text-white mt-5 w-full max-w-[100px] hover:bg-red-600 hover:scale-110 transition-all mx-auto block' type="submit" value="Sing Up" />
                    </div>
                </form>
                <p className='py-5'>Already have an account ? <Link to={'/login'} className='text-red-500 font-semibold hover:underline'>Login</Link></p>
            </div>
        </div>
    );
};

export default SingUp;