import summaryApi from "../common/api"

const fetchProductDetails = async (id) => {
console.log(id)
    const fetchData = await fetch(`${summaryApi.getProductDetails.url}?_id=${id}`, {
        method: summaryApi.getProductDetails.method,
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })

    const data = await fetchData.json()

    return data
}

export default fetchProductDetails