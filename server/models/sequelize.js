const { Sequelize } = require('sequelize')

const instance = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DB || 'jemaat',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  dialect: 'mariadb',
})

// instance.sync({ alter: true })

module.exports = instance
