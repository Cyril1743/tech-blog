const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")

class Comments extends Model { }

Comments.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }, postId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: "id"
        }
    }, userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id"
        }
    },
    date: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
})

module.exports = Comments