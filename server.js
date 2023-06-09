const express = require("express")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const exphbs = require("express-handlebars")
const hbs = exphbs.create({})

//Requires for sequelize
const sequelize = require("./config/connection")
const { Post, User } = require("./models/index")

//Requires for express
const user = require("./controllers/user")
const post = require("./controllers/post")
const comments = require("./controllers/comments")
const isAuth = require("./util/isAuth")

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
        res.render("all", {
            posts: posts,
            username: req.session.username
        })
    } catch (error) {
        res.status(200).json(error)
    }
})
app.get("/sign-up", (req, res) => {
    res.render("sign-up")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/dashboard", isAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                userName: req.session.username
            }
        })
        const { id } = userData.get({ plain: true })
        const postData = await Post.findAll({
            where: {
                userId: id
            }
        })
        const posts = postData.map(post => post.get({ plain: true }))
        res.render("dashboard", {
            username: req.session.username,
            posts: posts
        })
    } catch (error) {
        res.status(500).json(error)
    }


})
sequelize.sync().then(
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    })
)