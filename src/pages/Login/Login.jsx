import React, { useContext, useState } from 'react';
import signinIcon from '../../assets/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../../common/api';
import { toast } from 'react-toastify';
import Context from '../../context/context';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { userDetails } = useContext(Context)
    // console.log("context", authContext)


    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value

        const formData = { email, password }
        console.log(formData)

        const dataResponse = await fetch(summaryApi.singIn.url, {
            method: summaryApi.singIn.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        const data = await dataResponse.json()

        if (data.success) {
            toast.success(data.message)
            navigate('/')
            userDetails()
        } else {
            toast.error(data.message)
        }

    }


    return (
        <div className='container mx-auto p-4'>
            <div className='bg-white p-5 w-full max-w-md mx-auto '>
                <div className='w-20 h-20 mx-auto'>
                    <img src={signinIcon} alt="" />
                </div>

                <form className='mt-7' onSubmit={handleSubmit}>
                    <div>
                        <div className='text-md mb-3'>
                            <label htmlFor="">Email</label>
                            <div className='bg-slate-100 p-2'>
                                <input type="email" name="email" id="" placeholder='Enter your email' className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div className='text-md'>
                            <label htmlFor="">Password</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? 'text' : 'password'} name="password" id="" placeholder='Enter your password' className='w-full h-full outline-none bg-transparent' />
                                <div className='text-xl cursor-pointer' onClick={() => setShowPassword(previous => !previous)}>
                                    <span>
                                        {
                                            showPassword ? <FaEyeSlash /> : <FaEye />
                                        }
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='flex justify-end mt-1 text-sm hover:underline hover:text-red-600'>Forgot password ?</Link>
                        </div>
                        <input className='btn bg-red-500 px-3 py-1 rounded-sm text-white mt-5 w-full max-w-[100px] hover:bg-red-600 hover:scale-110 transition-all mx-auto block' type="submit" value="Login" />
                    </div>
                </form>
                <p className='py-5'>Don't have account ? <Link to={'/singup'} className='text-red-500 font-semibold hover:underline'>Sing up</Link></p>
            </div>
        </div>
    );
};

export default Login;