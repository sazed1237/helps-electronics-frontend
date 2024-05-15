import React, { useEffect, useState } from 'react';
import summaryApi from '../../../common/api';
import AdminProductCard from '../../../components/AdminProductCard';

const ManageProduct = () => {

    const [allProducts, setAllProducts] = useState([])

    const fetchAllProducts = async () => {
        const dataResponse = await fetch(summaryApi.getAllProducts.url, {
            method: summaryApi.getAllProducts.method,
            credentials: "include"
        })
        const data = await dataResponse.json()
        // console.log(data)
        if (data?.success) {
            setAllProducts(data?.data)
            fetchAllProducts()
        }
    }
    // console.log(allProducts)

    useEffect(() => {
        fetchAllProducts()
    }, [])

    return (
        <div>
            <div className='bg-white px-2 text-2xl font-semibold py-2'>
                <h1>Total Products: {allProducts.length}</h1>
            </div>

            <div className='flex items-center flex-wrap gap-4 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                {
                    allProducts.map((product, index) => {
                        return (
                            <AdminProductCard
                                key={product?._id}
                                product={product}
                                index={index}
                                reFetch={fetchAllProducts}
                            ></AdminProductCard>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ManageProduct;