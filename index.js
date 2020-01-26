const express = require('express')
const app = express()
const path = require('path')
// Configuração para receber conexão do Heroku
const port = process.env.PORT || 3000

const convert = require('./library/convert')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/quotation', (req, res) => {
    const { quotation, quantity } = req.query
    if (quotation && quantity){
        const conversion = convert.convert(quotation, quantity) // Mando para quotation e quantity os valores que quero converter
        res.render('quotation', { // Renderizo na view os valores retornados pelo arquivo de conversão
            error: false,
            quotation: convert.toMoney(quotation),
            quantity: convert.toMoney(quantity),
            conversion: convert.toMoney(conversion),
        })
    }else{
        res.render('quotation', {
            error: 'Invalid values'
        })
    }
})

app.listen(port, err => {
    if(err){
        console.log('Não foi possível iniciar')
    }else{
        console.log('ConvertMyMoney esta online')
    }
})

