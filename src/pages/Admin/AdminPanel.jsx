import React from 'react';
import { FaRegEdit, FaRegUserCircle, FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    // console.log(user.role)



    return (
        <div className="min-h-[calc(100vh-120px)] md:flex hidden">
            <aside className='bg-white min-h-full w-full max-w-60 drop-shadow-4xl'>

                <div className='flex flex-col justify-center items-center h-32 bg-slate-600'>
                    <div className="text-5xl cursor-pointer">
                        {
                            user ? <img className="h-16 w-16 rounded-full" src={user.profilePhoto} alt={user.name} /> : <FaRegUserCircle />
                        }
                    </div>
                    <div className='text-center'>
                        <p className='text-white font-semibold text-xl'>{user?.name}</p>
                        <span className='text-green-500 font-bold'>{user?.role}</span>
                    </div>
                </div>

                {/* navigation */}
                <div className=' mt-4'>
                    <nav className='grid'>
                        <Link to={'/admin-panel/all-users'} className='hover:bg-slate-300 px-3 py-1 flex items-center gap-2' ><FaUsers /> All Users</Link>
                        <Link to={'/admin-panel/add-product'} className='hover:bg-slate-300 px-3 py-1 flex items-center gap-2' ><IoMdAdd /> Add Product</Link>
                        <Link to={'/admin-panel/manage-product'} className='hover:bg-slate-300 px-3 py-1 flex items-center gap-2' ><FaRegEdit /> Manage Product</Link>
                    </nav>
                </div>

            </aside>
            <main className='p-4 w-full h-full'>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default AdminPanel;