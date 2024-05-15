

const displayBDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-BD', {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 2
    })

    let formattedCurrency = formatter.format(num);
    formattedCurrency = '৳' + formattedCurrency.slice(3); // prepend Taka symbol and remove the currency code
    return formattedCurrency;

    // return formatter.format(num)
}

export default displayBDCurrency
