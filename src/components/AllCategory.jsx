import React, { useEffect, useState } from 'react';
import summaryApi from '../common/api';
import Loading from '../shared/Loading/Loading';
import { Link } from 'react-router-dom';


const AllCategory = () => {

    const [productCategory, setProductCategory] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)


    const fetchData = async () => {
        setLoading(true)
        const dataResponse = await fetch(summaryApi.getProductCategory.url)
        const data = await dataResponse.json()

        if (data.success) {
            setProductCategory(data)
            setLoading(false)
        }
    }
    console.log("category" , productCategory)

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div className='flex my-3 gap-4 justify-between overflow-scroll scrollBar-none'> {/* scrol-none will come app.css file */}
                {loading ? (
                    // loading part
                    loadingList?.map((category, index) => (
                        <div key={index} >
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-200 md:p-4 p-2 flex justify-center items-center animate-pulse'>

                            </div>
                            <p className='text-center text-sm md:text-base capitalize p-2 w-full bg-slate-200 mt-1 rounded-full animate-pulse'></p>
                        </div>
                    ))
                )
                    :
                    (
                        // original part
                        productCategory?.data?.map((category, index) => (
                            <Link to={`/category-product?category=${category?.category}`} key={index} className='cursor-pointer'>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-200 md:p-4 p-2 flex justify-center items-center'>
                                    <img
                                        src={category.productImage[0]}
                                        alt={category.category}
                                        className='object-scale-down mix-blend-multiply h-full hover:scale-125 transition-all'
                                    />
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{category?.category}</p>
                            </Link>
                        ))
                    )


                }
            </div>
        </div>
    );
};

export default AllCategory;