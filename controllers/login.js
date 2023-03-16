const login = require("express").Router()
const { User } = require("../models/index")

login.get("/", (req, res) => {
    res.render("login")
})

login.post("/", async (req, res) => {
    await User.create({
        userName : req.body.username,
        password : req.body.password
    })
})