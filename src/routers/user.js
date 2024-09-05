const express = require('express')
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')
const jwt = require('jsonwebtoken')
const Post = require('../models/post.js')
const router = express.Router()

router.post('/users', async (req, res) => {
  
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
  
    res.status(201).send({user, token}) 
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({user, token})
  } catch (error) {
    res.status(401).send(error)
  }
})

router.post('/users/logout', auth, async (req, res) => {
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token
  })

  await req.user.save()

  res.status(200).json({ message: 'Logged Out' });

})

router.delete('/users/me', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id); // This will trigger the middleware
    res.send({ message: 'User and associated posts deleted' });
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/users/me', auth, (req, res) => {
  res.send(req.user)
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/users/me', auth, async (req, res) => {
  const allowedUpdates = ['name', 'age', 'password']
  const updates = Object.keys(req.body)

  try {
    const user = await User.findById(req.user._id)

    updates.forEach((update) => {
      if (allowedUpdates.includes(update)) {
        user[update] = req.body[update]
      } else {
        throw new Error("You can only update name, email and password");
      }
    })

    await user.save()
    
    res.send(user)
  } catch (error) {
    res.status(500).send(error) 
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.send(user) 
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router