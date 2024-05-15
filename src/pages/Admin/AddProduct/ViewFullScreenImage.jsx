import React from 'react';
import { IoMdClose } from 'react-icons/io';

const ViewFullScreenImage = ({ imagURL, onClose }) => {
    console.log(onClose)
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center '>
            
            <div className='bg-white drop-shadow-3xl flex justify-center items-center h-[85vh] w-[85vh]  '>
                <button className='absolute top-2 right-2 text-xl' onClick={onClose}>
                    <IoMdClose />
                </button>

                <div className='p-4 pt-10'>
                    <img src={imagURL} alt="" className='w-full h-full' />
                </div>
            </div>

        </div>
    );
};

export default ViewFullScreenImage;