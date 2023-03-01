const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./movieRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/movie', movieRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
