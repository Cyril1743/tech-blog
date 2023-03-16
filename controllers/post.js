const post = require("express").Router()
const { Post, User, Comments } = require("../models/index")
const isAuth = require("../util/isAuth")

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

post.get("/:id", isAuth, async (req,res) => {
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

module.exports = post