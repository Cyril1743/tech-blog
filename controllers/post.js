const post = require("express").Router()
const { Post, User, Comments } = require("../models/index")

post.get("/:id", async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: {model: User}
        })
        const post = postData.get({ plain: true })
        const commentData = await Comments.findAll({
            where: {
                postId: req.params.id
            },
            include: {model: User}
        })
        const comments = commentData.map(comment => comment.get({ plain: true }))
        res.render("post", { post: post, comments: comments })
    } catch (error) {
        res.status(400).json(error)
    }
})