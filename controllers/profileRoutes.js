const router = require('express').Router();
const { Movie } = require('../models');
const withAuth = require('../utils/auth');
const chalk = require('chalk');
new chalk.Instance({level: 3});

//route to get all movies
router.get("/", withAuth, async (req, res) => {
    try {
        const movieData = await Movie.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        const movies = movieData.map((movie) => movie.get({ plain: true }));
        console.log(chalk.bgGreen(movies));
        res.render("profile", {
            movies,
        });
    } catch (err) {
        console.log(chalk.bgRed(err));
        res.redirect("login");
    }
});

//get all comments for a single user
router.get('/comments/user_id/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Movie,
                    attributes: ['name'],
                },
            ],
        });
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        console.log(chalk.bgGreen(comments));
        res.render('profile', {
            comments,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(chalk.bgRed(err));
        res.status(500).json(err);
    }
});