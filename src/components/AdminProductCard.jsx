import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import AdminEditProduct from './AdminEditProduct';
import { TbCurrencyTaka } from "react-icons/tb";
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const AdminProductCard = ({ product, index, reFetch }) => {
    // console.log(product)

    const [openEditProduct, setOpenEditProduct] = useState(false)

    return (
        <div className='bg-white p-3 rounded relative'>
            <button className='absolute top-1  right-1 text-red-500 text-xl'>
                <IoMdClose />
            </button>

            <div className='w-40 h-52 '>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={product?.productImage[0]} alt="" className='w-full h-full mx-auto object-scale-down'
                    />
                </div>

                <h1 className='text-ellipsis line-clamp-2' >{product.productName}</h1>

                <div className='flex flex-wrap justify-between items-center gap-2 px-2 pt-2'>
                    <p className='flex items-center font-bold'><FaBangladeshiTakaSign />{product.sellingPrice}/-</p>
                    <span onClick={() => setOpenEditProduct(true)} className='text-xs hover:text-lg hover:transition-all hover:text-green-500 cursor-pointer' ><FaPen></FaPen></span>
                </div>

            </div>

            {/* open edit */}

            {
                openEditProduct && (
                    <AdminEditProduct onClose={() => setOpenEditProduct(false)} product={product} reFetch={reFetch}></AdminEditProduct>
                )
            }

        </div >
    );
};

export default AdminProductCard;