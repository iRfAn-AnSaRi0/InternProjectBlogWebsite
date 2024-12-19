import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UserDetails } from "../model/User.js";
import { Blog } from "../model/Blog.js"
import { UploadFile } from "../utils/Cloudinary.js";
import mongoose from "mongoose";


const CreateBlog = AsyncHandler(async (req, res) => {

    const { blogtitle, blogcontent} = req.body;

    const user = req.user.id

    const blogthumbnaillocalpath = req.files?.blogthumbnailurl[0]?.path;

    const blogthumbnailuploade = await UploadFile(blogthumbnaillocalpath)

    const BlogCreated = await Blog.create({
        blogtitle,
        blogcontent,
        blogthumbnailurl:blogthumbnailuploade.url,
        blogauthor: user
    })

    if (!BlogCreated) {
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
            { BlogCreated },
            "Blog is created successfully"
        )
    )

})

const DeleteBlog = AsyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return res.status(401).json(
            new ApiError(
                401,
                {},
                "Blog not found"
            )
        )
    }


    const RemoveBlog = await Blog.deleteOne({ _id: blog })

    if (!RemoveBlog) {
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
            {},
            "Blog is deleted successfully"
        )
    )
})

const UpdateBlog = AsyncHandler(async (req, res) => {
    const { blogtitle, blogcontent, blogthumbnailurl } = req.body;

    const blog = await Blog.findById(req.params.id);

    blog.blogtitle = blogtitle || blog.blogtitle;
    blog.blogcontent = blogcontent || blog.blogcontent;
    blog.blogthumbnailurl = blogthumbnailurl || blog.blogthumbnailurl;

    const updateBlog = await blog.save();

    if (!updateBlog) {
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
            {},
            "Blog is updated successfully"
        )
    )

})

const ShowAuthorAllBlogs = AsyncHandler(async (req, res) => {
    const userId = req.params.id;

    const blogs = await Blog.find({ blogauthor: userId })

    if (!blogs) {
        return res.status(500).json(
            new ApiError(
                500,
                {},
                "Server Error"
            )
        )
    }
    if (blogs.length == 0) {
        return res.status(200).json(
            new ApiResponse(
                200,
                { message: "No Blog Found" },
                "Blog fetch successfully"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { blogs },
            "Blog fetch successfully"
        )
    )

})

const ShowAllBlogs = AsyncHandler(async (_, res) => {
    const blogs = await Blog.find();

    if (!blogs) {
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
            { blogs },
            "Success"
        )
    )
})

export { CreateBlog, DeleteBlog, UpdateBlog, ShowAuthorAllBlogs, ShowAllBlogs }