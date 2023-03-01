const router = require('express').Router();
const { User } = require('../../models');

// router.get("/", async (req, res) => {
//     User.findAll({
//         attributes: { exclude: ['password'] }
//         })
//         .then(dbUserData => res.json(dbUserData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.get("/:id", async (req, res) => {
//     User.findOne({
//         attributes: { exclude: ['password'] },
//         where: {
//             id: req.params.id
//         },
//         include: [
//             {
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'movie_id', 'user_id', 'created_at'],
//                 include: {
//                     model: Post,
//                     attributes: ['title']
//                 }
//             }
//         ]
//     })
//         .then(dbUserData => {
//             if (!dbUserData) {
//                 res.status(404).json({ message: 'No user found with this id' });
//                 return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.post("/", async (req, res) => {
    try {
        const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true;

                res.json(newUser);
            });
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});

router.post("/login", async (req, res) => {
    try {
        const user = await  User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!user) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }  
    });

router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;