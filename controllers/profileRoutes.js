const router = require('express').Router();
const { Movie } = require('../models');
const withAuth = require('../utils/auth');

//route to get all movies
router.get("/", withAuth, async (req, res) => {
    try {
        const movieData = await Movie.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        const movies = movieData.map((movie) => movie.get({ plain: true }));
        res.render("profile", {
            movies,
        });
    } catch (err) {
        res.redirect("login");
    }
});

//route to edit a movie
// router.get("/edit/:id", withAuth, async (req, res) => {
//     try {
//         const movieData = await Movie.findByPk(req.params.id);
//         if (!movieData) {
//             res.status(404).json({ message: "No movie found with this id!" });
//             return;
//         }
//         const movie = movieData.get({ plain: true });
//         res.render("edit-movie", {
//             movie,
//             loggedIn: true,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// ?????????????????????????