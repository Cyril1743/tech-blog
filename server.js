const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const hbs = exphbs.create({})
const sequelize = require("./config/connection")
const { Post, User } = require("./models/index")

//Initialize express app
const app = express()
const PORT = process.env.PORT || 3001

//Middleware for express
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: { model: User }
        })
        const posts = postData.map(post => post.get({ plain: true }))
        res.render("all", { posts })
    } catch (error) {
        res.status(200).json(error)
    }
})

app.get("/user", async (req, res) => {
    try {
        const users = await User.findAll()
        if (!users) {
            return res.status(404).json("No users")
        }
        const user = users.map(user => user.get({ plain: true }))
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
})
app.post("/", async (req, res) => {
    try {
        await Post.create(req.body)
        res.status(201).json("Created")
    } catch (error) {
        res.status(400).json(error)
    }

})
app.post("/user", async (req, res) => {
    try {
        await User.create(req.body)
        res.status(201).json("Created")
    } catch (error) {
        res.status(400).json(error)
    }
})
sequelize.sync().then(
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
)