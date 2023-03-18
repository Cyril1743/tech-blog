const comments = require("express").Router()
const { User, Comments } = require("../models/index")
const isAuth = require("../util/isAuth")

comments.get("/:id", isAuth, async (req, res) => {
    try {
        const commentData = await Comments.findByPk(req.params.id,
            { include: {model: User}})
        const comment = commentData.get({ plain: true })
        res.status(200).render("updateComment", { comment: comment, username: req.session.username })
    } catch (error) {
        res.status(500).json(error)
    }
})


comments.post("/:id", isAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                userName: req.session.username
            }
        })
        const user = userData.get({ plain: true })
        await Comments.create({
            content: req.body.content,
            postId: req.params.id,
            userId: user.id
        })
        res.status(201).json("Created")
    } catch (error) {
        res.status(400).json(error)
    }
})

comments.put("/:id", isAuth, async (req, res) => {
    if (req.body.username === req.session.username) {
        try {
            const userData = await User.findOne({
                where: {
                    userName: req.session.username
                }
            })
            const user = userData.get({ plain: true })
            const currentCommentData = await Comments.findByPk(req.params.id)
            const comment = currentCommentData.get({ plain: true})
            await Comments.update({
                content: req.body.content,
                postId: comment.postId,
                userId: user.id
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json("Updated")
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Log in as user who posted")
    }
})

comments.delete("/:id", async (req, res) => {
    try {
        await Comments.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json("Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = comments