const post = require("express").Router()
const { Post, User, Comments } = require("../models/index")

post.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: { model: User }
        })
        const post = postData.get({ plain: true })
        const commentData = await Comments.findAll({
            where: {
                postId: req.params.id
            },
            include: { model: User }
        })
        const comments = commentData.map(comment => comment.get({ plain: true }))
        res.render("post", { post: post, comments: comments, username: req.session.username })
    } catch (error) {
        res.status(400).json(error)
    }
})

post.get("/update/:id", async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            }
        })
        const post = postData.get({ plain: true })
        res.render("updatePost", { post })
    } catch (error) {
        res.status(500).json(error)
    }

})

post.post("/", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                userName: req.session.username
            }
        })
        const user = userData.get({ plain: true })
        await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: user.id
        })
        res.status(201).json("Created")
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

})

post.put("/update/:id", async (req, res) => {
    try {
        await Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json("Updated")
    } catch (error) {
        res.status(404).json(error)
    }
})

post.delete("/:id", async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(202).json("Deleted!")
    } catch (error) {
        res.status(404).json(error)
    }
})
module.exports = post