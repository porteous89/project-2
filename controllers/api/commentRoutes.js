const router = require("express").Router();
const { User, Comment, Movie } = require("../../models/");
const withAuth = require("../../utils/auth");
const chalk = require("chalk");
new chalk.Instance({ level: 3 });

//GET all comments
router.get("/", async (req, res) => {

  try {
    const commentData = await Comment.findAll({
      // where: {
      //     user_id: req.session.user_id,
      // },


      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Movie,
          attributes: ["name"],
        },
      ],
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.log(chalk.bgGreen(comments));
    res.render("homepage", {
      comments,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(chalk.bgRed(err));
    res.status(500).json(err);
  }
});

//GET a single comment by ID
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    res.status(200).json(commentData);
    console.log(chalk.bgGreen(commentData));
  } catch (err) {
    console.log(chalk.bgRed(err));
    res.status(500).json(err);
  }
});

//POST a new comment
// router.post("/", withAuth, async (req, res) => {
//     try {
//         const newComment = await Comment.create({
//             comment_text: req.body.comment_text,
//             user_id: req.session.user_id,
//         });
//         console.log(chalk.bgGreen(newComment));
//         res.status(200).json(newComment);
//     } catch (err) {
//         console.log(chalk.bgRed(err));
//         res.status(400).json(err);
//     }
// });

router.post("/", withAuth, async (req, res) => {
  console.log(req.body, "=====================>");
  try {
    const newComment = await Comment.create({
      feedback: req.body.feedback,
      rating: req.body.rating,
      movie_id: req.body.movie_id,
      user_id: req.session.user_id,
    });


    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT to update a comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//     if (!commentData[0]) {
//         console.log(chalk.bgYellow("No comment found with this id!"));
//         res.status(404).json({ message: "No comment found with this id!" });
//         return;
//     }
//     console.log(chalk.bgGreen("Comment updated successfully!"));
//     res.status(200).json({ message: "Comment updated successfully!" });
// } catch (err) {
//     console.log(chalk.bgRed(err));
//     res.status(500).json(err);
// }

//DELETE a comment by ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      console.log(chalk.bgYellow("No comment found with this id!"));
      res.status(404).json({ message: "No comment found with this id!" });
      return;

    }
    console.log(chalk.bgGreen("Comment deleted successfully!"));
    res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (err) {
    console.log(chalk.bgRed(err));
    res.status(500).json(err);
  }
});

module.exports = router;
