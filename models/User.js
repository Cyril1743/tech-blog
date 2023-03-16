const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/connection")
const bcrypt = require("bcrypt")

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (userdata) => {
            userdata.password = await bcrypt.hash(userdata.password, 10)
        },
        beforeUpdate: async (updateduserdata) => {
            updateduserdata.password = await bcrypt.hash(updateduserdata.password, 10)
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})

module.exports = User