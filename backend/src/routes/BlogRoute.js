import { Router } from "express";
import { CreateBlog } from "../controller/BlogController.js";
import { UpdateBlog } from "../controller/BlogController.js";
import { DeleteBlog } from "../controller/BlogController.js";
import { ShowAuthorAllBlogs } from "../controller/BlogController.js";
import { ShowAllBlogs } from "../controller/BlogController.js";
import { VerifyUser } from "../middleware/AuthMiddleware.js";
import { BlogComments } from "../controller/BlogCommentAndLikeController.js";
import { GetBlogWithComments } from "../controller/BlogCommentAndLikeController.js";
import { GetBlogLikes } from "../controller/BlogCommentAndLikeController.js";
import { BlogLike } from "../controller/BlogCommentAndLikeController.js";
import { ShowBlogsByID } from "../controller/BlogController.js";
import { DeleteComment } from "../controller/BlogCommentAndLikeController.js";
import {upload } from "../middleware/MulterMiddlerware.js"


const blogrouter = Router();


blogrouter.route("/blogs").post(
    VerifyUser,
    CreateBlog

)

blogrouter.route("/blogs/:id").put(
    VerifyUser, UpdateBlog
)

blogrouter.route("/blogs/:id").delete(
    VerifyUser, DeleteBlog
)

blogrouter.route("/:userId/blogs").get(
    VerifyUser, ShowAuthorAllBlogs
)
blogrouter.route("/blogs/:id").get(
    VerifyUser , ShowBlogsByID
)

blogrouter.route("/blogs").get(
    ShowAllBlogs
)

blogrouter.route("/blogcomment/:id").post(
   VerifyUser, BlogComments
)
blogrouter.route("/bloglike/:id").get(
    VerifyUser, BlogLike
 )
 blogrouter.route("/blogallcommets/:id").get(
    VerifyUser , GetBlogWithComments
 )
 blogrouter.route("/bloglikes/:id").get(
    VerifyUser , GetBlogLikes
 )
 blogrouter.route("/deletecomment/:id").delete(
    VerifyUser, DeleteComment
 )

export { blogrouter }