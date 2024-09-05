const mongoose = require('mongoose')
require('../../config/dev.env')
require('dotenv').config({path: './config/dev.env'})

mongoose.connect(process.env.MONGODB_URL)

