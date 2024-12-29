import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UserDetails } from "../model/User.js";
import { Blog } from "../model/Blog.js"
import { BlogComment } from "../model/Comment.js"
import { BlogLikes } from "../model/Like.js";
import mongoose from "mongoose";


const BlogComments = AsyncHandler(async (req, res) => {
    const { comment } = req.body;
    const userId = req.user.id;
    const blogId = req.params.id;

    const comments = await BlogComment.create({
        comment,
        user: userId
    })
    console.log(comments);


    await Blog.findByIdAndUpdate(
        blogId,
        { $push: { blogcomment: comments._id } },
        { new: true }
    )

    if (!comments) {
        return res.status(500).json(
            new ApiError(
                500,
                {},
                "Server Error"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { comments },
            "Comment"
        )
    )

})

const GetBlogWithComments = AsyncHandler(async (req, res) => {
    const blogId = req.params.id;



    const blog = await Blog.findById(blogId).populate({
        path: 'blogcomment',  // The path in your Blog model where comments are stored
        populate: {
            path: 'user',  // The field in your Comment schema referencing the User
            select: 'username',  // Select fields to populate from the User schema (e.g., username)
        },
    });



    return res.status(200).json(
        new ApiResponse(
            200,
            { blog },
            "Blog with comments fetched successfully"
        )
    );
});


const DeleteComment = AsyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const {blogId} = req.body;
    console.log(commentId);

    const user = await Blog.findById(blogId)
console.log(user);

     const comment = await BlogComment.findById(commentId)
     if (!comment) {
         return res.status(401).json(
             new ApiError(
                 401,
                 {},
                 "No comment"
             )
         )
     }

     const deletecomment = await BlogComment.deleteOne({ _id: comment })

     await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { blogcomment: commentId } },
        { new: true }
    )

     if (!deletecomment) {
         return res.status(500).json(
             new ApiError(
                 500,
                 {},
                 "Server error"
             )
         )
     }


    return res.status(200).json(
        new ApiResponse(
            200,
            {user},
            "comment deleted"
        )
    )
});


const BlogLike = AsyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.id;

    const existingLike = await BlogLikes.findOne({ user: userId, blog: blogId });


    if (existingLike) {
        await existingLike.deleteOne();
        await UserDetails.findByIdAndUpdate(
            userId,
            { $pull: { likedBlogs: blogId } },
            { new: true }
        );

        await Blog.findByIdAndUpdate(
            blogId,
            { $pull: { bloglike: existingLike._id } },
            { new: true }
        );
        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Blog unliked successfully"
            )
        );
    }

    const newLike = await BlogLikes.create({
        blog: blogId,
        user: userId,
    });


    await BlogLikes.findByIdAndUpdate(
        blogId,
        { $push: { blog: newLike._id } },
        { new: true }
    )

    await Blog.findByIdAndUpdate(
        blogId,
        { $push: { bloglike: newLike._id } },
        { new: true }
    )



    if (!newLike) {
        return res.status(500).json(
            new ApiError(
                500,
                {},
                "Failed to like the blog"
            )
        );
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            { newLike },
            "Blog liked successfully"
        )
    );
})

const GetBlogLikes = AsyncHandler(async (req, res) => {
    const { blogId } = req.params.id;

    const likes = await BlogLikes.find({ blog: blogId })
        .populate({
            path: 'user',
            model: 'UserDetails',
            select: 'name',
        });


    return res.status(200).json(
        new ApiResponse(
            200,
            { likes },
            "Likes fetched successfully"
        )
    );
});


export { BlogComments, GetBlogWithComments, BlogLike, GetBlogLikes, DeleteComment }
