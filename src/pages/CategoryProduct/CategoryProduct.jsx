import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import summaryApi from '../../common/api';
import productCategory from '../../utils/productCategory';
import CategoryWiseProduct from '../../components/CategoryWiseProduct';
import SearchProductCard from '../../components/SearchProductCard';

const CategoryProduct = () => {
    // const params = useParams()
    const [categoryData, setCategoryData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    // url filter
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListInArray = urlSearch.getAll('category')
    const urlCategoryListObject = {}

    urlCategoryListInArray.forEach(el => {
        urlCategoryListObject[el] = true
    })
    // console.log(urlCategoryListObject)

    // filter data
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])
    const [sortBy, setSortBy] = useState("")


    // fetch filter data
    const fetchData = async () => {
        setLoading(true)
        const dataResponse = await fetch(summaryApi.filterProduct.url, {
            method: summaryApi.filterProduct.method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        })
        const data = await dataResponse.json()

        setLoading(false)
        setCategoryData(data?.data)
    }


    // get select category 
    const handleSelectCategory = async (event) => {
        const { name, value, checked } = event.target

        setSelectCategory((previous) => {
            return {
                ...previous,
                [value]: checked
            }
        })
    }
    // console.log(selectCategory)


    useEffect(() => {
        fetchData()
    }, [filterCategoryList])


    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategoryList(arrayOfCategory)
        // console.log("selected", arrayOfCategory)

        //format for url change when change on the checkbox
        const urlFormat = arrayOfCategory.map((el, index) => {
            if ((arrayOfCategory.length - 1) === index) {
                return `category=${el}`
            }
            return `category=${el}&&`
        })
        // console.log("urlFormate", urlFormat.join(''))
        navigate('/category-product?' + urlFormat.join(''))

        // http://localhost:5173/category-product?category=airpodes&&category=camera
    }, [selectCategory])


    const handleSortBy = (event) => {
        const { value } = event.target
        setSortBy(value)

        if (value === "asc") {
            setCategoryData(previous => previous.sort((a, d) => a.sellingPrice - d.sellingPrice))
        }

        if (value === "dsc") {
            setCategoryData(previous => previous.sort((a, d) => d.sellingPrice - a.sellingPrice))
        }
    }

    useEffect(() => {

    }, [sortBy])


    return (
        <div className='container mx-auto px-4 '>

            {/* desktop version */}
            <div className='grid grid-cols-[200px,auto]'>
                {/* left side */}
                <div className='bg-white px-2 py-4 min-h-[calc(100vh-100px)] overflow-y-scroll'>

                    {/* sort by */}
                    <div>
                        <h4 className='font-semibold uppercase text-slate-500 border-b border-slate-300 pb-1 '>Sort by</h4>

                        <form className='text-sm space-y-2 py-2'>
                            <div className='space-x-1 flex items-center'>
                                <input type="radio" name='sort' value={'asc'} checked={sortBy === "asc"} onChange={handleSortBy} />
                                <label>Price - Low to Hight</label>
                            </div>
                            <div className='space-x-1 flex items-center'>
                                <input type="radio" name='sort' value={'dsc'} checked={sortBy === "dsc"} onChange={handleSortBy} />
                                <label>Price - Hight to Low</label>
                            </div>
                        </form>
                    </div>


                    {/* filter by */}
                    <div>
                        <h4 className='font-semibold uppercase text-slate-500 border-b border-slate-300 pb-1 '>Category</h4>

                        <form className='text-sm space-y-2 py-2'>
                            {
                                productCategory.map((category, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <input type="checkbox" name="category" value={category.value} id={category.value} checked={selectCategory[category.value]} onChange={handleSelectCategory} />
                                        <label htmlFor={category.value}>{category.value}</label>
                                    </div>
                                ))
                            }
                        </form>
                    </div>

                </div>




                {/* right side */}
                <div className='p-4'>
                    <h3 className='text-lg mb-2 text-slate-800 font-medium'>Filter Results: {categoryData.length}</h3>

                    <div className='h-[calc(100vh-100px)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between relative items-center gap-5 md:gap-7 transition-all overflow-y-scroll ' >
                        {
                            categoryData?.length !== 0 && (
                                categoryData.map((data, index) => <SearchProductCard
                                    key={index}
                                    product={data}
                                    loading={loading}
                                ></SearchProductCard>)
                            )
                        }
                    </div>
                </div>

            </div>


        </div>
    );
};

export default CategoryProduct;