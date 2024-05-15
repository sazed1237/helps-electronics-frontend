import React, { useContext, useEffect, useState } from 'react';
import summaryApi from '../../common/api';
import Context from '../../context/context';
import displayBDCurrency from '../../utils/displayCurrency';
import { MdDelete } from 'react-icons/md';

const Cart = () => {

    const [cartData, setCartData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.countProduct).fill(null)


    const fetchData = async () => {
        const dataResponse = await fetch(summaryApi.addToCartProduct.url, {
            method: summaryApi.addToCartProduct.method,
            credentials: "include",
            headers: {
                'content-type': 'application/json'
            }
        })

        const data = await dataResponse.json()
        setCartData(data?.data)
    }
    // console.log(cartData)

    useEffect(() => {
        setLoading(true)
        fetchData()
        setLoading(false)
    }, [])


    const updateQuantity = async (id, qty) => {
        const fetchQty = await fetch(summaryApi.updateCartQuantity.url, {
            method: summaryApi.updateCartQuantity.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty
            })
        })

        const data = await fetchQty.json()

        if (data.success) {
            fetchData()
        }
    }

    const increaseQuantity = async (id, increaseQty) => {
        console.log('id', id)
        const qty = increaseQty + 1
        updateQuantity(id, qty)
    }

    const decreaseQuantity = async (id, decreaseQty) => {
        console.log('id', id)
        if (decreaseQty >= 2) {
            const qty = decreaseQty - 1
            updateQuantity(id, qty)
        }
    }


    const handleDeleteProduct = async (id) => {
        // console.log(id)
        const response = await fetch(summaryApi.deleteCartProduct.url, {
            method: summaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        })
        const data = await response.json()

        console.log(data)
        if (data.success) {
            fetchData()
            context.countAddToCartProduct()
        }
    }

    // summery section
    const totalQty = cartData?.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = cartData?.reduce((prev, current) => prev + (current?.productId?.sellingPrice * current.quantity), 0)


    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-center mt-2 mb-5 md:mb-8 font-bold text-3xl md:text-5xl'>Your Cart</h1>
            <div>
                {
                    cartData?.length === 0 && !loading && (
                        <div>
                            <h2>No Data Available</h2>
                        </div>
                    )
                }
            </div>



            {/* products view */}
            <div className='flex flex-col md:flex-row gap-7 md:justify-between'>
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((cart, index) => (
                                <div key={index} className='w-full h-32 bg-slate-200 mb-2 border border-slate-300 animate-pulse rounded'>

                                </div>
                            ))
                        )
                            :
                            (
                                cartData.map((data, index) => (
                                    <div key={index} className='w-full h-32 md:h-32 bg-white mb-2 border border-slate-300 rounded grid grid-cols-[80px,auto] md:grid-cols-[128px,auto] '>

                                        <div className='w-20 h-full md:w-32 bg-slate-200 flex items-center justify-center'>
                                            <img src={data?.productId?.productImage[0]} alt="" className='md:h-28 h-20 w-full object-scale-down mix-blend-multiply' />
                                        </div>

                                        <div className='p-2 md:px-4 md:py-2 relative'>

                                            <div className='absolute right-1 text-2xl md:text-3xl text-red-600 '>
                                                <button className='rounded-full p-1 hover:bg-red-600 hover:text-white transition-all cursor-pointer' onClick={() => handleDeleteProduct(data?._id)}>
                                                    <MdDelete />
                                                </button>
                                            </div>

                                            <h2 className='text-lg pr-2 md:text-2xl text-ellipsis line-clamp-1'>{data?.productId?.productName}</h2>
                                            <p className='text-slate-500 capitalize text-sm'>{data?.productId?.category}</p>
                                            <p className='text-red-600 font-medium text-lg'>{displayBDCurrency(data?.productId?.sellingPrice * data?.quantity)}</p>

                                            <div className='flex items-center gap-2 mt-1'>
                                                <button onClick={() => decreaseQuantity(data?._id, data?.quantity)} className='border border-red-500 w-5 h-4 rounded flex justify-center items-center hover:bg-red-600 hover:text-white ' >-</button>
                                                <span>{data?.quantity}</span>
                                                <button onClick={() => increaseQuantity(data?._id, data?.quantity)} className='border border-red-500 w-5 h-4 rounded flex justify-center items-center hover:bg-red-600 hover:text-white ' >+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                    }
                </div>

                {/* cart summary */}
                <div className='mt-5 md:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                total
                            </div>
                        )
                            :
                            (
                                <div className=' space-y-2 h-44 bg-slate-200 border border-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summery</h2>
                                    <div className='px-4 flex items-center justify-between font-medium text-lg text-gray-700 '>
                                        <p>Quantity : </p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='px-4 flex items-center justify-between font-medium text-lg text-gray-700 '>
                                        <p>Total Price : </p>
                                        <span>{displayBDCurrency(totalPrice)}</span>
                                    </div>

                                    <div className='p-4 flex justify-end'>
                                        <button className='py-1 px-4 text-lg text-white bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-all'>Checkout</button>
                                    </div>

                                </div>
                            )
                    }
                </div>
            </div>


        </div>
    );
};

export default Cart;