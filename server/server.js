/* eslint-disable max-params */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unused-vars */
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const express = require('express')
const bodyParser = require('body-parser')
const apiRoot = process.env.API_ROOT
const apiPort = process.env.API_PORT
// const mongoose = require('mongoose')
const connString = process.env.CONN_STRING
const publicPath = path.join(__dirname, '..', 'client/build');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(publicPath));
app.use(express.static(path.join(publicPath, 'static')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// mongoose.connect(connString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// }, (err) => {
//   if (err) {
//     console.error(err)
//   }
//   console.log('MongoDB Connected.')
// })

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.get(path.join(apiRoot, '/'), (req, res) => {
  res.json({
    status: 200,
    message: 'API Root'
  })
})

app.use(path.join(apiRoot, 'business'), require('./routes/business'));

app.use((req, res, next) => {
  res.json({
    status: 500,
    message: 'Sorry can\'t find that!'
  })
})

app.listen(port, () => {
  console.log(`Server is up on ${port}!`);
});

app.listen(apiPort, () => {
  console.log(`Server listening on ${apiPort}`)
})
