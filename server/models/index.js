const { model } = require('./sequelize')
const sequelize = require('./sequelize')

const models = {
  rayon: require('./rayon'),
  admin: require('./admin'),
  // jabatan: require('./jabatan'),
  kk: require('./kk'),
  anggota_kk: require('./anggota_kk'),
}

models.kk.belongsTo(models.rayon, {
  as: 'rayon',
  foreignKey: 'id_rayon',
})
models.rayon.hasMany(models.kk, {
  as: 'kepala_keluarga',
  foreignKey: 'id_rayon',
})

models.anggota_kk.belongsTo(models.kk, {
  as: 'anggota_kk',
  foreignKey: 'id_kk',
})
models.kk.hasMany(models.anggota_kk, {
  as: 'anggota_kk',
  foreignKey: 'id_kk',
})

// models.anggota_kk.hasOne(models.jabatan)

module.exports = { sequelize, ...models }
