
import summaryApi from "../common/api"

const countCartProduct = async () => {

    const dataResponse = await fetch(summaryApi.countCartProduct.url, {
        method: summaryApi.countCartProduct.method,
        credentials: "include"
    })
    const data = await dataResponse.json()

    console.log("count", data)

    return data
}

export default countCartProduct