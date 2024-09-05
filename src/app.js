const express = require('express')
require('./db/mongoose.js')
const userRouter = require('./routers/user.js')
const postRouter = require('./routers/post.js')
const path = require('path')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(postRouter)

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: publicDirectoryPath })
})

app.get('/signup', (req, res) => {
  res.sendFile('signup.html', { root: publicDirectoryPath })
})

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: publicDirectoryPath })
})

app.get('/home', (req, res) => {
  res.sendFile('home.html', { root: publicDirectoryPath })
})

app.get('/profile', (req, res) => {
  res.sendFile('profile.html', { root: publicDirectoryPath })
})

app.get('/user', (req, res) => {
  res.sendFile('user.html', { root: publicDirectoryPath })
})


app.listen(3000, () => {
  console.log('Server is up on port 3000')
})