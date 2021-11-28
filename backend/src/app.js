const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const jobOfferRouter = require('./routers/jobOffer')
const cors = require('cors')

const { CLIENTS_URL } = process.env
const app = express()

const whiteList = CLIENTS_URL.split(",")

app.use(
  cors({
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin.toString()) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)
app.use(express.json())
app.use(userRouter)
app.use(jobOfferRouter)

module.exports = app
