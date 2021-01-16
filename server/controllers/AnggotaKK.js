const db = require('../models')
// const { fn, col } = require('sequelize')

/**
 * Anggota KK get controller
 * @type {import("fastify").RouteHandler}
 */
async function get(req, reply) {
  if (req.query && req.query.count) {
    const totalAnggotaKKs = await db.anggota_kk.count()
    return reply.send(totalAnggotaKKs)
  }
  const anggotaKKs = await db.anggota_kk.findAll()
  reply.send(anggotaKKs)
}

module.exports = {
  get,
}
