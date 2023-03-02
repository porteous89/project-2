const router = require('express').Router();
const{ Movie, User, Comment } = require('../models');

//route to get all movies
router.get("/", async (req, res) => {
 try{
    const movieData = await Movie.findAll({
        where: {
            id: req.session.id,
        },
    });
    const movies = movieData.map((movie) => movie.get({ plain: true }));
    res.render("homepage", {
        movies,
    });
 } catch (err) {
    console.log(err)
    res.status(500).json(err);
 }
});

//route to edit a movie
router.get("/movie/:id", async (req, res) => { 
try {
    const movieData = await Movie.findByPk(req.params.id, {
        include: [
            {
                model: Comment, as : "movie comments",
            },
        ]
    })
    if(movieData) {
     const movie = movieData.get({ plain: true });
     res.render("homepage", { movie});
    } else {
        res.status(404).end();
    }
} catch (err) {
    console.log(err)
    res.status(500).json(err);
}
});

// checks to see if user is logged in. If they are, they are redirected to the homepage. If not, they are redirected to the login page. to prevent users who are already logged in from accessing login page again, and display login to users who are not logged in.
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    } 
    res.render("login");
});

//if not signed in, will render signup page. If signed in, will redirect to homepage.
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

module.exports = router;


