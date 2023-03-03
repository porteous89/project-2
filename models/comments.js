const sequelize = require('../config/connection'); 
const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}

Comment.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'movie',
                key: 'id',
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        feedback: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
)

module.exports = Comment;