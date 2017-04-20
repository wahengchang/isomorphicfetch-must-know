var express = require('express')
var app = express()

app.get('/send', function (req, res) {
  res.status(200).send('Hello World!')
})
app.get('/json', function (req, res) {
  res.status(200).json({name: 'hello'})
})

app.get('/error/send', function (req, res) {
  res.status(400).send('you are wrong')
})
app.get('/error/json', function (req, res) {
  res.status(400).json({code:1, message: 'you are wrong'})
})

app.get('/json/5stimeout', function (req, res) {
    setTimeout(function(){
        res.json({name: 'you are patient'})
    },5000)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})