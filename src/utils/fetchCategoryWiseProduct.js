import summaryApi from "../common/api"

const fetchCategoryProduct = async (category) => {

    const fetchData = await fetch(`${summaryApi.getCategoryWiseProduct.url}?category=${category}`, {
        method: summaryApi.getCategoryWiseProduct.method,
        headers: {
            'content-type': 'application/json'
        },
    })

    const data = await fetchData.json()

    return data

}

export default fetchCategoryProduct