const db = require('../models')
const { fn, col } = require('sequelize')
// const { hasDuplicates } = require('../utils')

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
  if (!req.body) {
    return reply.code(400).send()
  }

  const KK = req.body

  db.kk
    .create(KK)
    .then(async (buildedKK) => {
      const createdKK = await buildedKK.save()
      KK.anggota_kk.forEach(async (anggota_kk) => {
        anggota_kk['id_kk'] = createdKK.id_kk
        const buildedAnggotaKK = await db.anggota_kk.create(anggota_kk)
        await buildedAnggotaKK.save()
      })
      reply.send(createdKK)
    })
    .catch((err) => console.log(err))
}

module.exports = {
  get,
  create,
}
