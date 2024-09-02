const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      trim: true,
      required: true
    }
  }]
}, {
  timestamps: true, // Optional: Adds createdAt and updatedAt fields
  versionKey: false // Optional: Removes the __v field
});

// Apply the default value to the arrays at the schema level
postSchema.path('likes').default([]);
postSchema.path('comments').default([]);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
