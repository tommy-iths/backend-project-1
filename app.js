const express = require('express')
const dotenv = require('dotenv')
const sqlite = require('sqlite3')
const jwt = require('jsonwebtoken')

// Load env
dotenv.config({ path: './config.env' })

const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))