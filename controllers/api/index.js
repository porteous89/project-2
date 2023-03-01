const router = require('express').Router();
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');

router.use('/movies', movieRoutes);
router.use('/users', userRoutes);

module.exports = router;
