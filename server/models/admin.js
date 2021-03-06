'use strict'
const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

class Admin extends Model {}

/** @type {import('sequelize/types').ModelAttributes} */
const attributes = {
  id_admin: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    key: true,
    allowNull: false,
  },
  sandi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  super_admin: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
  },
}

Admin.init(attributes, {
  sequelize,
  modelName: 'admin',
  timestamps: false,
  freezeTableName: true,
})

module.exports = Admin
