const axios = require('axios')

//const url = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao'
const url = `https://economia.awesomeapi.com.br/all/USD-BRL?fbclid=IwAR06i33BB7AT9Ct46H2PvDCirqn4qK01LSkkv58FxhzrfX7j-PoVs_nWaAI`

const getQuotationAPI = data => axios.get(url)
const extractQuotation = res => res.data.USD.ask
const getQuotation = async() => {
    try {
        const res = await getQuotationAPI('')
        const quotation = extractQuotation(res)
        return quotation
    }catch(err){
        console.log('err', err)
    }
}

module.exports = {
    getQuotationAPI,
    getQuotation,
    extractQuotation
}