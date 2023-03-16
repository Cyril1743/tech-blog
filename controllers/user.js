const user = require("express").Router()
const { User } = require("../models/index")

user.post("/", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                userName: req.body.username
            }
        })
        if (user) {
            return res.render("sign-up", { message: "User already exists" })
        }
        await User.create({
            userName: req.body.username,
            password: req.body.password
        })
        res.status(201).redirect("/login")
    } catch (error) {
        res.status(400).json(error)
    }
})
user.post("/login", async (req, res) => {
    const user = await User.findOne({
        where: {
            userName: req.body.username
        }
    })
    if (!user) {
        return res.render("login", { message: "No such user" })
    }
    const password = await user.checkPassword(req.body.password)
    if (!password) {
        return res.render("login", {
            message: "Invalid password"
        })
    }
    req.session.save(() => {
        req.session.username = req.body.username
        req.session.loggedIn = true
        res.render("dashboard")
    })
})

user.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/login")
})

module.exports = user