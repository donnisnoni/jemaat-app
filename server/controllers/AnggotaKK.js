const db = require('../models')
// const { fn, col } = require('sequelize')

/**
 * Anggota KK get controller
 * @type {import("fastify").RouteHandler}
 */
async function get(req, reply) {
  const qMetadata = req.query.metadata
  const fields = req.query.fields && req.query.fields.length ? req.query.fields.split(',') : null
  const allowedFields = ['jumlah_jemaat', 'jumlah_jemaat_l', 'jumlah_jemaat_p']

  const getJumlahJemaat = () => db.anggota_kk.count()
  const getJumlahJemaatL = () => db.anggota_kk.count({ where: { jk: 'L' } })
  const getJumlahJemaatP = () => db.anggota_kk.count({ where: { jk: 'P' } })

  if (!!qMetadata) {
    let metadata = {}
    if (fields) {
      if (fields.includes(allowedFields[0])) {
        metadata[allowedFields[0]] = await getJumlahJemaat()
      }
      if (fields.includes(allowedFields[1])) {
        metadata[allowedFields[1]] = await getJumlahJemaatL()
      }
      if (fields.includes(allowedFields[2])) {
        metadata[allowedFields[2]] = await getJumlahJemaatP()
      }
    } else {
      metadata = {
        jumlah_jemaat: await getJumlahJemaat(),
        jumlah_jemaat_l: await getJumlahJemaatL(),
        jumlah_jemaat_p: await getJumlahJemaatP(),
      }
    }
    return reply.send(metadata)
  }

  const anggotaKKs = await db.anggota_kk.findAll()
  reply.send(anggotaKKs)
}

module.exports = {
  get,
}
