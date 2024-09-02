const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
        
      }
    }
  },
  age: {
    type: Number
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, 'thisismysecret')

  user.tokens = user.tokens.concat({ token })

  await user.save()

  return token
}

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({email})

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user
}

const Post = require('../models/post.js')

userSchema.pre('findOneAndDelete', async function (next) {
  const user = await this.model.findOne(this.getQuery()); // Get the user to be deleted
  await Post.deleteMany({ owner: user._id }); // Delete posts associated with the user
  next();
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User