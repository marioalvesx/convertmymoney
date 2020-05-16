const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

test('getQuotationAPI', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.899 }
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getQuotationAPI('url').then( resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
    // console.log(api.getQuotationAPI('url'))
})

test('extractQuotation', () => {
    const cotacao = api.extractQuotation({
        data: {
            value: [
                { cotacaoVenda: 5.899 }
            ]
        }
    })
    expect(cotacao).toEqual(5.899) // Verificar por que não recebe o valor da forma correta.
})

describe('getToday', () => {
    const RealDate = Date

    function mockDate(date){
        global.Date = class extends RealDate {
            constructor(){
                return new RealDate(date)
            }
        }
    }
    afterEach(() => {
        global.date = RealDate
    })

    test('getToday', () => {
        mockDate('2020-05-14T12:00:00z') // Funções 'mocadas'
        const today = api.getToday()
        expect(today).toBe('5-14-2020')
    })
})

test('getURL', () => {
    const url = api.getUrl('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})

test('getQuotation', () => {    // Versões falsas criadas;
    const res = { data: { value: [ { cotacaoVenda: 5.899 } ] } }

    const getToday = jest.fn() 
    getToday.mockReturnValue('16-05-2020')
    
    const getUrl = jest.fn() 
    getUrl.mockReturnValue('url')
    
    const getQuotationAPI = jest.fn() 
    getQuotationAPI.mockResolvedValue(res)

    const extractQuotation = jest.fn()
    extractQuotation.mockReturnValue(5.899)

    api.pure
        .getQuotation({ getToday, getUrl, getQuotationAPI, extractQuotation }) () // Isso retorna outra função, então executa novamente, mais abaixo
        .then( res => {
            expect(res).toBe(5.899)
        })
})

test('getQuotation', () => {    // Versões falsas criadas;
    const res = { }

    const getToday = jest.fn() 
    getToday.mockReturnValue('16-05-2020')
    
    const getUrl = jest.fn() 
    getUrl.mockReturnValue('url')
    
    const getQuotationAPI = jest.fn() 
    getQuotationAPI.mockReturnValue(Promise.reject('err'))

    const extractQuotation = jest.fn()
    extractQuotation.mockReturnValue(5.899)

    api.pure
        .getQuotation({ getToday, getUrl, getQuotationAPI, extractQuotation }) () // Isso retorna outra função, então executa novamente, mais abaixo
        .then( res => {
            expect(res).toBe(' ')
        })
})