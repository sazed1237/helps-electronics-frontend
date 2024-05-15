import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryProduct from '../utils/fetchCategoryWiseProduct';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import displayBDCurrency from '../utils/displayCurrency';
import { Link } from 'react-router-dom';
import addToCart from '../utils/addToCart';
import scrollTop from '../utils/scrollTop';
import Context from '../context/context';


const HorizontalProductCard = ({ category, heading }) => {


    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()
    const { countAddToCartProduct } = useContext(Context)


    const handleAddToCart = async (event, id) => {
        await addToCart(event, id)
        countAddToCartProduct()
    }


    const fetchProduct = async () => {
        setLoading(true)
        const data = await fetchCategoryProduct(category)
        setLoading(false)
        setCategoryProduct(data)
    }

    console.log(categoryProduct)

    useEffect(() => {
        fetchProduct()
    }, [])

    // useEffect(() => {
    //     fetch(`${summaryApi.getCategoryWiseProduct.url}?category=${category}`, {
    //         method: summaryApi.getCategoryWiseProduct.method,
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data)
    //         })
    // }, [])


    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }



    return (
        <div className='my-6 relative' >
            <h3 className=' text-xl md:text-2xl font-semibold py-4'> {heading}</h3>
            {/* button for slide the image */}
            <div className='absolute z-30 w-full -top-16 h-full justify-end md:flex hidden '>
                <div className='flex gap-3 px-2 text-xl text-red-500'>
                    <button onClick={scrollLeft} className='transition-all hover:scale-125 hover:text-red-500 ' ><MdArrowBackIos /> </button>
                    <button onClick={scrollRight} className='transition-all hover:scale-125 hover:text-red-500 ' ><MdArrowForwardIos /> </button>
                </div>
            </div>

            <div className='flex items-center gap-5 md:gap-7 overflow-scroll scrollBar-none transition-all' ref={scrollElement}>

                {loading ? (
                    // loading part 
                    loadingList?.map((product, index) => (

                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex cursor-pointer'>
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse '>

                            </div>

                            {/* details */}
                            <div className='p-3 w-full grid gap-2'>
                                <h3 className=' text-black text-base font-semibold md:text-xl text-ellipsis line-clamp-1 bg-slate-200 p-1 animate-pulse rounded-full '></h3>
                                <p className='capitalize bg-slate-200 w-full p-1 animate-pulse rounded-full'></p>
                                <div className='flex gap-2 w-full'>
                                    <p className='text-red-600 font-medium p-1 w-full bg-slate-200 animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 text-sm line-through p-1 w-full bg-slate-200 animate-pulse rounded-full'></p>
                                </div>
                                <div className=' w-full flex items-center justify-center mt-1'>
                                    <button className='btn w-full  px-4 rounded-full text-sm py-3 text-white  bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        </div>
                    ))
                )
                    :
                    (
                        // original part
                        categoryProduct?.data?.map((product, index) => (

                            <Link to={`/product-details/${product._id}`} key={index} onClick={scrollTop} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex cursor-pointer'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                                    <img className='object-scale-down h-full hover:scale-110 transition-all' src={product?.productImage[0]} alt="" />
                                </div>

                                {/* details */}
                                <div className='p-3 w-full'>
                                    <h3 className=' text-black text-base font-semibold md:text-xl text-ellipsis line-clamp-1'>{product?.productName}</h3>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className=''>
                                        <p className='text-red-600 font-medium '>{displayBDCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 text-sm line-through'>{displayBDCurrency(product?.price)}</p>
                                    </div>
                                    <div className=' w-full flex items-center justify-center mt-1'>
                                        <button onClick={(event) => handleAddToCart(event, product._id)} className='bg-red-500 hover:bg-red-600 px-4 rounded-full text-sm py-0.5 text-white '>Add to Cart</button>
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

export default HorizontalProductCard;