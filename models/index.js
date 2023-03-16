const Comments = require("./Comments")
const Post = require("./Post")
const User = require("./User")

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
})

Post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

Post.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
})

Comments.belongsTo(Post, {
    foreignKey: "post_id",
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