'use strict'
// const { DATE } = require('sequelize')
const { Model, Sequelize, DataTypes } = require('sequelize')
const sequelize = require('./sequelize')
const enums = require('./enums')

class AnggotaKepalaKeluarga extends Model {}

/** @type {import('sequelize/types').ModelAttributes} */
const attributes = {
  id_anggota_kk: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },

  id_kk: {
    type: DataTypes.INTEGER.UNSIGNED,
    key: true,
    allowNull: false,
  },

  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  jk: {
    type: DataTypes.ENUM('L', 'P'),
    allowNull: false,
  },

  tempat_lahir: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  tanggal_lahir: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM(enums.status_dalam_keluarga),
    allowNull: false,
  },

  golongan_darah: {
    type: DataTypes.ENUM(['A', 'B', 'AB', 'O']),
    allowNull: false,
  },

  sudah_baptis: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  tanggal_baptis: {
    type: DataTypes.DATE,
  },
  tempat_baptis: {
    type: DataTypes.STRING,
  },
  nama_pelayan_baptis: {
    type: DataTypes.STRING,
  },

  sudah_sidi: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  tanggal_sidi: {
    type: DataTypes.DATE,
  },
  tempat_sidi: {
    type: DataTypes.STRING,
  },
  nama_pelayan_sidi: {
    type: DataTypes.STRING,
  },

  sudah_sidi: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  tanggal_nikah: {
    type: DataTypes.DATE,
  },
  tempat_nikah: {
    type: DataTypes.STRING,
  },
  nama_pelayan_nikah: {
    type: DataTypes.STRING,
  },

  pendidikan: {
    type: DataTypes.ENUM(enums.pendidikan),
    allowNull: false,
  },

  kedudukan_di_jemaat: {
    type: DataTypes.ENUM(enums.kedudukan_di_jemaat),
    allowNull: false,
  },
  // id_jabatan: {
  //   type: DataTypes.INTEGER.UNSIGNED,
  //   allowNull: false,
  //   key: true,
  // },
  pekerjaan: {
    type: DataTypes.ENUM(enums.pekerjaan),
    allowNull: false,
  },
  penghasilan: {
    type: DataTypes.ENUM(enums.penghasilan),
    allowNull: false,
  },
  jaminan_kesehatan: {
    type: DataTypes.ENUM(enums.jaminan_kesehatan),
    allowNull: false,
  },
  keterangan: {
    type: DataTypes.ENUM(enums.keterangan),
    allowNull: false,
  },
  //
  tgl_buat: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  tgl_terakhir_update: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}

AnggotaKepalaKeluarga.init(attributes, {
  freezeTableName: true,
  modelName: 'anggota_kk',
  sequelize,
  tableName: 'anggota_kk',
  timestamps: false,
})

module.exports = AnggotaKepalaKeluarga
