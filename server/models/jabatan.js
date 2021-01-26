'use strict'
const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

class Jabatan extends Model {}

/** @type {import('sequelize/types').ModelAttributes} */
const attributes = {
  id_jabatan: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipe: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}

Jabatan.init(attributes, {
  sequelize,
  modelName: 'jabatan',
  timestamps: false,
  freezeTableName: true,
})

module.exports = Jabatan
