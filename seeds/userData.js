const { User } = require('../models');

const userData = [
    {
        "username": "Tomas",
        "location": "New York",
        "email": "Tomas123@gmail.com",
        "password": "password123",
    },
    {
        "username": "Navdeep",
        "location": "Paris",
        "email": "navrocks123@gmail.com",
        "password": "password123", 
    },
    {
        "username": "Alister",
        "location": "Los Angeles",
        "email": "BigAl123@gmail.com",
        "password": "password123",
    },
    {
        "username": "Sal",
        "location": "In The Cloud",
        "email": "Salabc@gmail.com",
        "password": "password123",
    }
]

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
})

module.exports = seedUsers;