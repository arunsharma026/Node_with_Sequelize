const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig.js');

// Initialize Sequelize instance
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
        logging: true, // Disable logging or use a logging function if needed
    }
);

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Initialize models
const db = {};

// Attach Sequelize and sequelize instances to db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models and associate them
db.products = require('./productModel.js')(sequelize, DataTypes); 
db.reviews = require('./reviewModel.js')(sequelize, DataTypes);

// 1 to Many Relation
db.products.hasMany(db.reviews, {
    foreignKey: 'productId', // Fixed typo
    as: 'reviews12'
});
db.reviews.belongsTo(db.products, {
    foreignKey: 'productId', // Fixed typo
    as: 'product' // This should be singular if each review belongs to a single product
});

// Sync database
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database sync complete.');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

module.exports = db;
