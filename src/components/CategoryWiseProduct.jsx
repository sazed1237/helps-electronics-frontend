import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryProduct from '../utils/fetchCategoryWiseProduct';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import displayBDCurrency from '../utils/displayCurrency';
import Loading from '../shared/Loading/Loading';
import { Link } from 'react-router-dom';
import addToCart from '../utils/addToCart';
import scrollTop from '../utils/scrollTop';
import Context from '../context/context';

const CategoryWiseProduct = ({ category, heading }) => {

    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const scrollElement = useRef()
    const { countAddToCartProduct } = useContext(Context)
    // console.log(category)




    const fetchProduct = async () => {
        setLoading(true)
        const data = await fetchCategoryProduct(category)
        setLoading(false)
        setCategoryProduct(data)
    }

    // console.log(categoryProduct)

    useEffect(() => {
        fetchProduct()
    }, [category])


    const handleAddToCart = async (event, id) => {
        await addToCart(event, id)
        countAddToCartProduct()
    }



    return (
        <div className='my-6 relative' >
            <h3 className=' capitalize text-xl md:text-2xl font-semibold py-4'> {heading}</h3>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between relative items-center gap-5 md:gap-7 transition-all overflow-y-scroll  ' ref={scrollElement}>
                {loading ? (
                    //    loading part
                    loadingList?.map((product, index) => (

                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px]  md:max-w-[320px] bg-white rounded-sm shadow cursor-pointer'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center animate-pulse '>

                            </div>

                            <div className='p-3 grid gap-2 w-full  '>
                                <h3 className=' text-black text-base font-semibold md:text-xl text-ellipsis line-clamp-1 p-3 w-full animate-pulse bg-slate-200 rounded-full'></h3>
                                <p className='capitalize text-slate-500 p-2 w-full animate-pulse bg-slate-200 rounded-full '></p>
                                <div className='flex items-center gap-2'>
                                    <p className='text-red-600 font-medium p-2 w-full animate-pulse bg-slate-200 rounded-full '></p>
                                    <p className='text-slate-500 text-sm line-through p-2 w-full animate-pulse bg-slate-200 rounded-full'></p>
                                </div>
                                <div className=' w-full flex items-center justify-center my-2'>
                                    <button className='px-5  py-3 text-white p-1 w-full animate-pulse bg-slate-200 rounded-full '></button>
                                </div>
                            </div>
                        </div>
                    ))
                )
                    :
                    (
                        // original part

                        categoryProduct?.data?.map((product, index) => (

                            <Link to={`/product-details/${product._id}`} key={index} onClick={scrollTop} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px]  md:max-w-[320px] bg-white rounded-sm shadow cursor-pointer'>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center '>
                                    <img className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' src={product?.productImage[0]} alt="" />
                                </div>

                                <div className='p-3 grid gap-2 w-full  '>
                                    <h3 className=' text-black text-base font-semibold md:text-xl text-ellipsis line-clamp-1'>{product?.productName}</h3>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-red-600 font-medium '>{displayBDCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 text-sm line-through'>{displayBDCurrency(product?.price)}</p>
                                    </div>
                                    <div className=' w-full flex items-center justify-center my-2'>
                                        <button onClick={(event) => handleAddToCart(event, product._id)} className='bg-red-500 hover:bg-red-600 px-5 rounded-full py-0.5 text-white '>Add to Cart</button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>

        </div>
    );
};

export default CategoryWiseProduct;