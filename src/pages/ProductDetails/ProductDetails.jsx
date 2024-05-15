import React, { useEffect, useState } from 'react';
import summaryApi from '../../common/api';
import { useParams } from 'react-router-dom';
import fetchProductDetails from '../../utils/fetchProductDetails';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import displayBDCurrency from '../../utils/displayCurrency';
import Loading from '../../shared/Loading/Loading';
import VerticalProductCard from '../../components/VerticalProductCard';
import productCategory from '../../utils/productCategory';
import RandomCategory from '../../utils/RandomCategory';
import addToCart from '../../utils/addToCart';

const ProductDetails = () => {

    const { id } = useParams()
    // console.log(id)
    const [productDetails, setProductDetails] = useState()
    const [loading, setLoading] = useState(false)
    const imageLoadingList = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState('')

    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    })
    const [zoomImage, setZoomImage] = useState(false)


    const fetchData = async () => {
        setLoading(true)
        const data = await fetchProductDetails(id)
        setLoading(false)

        setProductDetails(data?.data)
        setActiveImage(data?.data.productImage[0])
    }

    // console.log(productDetails)

    useEffect(() => {
        fetchData()
    }, [id])


    const handleMouseEnterInTheImage = (image) => {
        setActiveImage(image)
    }


    const handleZoomImage = (event) => {
        setZoomImage(true)
        const { left, top, width, height } = event.target.getBoundingClientRect()

        // console.log("coordinate", left, top, width, height)

        const x = (event.clientX - left) / width
        const y = (event.clientY - top) / height

        setZoomImageCoordinate({
            x,
            y
        })
    }

    const handleLeaveMouseZoomImage = () => {
        setZoomImage(false)
    }



    // useEffect(() => {

    //     fetch(`${summaryApi.getProductDetails.url}?_id=${id}`, {
    //         method: summaryApi.getProductDetails.method,
    //         credentials: 'include',
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }) // Use `${id}` to insert the id into the URL
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);

    //         })
    //         .catch(error => {
    //             console.error('Error fetching product details:', error);
    //         });
    // }, [id]); // Add id to the dependency array to re-fetch when id changes


    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col md:flex-row gap-4'>
                {/* product image */}

                <div className='h-96 flex flex-col justify-center items-center md:flex-row-reverse gap-4 '>
                    {/* big image */}
                    <div className='h-[300px] w-[300px] md:h-96 md:w-96 bg-slate-200 relative p-3'>
                        <img src={activeImage} onMouseMove={handleZoomImage} onMouseLeave={handleLeaveMouseZoomImage} className='h-full w-full object-scale-down mix-blend-multiply' alt="" />

                        {/* zoom image */}
                        {
                            zoomImage && (
                                <div className=' hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 top-11 -right-[570px] scale-125'>
                                    <div
                                        className='w-full h-full mix-blend-multiply min-h-[400px] min-w-[500px]  '
                                        style={{
                                            backgroundImage: `url(${activeImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                        }}

                                    >

                                    </div>
                                </div>
                            )
                        }

                    </div>

                    <div className='h-full'>
                        {
                            loading ? (

                                // loading part
                                <div className='flex gap-2 md:flex-col overflow-scroll scrollBar-none h-full'>
                                    {
                                        imageLoadingList?.map((image, index) => (
                                            <div key={index} className='h-20 w-20 bg-slate-200 rounded animate-pulse'>

                                            </div>
                                        ))
                                    }
                                </div>
                            )
                                :
                                (
                                    // original part
                                    <div className='flex gap-2 md:flex-col overflow-scroll scrollBar-none h-full'>
                                        {
                                            productDetails?.productImage.map((image, index) => (
                                                <div key={index} className='h-20 w-20 bg-slate-200 rounded p-1'>
                                                    <img src={image} onClick={() => handleMouseEnterInTheImage(image)} className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' alt="" />

                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                        }
                    </div>

                </div>



                {/* product details */}
                {
                    loading ? (
                        // loading part

                        <div className='space-y-3'>
                            <p className=' text-red-600 font-serif  rounded-full p-2 w-full bg-slate-200 animate-pulse'></p>
                            <h2 className='text-2xl md:text-4xl font-medium rounded-full p-4 w-full bg-slate-200 animate-pulse' ></h2>
                            <p className='text-slate-500 capitalize rounded-full p-2 w-full bg-slate-200 animate-pulse' ></p>

                            <div className='flex gap-1 text-red-600 rounded-full p-3 w-full bg-slate-200 animate-pulse'>

                            </div>

                            <div className='flex items-center gap-2 font-medium'>
                                <p className='text-2xl md:text-3xl text-red-600 rounded-full p-3 w-full bg-slate-200 animate-pulse'></p>
                                <p className='line-through text-xl text-gray-500 rounded-full p-3 w-full bg-slate-200 animate-pulse'></p>
                            </div>

                            <div className=' flex  items-center gap-3 pt-5'>
                                <button className=' rounded-full  min-w-[120px] font-medium transition-all p-4 w-full bg-slate-200 animate-pulse cursor-auto' ></button>
                                <button className='  rounded-full min-w-[120px] font-medium transition-all p-4 w-full bg-slate-200 animate-pulse cursor-auto' ></button>
                            </div>

                            <div className='pt-2 flex flex-col gap-2'>
                                <p className='text-slate-600 font-medium rounded-full p-2 w-full bg-slate-200 animate-pulse'></p>
                                <p className='rounded-full p-5 w-full bg-slate-200 animate-pulse'></p>
                            </div>

                        </div>
                    )
                        : (
                            // original part
                            <div className='space-y-3'>
                                <p className='bg-red-200 text-red-600 font-serif px-3 rounded-full w-fit'>{productDetails?.brandName}</p>
                                <h2 className='text-2xl md:text-4xl font-medium' >{productDetails?.productName}</h2>
                                <p className='text-slate-500 capitalize'>{productDetails?.category}</p>

                                <div className='flex gap-1 text-red-600'>
                                    <FaStar></FaStar>
                                    <FaStar></FaStar>
                                    <FaStar></FaStar>
                                    <FaStar></FaStar>
                                    <FaStarHalf></FaStarHalf>
                                </div>

                                <div className='flex items-center gap-2 font-medium'>
                                    <p className='text-2xl md:text-3xl text-red-600'>{displayBDCurrency(productDetails?.sellingPrice)}</p>
                                    <p className='line-through text-xl text-gray-500'>{displayBDCurrency(productDetails?.price)}</p>
                                </div>

                                <div className=' flex  items-center gap-3 pt-5'>
                                    <button className='border-2 border-red-600 rounded px-3 py-0.5 min-w-[120px] font-medium text-red-600 hover:bg-red-600 hover:text-white tra transition-all' >Buy</button>
                                    <button onClick={(event) => addToCart(event, productDetails._id)} className='border-2 border-red-600 rounded px-3 py-0.5 min-w-[120px] font-medium text-white bg-red-600 hover:bg-white hover:text-red-600 tra transition-all' >Add to Cart</button>
                                </div>

                                <div className='pt-2'>
                                    <p className='text-slate-600 font-medium'>Description:</p>
                                    <p>{productDetails?.description}</p>
                                </div>

                            </div>
                        )
                }
            </div>


            {/* related products */}
            <VerticalProductCard category={productDetails?.category} heading={"Related Products"}></VerticalProductCard>

            <VerticalProductCard category={RandomCategory()} heading={"Random Products"}></VerticalProductCard>


        </div>
    );
};

export default ProductDetails;