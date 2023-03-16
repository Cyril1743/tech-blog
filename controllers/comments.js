const comments = require("express").Router()
const { User, Post, Comments } = require("../models/index")

comments.post("/:id", async (req, res) => {
    
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

module.exports = comments