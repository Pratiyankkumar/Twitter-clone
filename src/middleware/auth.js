const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
require('dotenv').config({path: './config/dev.env'})

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
  
    if (!user) {
      throw new Error({error: 'User not found!'})
    }

    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({error: 'Please authenticate'})
  }
  
}

module.exports = auth