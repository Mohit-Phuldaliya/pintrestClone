const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [], // saving user ids
  },
  //   comments: [
  //     {
  //       text: String,
  //       user: {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: "User",
  //       },
  //       createdAt: {
  //         type: Date,
  //         default: Date.now,
  //       },
  //     },
  //   ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
