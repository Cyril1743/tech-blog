const user = require("express").Router()
const { User } = require("../models/index")

user.post("/", async (req, res) => {
    try {
        await User.create(req.body)
        res.status(201).json("Created")
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = user