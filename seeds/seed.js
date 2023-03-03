const seedUsers = require('./userData');
const seedMovies = require('./movieData');
const seedComments = require('./commentData');
const sequelize = require('../config/connection');
const chalk = require('chalk');
new chalk.Instance({level: 3});


const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log(chalk.bgBlue('Database Synced!'));

    await seedUsers();
    console.log(chalk.bgYellow('Users Seeded!'));

    await seedMovies();
    console.log(chalk.bgBlue('Movies Seeded!'));

    await seedComments();
    console.log(chalk.bgYellow('Comments Seeded!'));

    process.exit(0);
};

seedAll();