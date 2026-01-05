import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userFullname: String,
    text: String
  },
  { timestamps: true }
);

const communityPostSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String, // optional
    postedBy: {
      userId: { type: mongoose.Schema.Types.ObjectId },
      userFullname: String,
      role: { type: String, enum: ["user", "Shop", "Doctor"] }
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId }],
    comments: [commentSchema]
  },
  { timestamps: true }
);

export default mongoose.model("CommunityPost", communityPostSchema);
