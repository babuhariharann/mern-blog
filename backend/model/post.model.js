import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: "uncategory"
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png"
  }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;