const router = require('express').Router();
const { User } = require('../../models');
const chalk = require('chalk');
new chalk.Instance({ level: 3 });

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
        console.log(chalk.bgGreen(newUser));
    } catch (err) {
        console.log(chalk.bgRed(err));
        res.status(500).json(err);
    };
});

//get all comments for a single user
router.get("/:id/comments", async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_feedback', 'movie_id', 'user_id', 'created_at'],
                    include: {
                        model: Movie,
                        attributes: ['name'],
                    }
                }
            ]
        });
        if (!userData) {
            console.log(chalk.bgYellow("No user found with this id"));
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        console.log(chalk.bgGreen(userData));
        res.json(userData);
    } catch (err) {
        console.log(chalk.bgRed(err));
        res.status(500).json(err);
    }
});


router.post("/login", async (req, res) => {
    try {
        const userdata = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!userdata) {
            console.log(chalk.bgYellow("No user with that email address!"));
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        const validPassword = await userdata.checkPassword(req.body.password);

        if (!validPassword) {
            console.log(chalk.bgYellow("Incorrect password!"));
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        console.log(chalk.bgGreen("You are now logged in!"));

        req.session.save(() => {
            req.session.user_id = userdata.id;

            req.session.email = userdata.email;

            req.session.loggedIn = true;

            res.json({ userdata, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(chalk.bgYellow(err));
        res.status(400).json(err);
    }
});


router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
            console.log(chalk.bgGreen("You are now logged out!"));
        });
    } else {
        console.log(chalk.bgYellow("You could not be logged out!"));
        res.status(404).end();
    }
});

module.exports = router;