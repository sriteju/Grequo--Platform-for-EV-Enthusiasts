const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  question:{
      type:String,
      required:true
  },
  answers :[
      {ans:String,userId:String}
  ]
});


const Post = new mongoose.model("Post", postSchema);
module.exports = Post;