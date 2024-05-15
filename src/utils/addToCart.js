import { toast } from "react-toastify";
import summaryApi from "../common/api";

const addToCart = async (event, id) => {
    event?.preventDefault()
    event?.stopPropagation()


    const dataResponse = await fetch(summaryApi.addToCart.url, {
        method: summaryApi.addToCart.method,
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ productId: id })
    })

    const data = await dataResponse.json()

    if (data.success) {
        toast.success(data.message)
    } else {
        toast.error(data.message)
    }

    return data

}

export default addToCart;