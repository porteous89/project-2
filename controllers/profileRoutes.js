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