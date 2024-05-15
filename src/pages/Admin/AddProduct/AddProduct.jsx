import React, { useState } from 'react';
import productCategory from '../../../utils/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../../../utils/uploadImage';
import { FaPlus } from "react-icons/fa6";
import ViewFullScreenImage from './ViewFullScreenImage';
import { IoMdClose } from 'react-icons/io';
import summaryApi from '../../../common/api';
import { toast } from 'react-toastify';

const AddProduct = () => {


    const [image, setImage] = useState({
        productImage: []
    })
    const [openImageFullScreen, setOpenImageFullScreen] = useState(false)
    const [imageFullScreen, setImageFullScreen] = useState('')

console.log(image)

    const handleUploadImage = async (event) => {
        const file = event.target.files[0]
        // console.log(file)
        const uploadImageCloudinary = await uploadImage(file)
        // console.log(uploadImageCloudinary.url)

        setImage((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })
        // setImage(uploadImageCloudinary.url)
    }

    const handleImageDelete = async (id) => {
        // console.log(id)

        const remainingImage = [...image.productImage]
        remainingImage.splice(id) // first perametar is find which one delete and second perametar how many items ar delete 

        setImage((prev) => {
            return {
                ...prev,
                productImage: [...remainingImage]
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.target;
        const productName = form.productName.value;
        const brandName = form.brandName.value;
        const category = form.category.value;
        const price = form.price.value;
        const sellingPrice = form.sellingPrice.value;
        const description = form.description.value;
        const productImage = image.productImage

        const productDetails = { productName, brandName, category, productImage, price, sellingPrice, description }
        // console.log(productDetails)


        const fetchResponse = await fetch(summaryApi.uploadProduct.url, {
            method: summaryApi.uploadProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(productDetails)
        })
        const data = await fetchResponse.json()
        console.log(data)
        if (data.success) {
            toast.success(data.message)

        } else {
            toast.error(data.message)
        }
    }


    return (
        <div className='w-full'>
            <div className='text-3xl mb-8 text-center font-bold underline underline-offset-8'>
                <h1>Add Product</h1>
            </div>
            <div className='w-full max-w-3xl bg-white p-4 mx-auto'>

                <form onSubmit={handleSubmit}>
                    <div className='grid w-full py-2 gap-2'>
                        <label htmlFor="productName">Product Name :</label>
                        <input
                            type="text"
                            name="productName"
                            placeholder='Enter product name'
                            required

                            id="productName"
                            className='bg-slate-200 w-full p-2 rounded  ' />
                    </div>

                    <div className='grid w-full py-2 gap-2'>
                        <label htmlFor="brandName">Brand Name :</label>
                        <input
                            type="text"
                            name="brandName"
                            placeholder='Enter brand name'
                            required

                            id="brandName"
                            className='bg-slate-200 w-full p-2 rounded  ' />
                    </div>

                    <div className='grid w-full py-2 gap-2'>
                        <label htmlFor="category">Category :</label>
                        <select
                            type="text"
                            name="category"
                            placeholder='Enter Category'
                            required

                            id="category"
                            className='bg-slate-200 text-black w-full p-2 rounded  '
                        >
                            <option value="">Select Category</option>
                            {
                                productCategory.map((category, index) => <option key={index} value={category.value}>{category.label}</option>)
                            }
                        </select>
                    </div>

                    <div className='grid w-full py-2 gap-2'>
                        <label htmlFor="productImage">Product Image :</label>
                        <label htmlFor="uploadImage">
                            <div onChange={handleUploadImage} className='bg-slate-200 text-slate-600 w-full flex items-center justify-center flex-col h-24 p-2 rounded  cursor-pointer'>
                                <span className='text-3xl'><FaCloudUploadAlt /></span>
                                <p><small>Upload Product Image</small></p>
                                <input type="file" className='hidden' name="uploadImage" id="uploadImage" />
                            </div>
                        </label>
                        <div>
                            {
                                image?.productImage[0] ? (
                                    <div className='flex gap-2'>
                                        {
                                            image?.productImage.map((image, index) => {
                                                return (
                                                    <div key={index} className='relative group'>
                                                        <img
                                                            onClick={() => {
                                                                setOpenImageFullScreen(true)
                                                                setImageFullScreen(image)
                                                            }}
                                                            className='bg-slate-300 h-20 max-w-24 border cursor-pointer'
                                                            src={image}
                                                            alt="image"
                                                        />

                                                        <button
                                                            onClick={() => handleImageDelete(index)}
                                                            className='absolute top-0 right-0 text-md text-white bg-red-600 rounded-full hidden group-hover:block '
                                                        >
                                                            <IoMdClose />
                                                        </button>


                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                    <p className='text-sm text-red-500'>*Please upload image</p>
                                )
                            }
                        </div>
                    </div>

                    <div className='grid w-full py-2 gap-2'>
                        <label htmlFor="price">Price :</label>
                        <input
                            type="number"
                            name="price"
                            placeholder='Enter price'
                            required

                            id="price"
                            className='bg-slate-200 w-full p-2 rounded  ' />
                    </div>

                    <div className='grid w-full py-2 gap-2'>
                        <label htmlFor="sellingPrice">Selling Price :</label>
                        <input
                            type="number"
                            name="sellingPrice"
                            placeholder='Enter Selling Price'
                            required

                            id="sellingPrice"
                            className='bg-slate-200 w-full p-2 rounded  ' />
                    </div>

                    <div className='grid w-full py-2 gap-2'>
                        <label htmlFor="description">Description :</label>
                        <textarea
                            name="description"
                            placeholder='description'
                            required
                            id="description"
                            className='bg-slate-200 w-full p-2 rounded  h-32'
                        >

                        </textarea>
                    </div>

                    <button
                        className="bg-red-500 mx-auto px-2 md:px-3 py-1 my-5 rounded-sm text-white hover:bg-red-600 flex items-center gap-2"
                        type="submit"
                    ><span><FaPlus /></span>Add Product</button>
                </form>
            </div>

            {/* display full screen image */}

            {
                openImageFullScreen && (
                    <ViewFullScreenImage imagURL={imageFullScreen} onClose={() => setOpenImageFullScreen(false)} />
                )
            }

        </div>
    );
};

export default AddProduct;