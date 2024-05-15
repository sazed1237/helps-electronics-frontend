import React, { useEffect, useState } from 'react';
import summaryApi from '../../../common/api';
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt, FaTrash, FaTrashAlt } from "react-icons/fa";
import EditUser from './EditUser';

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([])
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [userDetails, setUserDetails] = useState()

    console.log(userDetails)

    const fetchAllUsers = async () => {
        const dataResponse = await fetch(summaryApi.allUsers.url, {
            method: summaryApi.allUsers.method,
            credentials: 'include'
        })
        const data = await dataResponse.json()
        console.log(data.data)

        if (data.success) {
            setAllUsers(data.data)
        } else {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])



    return (
        <div>
            <p className='text-xl font-semibold mb-2'>Total Users: {allUsers.length}</p>
            <table className='w-full bg-white '>
                <thead className='border-b bg-slate-300 px-2'>
                    <th>Sl</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </thead>
                <tbody>
                    {
                        allUsers.map((user, index) => <tr key={index} className='text-center border-b'>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className={user.role == "ADMIN" ? 'text-green-500 font-semibold' : 'text-black'} >
                                {user.role}
                            </td>
                            <td>{moment(user.createdAt).format('ll')}</td>
                            <td className='space-x-4 flex justify-center'>
                                <button
                                    onClick={() => {
                                        setUserDetails(user)
                                        setOpenUpdateModal(true)
                                    }}
                                    className='rounded-full text-xl p-1 hover:bg-green-600 hover:text-white hover:transition-all '
                                >
                                    <MdModeEdit />
                                </button>
                                <button className='rounded-full text-sm p-2 text-red-500 hover:bg-red-600 hover:text-white hover:transition-all '>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

            {
                openUpdateModal && (
                    <EditUser
                        userId={userDetails._id}
                        name={userDetails.name}
                        email={userDetails.email}
                        role={userDetails.role}
                        onClose={() => setOpenUpdateModal(false)}
                        callFac={fetchAllUsers}
                    ></EditUser>
                )
            }
        </div>
    );
};

export default AllUsers;