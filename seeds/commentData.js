const { Comment } = require('../models');

const commentData = [
    {
        "movie_id": 1,
        "user_id": 1,
        "feedback": "I had no idea what was going on the entire time! CRAZY!",
    },
    {
        "movie_id": 1,
        "user_id": 3,
        "feedback": "What a wacky idea! I loved it!",
    }, {
        "movie_id": 2,
        "user_id": 2,
        "feedback": "Pretty much a letdown. I expected better!",
    }, {
        "movie_id": 3,
        "user_id": 4,
        "feedback": "Eye opening experience!",
    }, {
        "movie_id": 3,
        "user_id": 1,
        "feedback": "A trip back in time.",
    }, {
        "movie_id": 4,
        "user_id": 1,
        "feedback": "Another Fast movie, more fast cars and crazy stunts!",
    }, {
        "movie_id": 5,
        "user_id": 3,
        "feedback": "SHAZAM!!!!",
    }, {
        "movie_id": 6,
        "user_id": 2,
        "feedback": "Constatnt jabs but no knockout punches...",
    }, {
        "movie_id": 6,
        "user_id": 2,
        "feedback": "Yeah, I saw it twice!",
    }, {
        "movie_id": 7,
        "user_id": 4,
        "feedback": "This story never gets old",
    }, {
        "movie_id": 8,
        "user_id": 3,
        "feedback": "Knock knock, I'm not answering!",
    }, {
        "movie_id": 9,
        "user_id": 2,
        "feedback": "Took them long enough to make this sequel!",
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;