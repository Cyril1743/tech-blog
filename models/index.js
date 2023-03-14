const Comments = require("./Comments")
const Post = require("./Post")
const User = require("./User")

User.hasMany(Post, {
    foreignKey: 'id',
    onDelete: "CASCADE"
})

Post.belongsTo(User, {
    foreignKey: "id",
    onDelete: "CASCADE"
})

Post.hasMany(Comments, {
    foreignKey: 'id',
    onDelete: "CASCADE"
})

Comments.belongsTo(Post, {
    foreignKey: "id",
    onDelete: "CASCADE"
})

module.exports = { User, Post, Comments}