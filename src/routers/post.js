const express = require('express')
const Post = require('../models/post.js')
const auth = require('../middleware/auth.js')
const router = express.Router()

router.post('/posts', auth, async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      owner: req.user._id,
    })
    await post.save()
  
    res.send(post) 
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({owner: req.user._id})
    res.send(posts) 
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      throw new Error("Cant find post");
    }
    res.send(post) 
  } catch (error) {
    res.status(400).send(error)
  }
})

router.patch('/posts/:id', auth, async (req, res) => {
  try {
    const allowedUpdate = ['text']
    const updates = Object.keys(req.body)
    const post = await Post.findById(req.params.id)

    if (!post) {
      throw new Error("Cant find post");
    }
  
    updates.forEach((update) => {
      if (allowedUpdate.includes(update)) {
        post[update] = req.body[update]
      } else {
        throw new Error("You can only update text");
      }
    })
  
    await post.save()
    res.send(post)   
  } catch (error) {
    res.status(400).send(error)
  }

})

router.delete('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
      throw new Error("Can not find post");
    }
    res.send({message: 'Post deleted'}) 
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/posts/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const alreadyLiked = post.likes.some((like) => like.toString() === req.user._id.toString());

    if (alreadyLiked) {
      throw new Error("You have already liked the post");
    }

    post.likes.push(req.user._id);
    await post.save();
    res.send(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/posts/:id/comment', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      throw new Error("Cannot find post");
    }

    post.comments.push({
      user: req.user._id,
      comment: req.body.comment
    })

    await post.save()

    res.send(post)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/posts/:id/comment/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Find the index of the comment to be deleted
    const commentIndex = post.comments.findIndex((comment) =>
      comment._id.toString() === req.params.commentId.toString() &&
      comment.user.toString() === req.user._id.toString()
    );

    // Check if the comment exists and the user has permission to delete it
    if (commentIndex === -1) {
      return res.status(403).send({ error: "You are not authorized to delete this comment or comment not found" });
    }

    // Remove the comment from the array
    post.comments.splice(commentIndex, 1);

    await post.save();

    res.send(post);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router