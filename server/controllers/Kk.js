'use strict'
const db = require('../models')
const { fn, col } = require('sequelize')
// const { hasDuplicates } = require('../utils')

const logError = (err) => console.log(err)

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
    .catch(logError)
}

/**
 * KK get by id controller
 * @type {import("fastify").RouteHandler}
 */
const getByID = (req, reply) => {
  const id = +req.params.id
  if (isNaN(id) || id < 1) {
    return reply.code(400).send({ message: 'id harus berupa angka' })
  }
  const isExclude = !!req.query.no_timestamps || false
  const excludeCols = isExclude ? ['tgl_buat', 'tgl_terakhir_update'] : []
  db.kk
    .findByPk(id, {
      attributes: {
        exclude: excludeCols,
      },
      include: {
        model: db.anggota_kk,
        as: 'anggota_kk',
        attributes: {
          exclude: excludeCols,
        },
      },
    })
    .then((foundedKK) => {
      reply.send(foundedKK)
    })
    .catch(logError)
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
    .catch(logError)
}

/**
 * KK update controller
 * @type {import("fastify").RouteHandler}
 */
const update = (req, reply) => {
  const id = +req.params.id
  if (isNaN(id) || id < 1) {
    return reply.code(400).send({ message: 'id harus berupa angka' })
  }
  if (!req.body) {
    return reply.code(400).send({ message: 'Data kepala keluarga diperlukan' })
  }

  const KK = req.body
  KK.tgl_buat = null
  KK.tgl_terakhir_update = null

  db.kk
    .findByPk(id)
    .then(async (foundedKK) => {
      await foundedKK.update(KK)

      if (KK.hasOwnProperty('anggota_kk') && KK.anggota_kk instanceof Array) {
        // Update/Create each anggota KK
        KK.anggota_kk.forEach(async (anggota_kk) => {
          anggota_kk.tgl_buat = null
          anggota_kk.tgl_terakhir_update = null
          if (anggota_kk.hasOwnProperty('id_anggota_kk')) {
            await db.anggota_kk
              .findByPk(anggota_kk.id_anggota_kk)
              .then((foundedAnggotaKK) => foundedAnggotaKK.update(anggota_kk))
          } else {
            anggota_kk.id_kk = KK.id_kk
            await db.anggota_kk.create(anggota_kk)
          }
        })
        // Delete each anggota KK that not in the list
        const anggotaKKsFromDB = (await db.anggota_kk.findAll({ where: { id_kk: id } })) || []
        const anggotaKKIdsFromDB = anggotaKKsFromDB.map((anggotaKK) => anggotaKK.id_anggota_kk)
        const anggotaKKIdsFromRequest = KK.anggota_kk.map((anggotaKK) => anggotaKK.id_anggota_kk)
        anggotaKKIdsFromDB.forEach((anggotaKKIdFromDB, idx) => {
          if (!anggotaKKIdsFromRequest.includes(anggotaKKIdFromDB)) {
            anggotaKKsFromDB[idx].destroy({ force: true })
          }
        })
      }

      reply.send({ message: `Sukses mengupdate kepala keluarga` })
    })
    .catch(logError)
}

async function remove(req, reply) {
  const id = +req.params.id
  if (isNaN(id) || id < 1) {
    return reply.code(400).send({ message: 'id harus berupa angka' })
  }
  const targetKK = await db.kk.findByPk(id)
  if (!targetKK) {
    return reply.send({ message: `Tidak dapat menemukan keluarga dengan id ${id}` })
  }
  await targetKK.destroy({ force: true })
  return reply.send({ message: `Sukses menghapus kelaurga dengan id ${id}` })
}

module.exports = {
  create,
  get,
  getByID,
  remove,
  update,
}
