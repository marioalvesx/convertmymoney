const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

test('getQuotationAPI', () => {
    const res = {
        data: {
            USD: [
                { ask: 3.90 }
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getQuotationAPI().then( resp => {
        expect(resp).toEqual(res)
    } )
})