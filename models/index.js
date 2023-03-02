const User = require('./users');
const Movie = require('./movies');
const Comment = require('./comments');

User.hasMany(Comment, {
    foreignKey: 'user_id',
    as : 'user comments',
    onDelete: 'CASCADE',
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

// Movie.belongsTo(User, {
//     foreignKey: 'user.id',
// })

// feel like something is missing here???

Movie.hasMany(Comment, {
    foreignKey: 'movie_id',
    as : 'movie comments',
    onDelete: 'CASCADE',
})

Comment.belongsTo(Movie, {
    foreignKey: 'movie_id',
})

module.exports = { User, Movie, Comment };