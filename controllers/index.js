const router = require('express').Router();
const chalk = require('chalk');
new chalk.Instance({level: 3});

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const dashboardRoutes = require('./dashboardRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/dashboard', dashboardRoutes);

module.exports = router;