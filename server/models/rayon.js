'use strict'
const { Model, Sequelize, DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

class Rayon extends Model {}

/** @type {import('sequelize/types').ModelAttributes} */
const attributes = {
  id_rayon: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tgl_buat: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  tgl_terakhir_update: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}

Rayon.init(attributes, {
  freezeTableName: true,
  modelName: 'rayon',
  sequelize,
  timestamps: false,
})

module.exports = Rayon
