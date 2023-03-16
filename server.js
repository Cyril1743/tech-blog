const express = require("express")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const exphbs = require("express-handlebars")
const hbs = exphbs.create({})
const sequelize = require("./config/connection")
const { Post, User } = require("./models/index")
const user = require("./controllers/user")
const post = require("./controllers/post")
const comments = require("./controllers/comments")

//Initialize express app
const app = express()
const PORT = process.env.PORT || 3001

//Middleware for express
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.use(session({
    secret: 'sdjfaklasdfkljasdfj;k',
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: true,

    store: new SequelizeStore({
        db: sequelize,
    }),
}))
//Using the routes from the folder
app.use("/user", user)
app.use("/post", post)
app.use("/comments", comments)

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
app.get("/sign-up", (req, res) => {
    res.render("sign-up")
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

app.get("/login", (req, res) => {
    res.render("login")
})
sequelize.sync().then(
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
)