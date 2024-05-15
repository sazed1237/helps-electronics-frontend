const baseUrl = "http://localhost:5000"

const summaryApi = {
    singUp: {
        url: `${baseUrl}/api/singup`,
        method: 'post'
    },
    singIn: {
        url: `${baseUrl}/api/singin`,
        method: 'post'
    },
    userDetails: {
        url: `${baseUrl}/api/user-details`,
        method: 'get'
    },
    userLogout: {
        url: `${baseUrl}/api/logout`,
        method: 'get'
    },
    allUsers: {
        url: `${baseUrl}/api/all-users`,
        method: 'get'
    },
    updateUser: {
        url: `${baseUrl}/api/update-user`,
        method: 'post'
    },
    uploadProduct: {
        url: `${baseUrl}/api/upload-product`,
        method: 'post'
    },
    getAllProducts: {
        url: `${baseUrl}/api/get-products`,
        method: 'get'
    },
    updatedProduct: {
        url: `${baseUrl}/api/update-product`,
        method: 'post'
    },

    getProductCategory: {
        url: `${baseUrl}/api/get-product-category`,
        method: 'get'
    },
    getCategoryWiseProduct: {
        url: `${baseUrl}/api/category-product`,
        method: 'get'
    },
    getProductDetails: {
        url: `${baseUrl}/api/product-details`,
        method: 'get'
    },
    addToCart: {
        url: `${baseUrl}/api/add-to-cart`,
        method: 'post'
    },
    countCartProduct: {
        url: `${baseUrl}/api/count-cart-product`,
        method: 'get'
    },
    addToCartProduct: {
        url: `${baseUrl}/api/add-to-cart-product`,
        method: 'get'
    },
    updateCartQuantity: {
        url: `${baseUrl}/api/update-cart-quantity`,
        method: 'put'
    },
    deleteCartProduct: {
        url: `${baseUrl}/api/delete-cart-product`,
        method: 'delete'
    },
    searchProducts: {
        url: `${baseUrl}/api/search-products`,
        method: 'get'
    },
    filterProduct: {
        url: `${baseUrl}/api/filter-products`,
        method: 'post'
    },



}

export default summaryApi 