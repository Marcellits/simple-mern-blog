if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const server = express()

const articleRouter = require('./Article/router')

const mongoose = require('mongoose')
// connect to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
// open the connection
const connection = mongoose.connection
connection.once('open', () => console.log("MongoDB connection established."))

// to format requests into JSON
server.use(express.json())
// to correctly get the information from submissions
server.use(express.urlencoded({ extended: false }))

server.use('/articles', articleRouter)

const PORT = process.env.port || 4000
server.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))