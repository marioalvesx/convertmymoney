const convert = (quotation, quantity) => {
    return quotation * quantity
}
const toMoney = valor => {
    return parseFloat(valor).toFixed(2)  // Número de digitos que quero depois da virgula
}

module.exports = {
    convert,
    toMoney
}