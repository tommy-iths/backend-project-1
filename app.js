const express = require('express')
require('dotenv').config()
const app = express()
const Routes = require('./routes/')
const { errorHandler } = require('./middleware/errorHandler')

app.use(express.json())

app.use(errorHandler)

app.use('/api/v1', Routes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
