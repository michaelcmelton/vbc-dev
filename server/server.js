const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const express = require('express')
const bodyParser = require('body-parser')
const apiRoot = process.env.API_ROOT
const port = process.env.API_PORT
const mongoose = require('mongoose')
const connString = process.env.CONN_STRING

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err) => {
  if (err) {
    console.error(err)
  }
  console.log('MongoDB Connected.')
})

app.get(path.join(apiRoot, '/'), (req, res) => {
  res.json({
    status: 200,
    message: 'API Root'
  })
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
