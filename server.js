const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const hbs = exphbs.create({ })
const sequelize = require("./config/connection")
const { Post, User } = require("./models/index")

const app = express()
const PORT = process.env.PORT || 3001

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.get("/", async (req, res) => {
    const posts = await Post.findAll()
    if(!posts) {
        return res.render('all', {message: "No posts"})
    }
    const post = posts.map(post => post.get({ plain: true }))
    res.render("all", post)
})

sequelize.sync().then(
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
)