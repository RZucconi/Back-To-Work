const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const jobOfferRouter = require('./routers/jobOffer')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(jobOfferRouter)

module.exports = app
