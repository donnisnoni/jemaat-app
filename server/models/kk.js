'use strict'
const { Model, Sequelize, DataTypes } = require('sequelize')
const enums = require('./enums.json')
const sequelize = require('./sequelize')

class KepalaKeluarga extends Model {}

/** @type {import('sequelize/types').ModelAttributes} */
const attributes = {
  id_kk: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  id_rayon: {
    type: DataTypes.INTEGER.UNSIGNED,
    key: true,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status_nikah: {
    type: DataTypes.ENUM(enums.status_nikah),
    allowNull: false,
  },
  no_hp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kategori_rumah: {
    type: DataTypes.ENUM(enums.kategori_rumah),
    allowNull: false,
  },
  status_rumah: {
    type: DataTypes.ENUM(enums.status_rumah),
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

KepalaKeluarga.init(attributes, {
  freezeTableName: true,
  modelName: 'kepala_keluarga',
  sequelize,
  tableName: 'kepala_keluarga',
  timestamps: false,
})

module.exports = KepalaKeluarga
