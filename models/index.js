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

User.hasMany(Comments, {
})

Comments.belongsTo(User, {
})
// Comments.belongsToMany(User, {
//     through: "Post"
// })

module.exports = { User, Post, Comments}