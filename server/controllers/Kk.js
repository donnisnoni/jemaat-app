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
    .then((foundedKKs) => {
      // setTimeout(() => {
      reply.send(foundedKKs)
      // }, 5000);
    })
    .catch((err) => {
      console.error(err)
      reply.send(err)
    })
}

/**
 * KK create controller
 * @type {import("fastify").RouteHandler}
 */
const create = (req, reply) => {
  console.log(req.body)
  db.kk
    .create(req.body)
    .then((kk) => {
      kk.save()
      reply.send(kk)
    })
    .catch((err) => {
      console.log(err)
    })
  // reply.send('ok')
}

module.exports = {
  get,
  create,
}
