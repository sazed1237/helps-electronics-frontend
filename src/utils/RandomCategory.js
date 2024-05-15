import productCategory from "./productCategory";


const RandomCategory = () => {

    // get Random index first
    const randomIndex = Math.floor(Math.random() * productCategory.length)

    // get random value/category
    const randomValue = productCategory[randomIndex].value
    // console.log(randomValue)

    return randomValue

};

export default RandomCategory;