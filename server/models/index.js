const { model } = require('./sequelize');
const sequelize = require('./sequelize');

const models = {
  rayon: require('./rayon'),
  admin: require('./admin'),
  jabatan: require('./jabatan'),
  kk: require('./kk'),
  anggota_kk: require('./anggota_kk'),
};

models.kk.rayon = models.kk.belongsTo(models.rayon, {
  as: 'rayon',
  foreignKey: 'id_rayon',
});
models.rayon.kk = models.rayon.hasMany(models.kk, {
  as: 'kepala_keluarga',
  foreignKey: 'id_rayon',
});
models.anggota_kk.belongsTo(models.kk);
models.kk.hasMany(models.anggota_kk);
models.anggota_kk.hasOne(models.jabatan);

module.exports = { sequelize, ...models };
