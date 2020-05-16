const axios = require('axios')

const getUrl = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${date}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
const getQuotationAPI = url => axios.get(url)
const extractQuotation = res => res.data.value[0].cotacaoVenda

const getToday = () => {
    const today = new Date()
    return (
        today.getMonth()+1+'-'+today.getDate()+'-'+today.getFullYear()
    );
}

const getQuotation = ({ getToday, getUrl, getQuotationAPI, extractQuotation }) => async() => {
    try {
        // const getToday = deps.getToday() - Pode usar Destructuring Assignment        
        const today = getToday()
        const url = getUrl(today)
        const res = await getQuotationAPI(url)
        const quotation = extractQuotation(res)
        return quotation
    }catch(err){
        console.log('err', err)
    }
}

module.exports = {
    getUrl,
    getToday,
    getQuotationAPI,
    getQuotation: getQuotation({ getToday, getUrl, getQuotationAPI, extractQuotation }),
    extractQuotation,
    pure: {
        getQuotation
    }
}