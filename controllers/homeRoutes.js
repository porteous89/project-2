const router = require('express').Router();
const{ Movie } = require('../../models');

router.get("/", async (req, res) => {
 try{
    const movieData = await Movie.findAll({
        where: {
            user_id: req.session.user_id,
        },
    });
    const movies = movieData.map((movie) => movie.get({ plain: true }));
    res.render("homepage", {
        movies,
    });
 } catch (err) {
    res.status(500).json(err);
 }
});

router.get("/movie/:id", async (req, res) => { 
try {
    const movieData = await Movie.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User]
            }
        ]
    })
    if(movieData) {
     const movie = movieData.get({ plain: true });
     res.render("movies", { movie});
    } else {
        res.status(404).end();
    }
} catch (err) {
    res.status(500).json(err);
}
});

router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    } 
    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("signup");
});

module.exports = router;


