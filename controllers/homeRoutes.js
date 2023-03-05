const router = require('express').Router();
const{ Movie, User, Comment } = require('../models');
const chalk = require('chalk');
new chalk.Instance({level: 3});
const withAuth = require('../utils/auth');

//route to get all movies
router.get("/", async (req, res) => {
 try{
    const movieData = await Movie.findAll({
   
    });
    const movies = movieData.map((movie) => movie.get({ plain: true }));
    console.log(movies)
    res.render("homepage", {
        movies,
        logged_in: req.session.loggedIn
    });
 } catch (err) {
    console.log(chalk.bgRed(err))
    res.status(500).json(err);
 }
});

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        // user_id: req.session.user_id,
      });
      console.table(newComment);
      res.status(200).json(newComment);
    } catch (err) {
        console.log(chalk.bgRed(err));
      res.status(400).json(err);
    }
  });

//route to get a movie with all comments and username
router.get("/movie/:id", async (req, res) => { 
try {
    const movieData = await Movie.findByPk(req.params.id, {
        include: [
             
            {
                model: Comment, as : "movieComments",
                attributes: ["id", "feedback", "rating", "user_id"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
          
        ]
    })
    
    if(movieData) {
     const movie = movieData.get({ plain: true });
     res.render("movies", { movie, logged_in: req.session.loggedIn });

    } else {
        console.log(chalk.bgYellow("No movie found with this id!"));
        res.status(404).end();
    }
} catch (err) {
    console.log(chalk.bgRed(err))
    res.status(500).json(err);
}
});

// checks to see if user is logged in. If they are, they are redirected to the homepage. If not, they are redirected to the login page. to prevent users who are already logged in from accessing login page again, and display login to users who are not logged in.
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/profile");
        return;
    } 
    res.render("login");
});

router.get("/profile", async (req, res) => {
    try {
        const userData = await User.findByPk( req.session.user_id );
        const commentData = await Comment.findAll({
             where: {
                 user_id: req.session.user_id,
             },
             include: [
                {
                    model: Movie,
                    attributes: ["name"],
                }
             ]
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        const user = userData.get({ plain: true });
        res.render('profile', { user, comments, logged_in: req.session.loggedIn});
    } catch (err) {
        console.log(chalk.bgRed(err));
        res.status(500).json(err);
    }
});

//if not signed in, will render signup page. If signed in, will redirect to homepage.
// router.get("/login", (req, res) => {
//     if (req.session.loggedIn) {
//         res.redirect("/");
//         return;
//     }
//     res.render("login");
// });

module.exports = router;


