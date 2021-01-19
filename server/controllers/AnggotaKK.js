const db = require('../models')
// const { fn, col } = require('sequelize')

/**
 * Anggota KK get controller
 * @type {import("fastify").RouteHandler}
 */
async function get(req, reply) {
  const qMetadata = req.query.metadata

  if (!!qMetadata) {
    const metadata = {
      jumlah_jemaat: await db.anggota_kk.count(),
      jumlah_jemaat_l: await db.anggota_kk.count({ where: { jk: 'L' } }),
      jumlah_jemaat_p: await db.anggota_kk.count({ where: { jk: 'P' } }),
    }
    return reply.send(metadata)
  }

  const anggotaKKs = await db.anggota_kk.findAll()
  reply.send(anggotaKKs)
}

module.exports = {
  get,
}
