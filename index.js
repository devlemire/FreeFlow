require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const massive = require('massive')
const path = require('path')

const { SERVER_PORT, DB_URI } = process.env

const app = express()

massive(DB_URI).then(instance => app.set('db', instance))

app.use(bodyParser.json())
app.use(cors())

//LOGIN
app.use('/api/login', require('./routes/login'))

//REGISTER
app.use('/api/register', require('./routes/register'))

//Project endpoints
// app.use('/api/project', require('./routes/project'))

//Task endpoints
// app.use('/api/task', require('./routes/task'))
// app.use('/api/completed', require('./routes/completedTask'))

app.use(express.static(`${__dirname}/public_old`))
app.all('*', function(req, res, next) {
  res.sendFile(path.resolve(`${__dirname}/public_old/index.html`))
})

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`))
