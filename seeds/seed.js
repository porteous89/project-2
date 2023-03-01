const seedUsers = require('./userData');
const seedMovies = require('./movieData');
const seedComments = require('./commentData');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Database Synced!');

    await seedUsers();
    console.log('Users Seeded!');

    await seedMovies();
    console.log('Movies Seeded!');

    await seedComments();
    console.log('Comments Seeded!');

    process.exit(0);
};

seedAll();