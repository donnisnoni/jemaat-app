const db = require('../models')
const { fn, col } = require('sequelize')

/**
 * KK get controller
 * @type {import("fastify").RouteHandler}
 */
const get = (req, reply) => {
  db.kk
    .findAll({
      attributes: {
        include: [[fn('COUNT', col('anggota_kk.id_kk')), 'jumlah_anggota_kk']],
      },
      include: {
        model: db.anggota_kk,
        as: 'anggota_kk',
      },
      group: 'kepala_keluarga.id_kk',
      // order: [['tgl_buat', 'DESC']],
    })
    .then((dataKK) => {
      // setTimeout(() => {
      reply.send(dataKK)
      // }, 5000);
    })
    .catch((err) => {
      console.error(err)
      reply.send(err)
    })
}

module.exports = {
  get,
}
