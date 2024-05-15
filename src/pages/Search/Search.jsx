import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import summaryApi from '../../common/api';
import SearchProductCard from '../../components/SearchProductCard';


const Search = () => {

    const query = useLocation()
    const [searchData, setSearchData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array().fill()

    const fetchProducts = async () => {
        setLoading(true)
        const dataResponse = await fetch(summaryApi.searchProducts.url + query.search)
        const data = await dataResponse.json()
        // console.log("search data", data)
        setLoading(false)
        setSearchData(data.data)
    }

    useEffect(() => {
        fetchProducts()
    }, [query])

    return (
        <div className='container mx-auto p-4'>
            {
                loading && (
                    <p className='text-lg text-center'>Loading......</p>
                )
            }

            <p className='text-xl mb-3 font-medium'>Search Result : {searchData.length}</p>

            {
                searchData === 0 && !loading && (
                    <p className='text-center bg-white text-lg p-4'>No Data Found</p>
                )
            }

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    searchData.length !== 0 && !loading && (
                        searchData.map((data, index) => <SearchProductCard
                            key={index}
                            product={data}
                            loading={loading}
                            loadingList={loadingList}
                        ></SearchProductCard>)
                    )
                }
            </div>


        </div>
    );
};

export default Search;