'use strict'
const db = require('../models')
const { fn, col } = require('sequelize')

const respNotFound = (id) => ({ message: `Tidak dapat menemukan keluarga dengan id ${id}` })

/**
 * KK get controller
 * @type {import("fastify").RouteHandler}
 */
async function get(req, reply) {
  const kks = await db.kk.findAll({
    attributes: {
      include: [[fn('COUNT', col('anggota_kk.id_kk')), 'jumlah_anggota_kk']],
    },
    include: {
      model: db.anggota_kk,
      as: 'anggota_kk',
    },
    group: 'kepala_keluarga.id_kk',
  })
  return kks
}

/**
 * KK get by id controller
 * @type {import("fastify").RouteHandler}
 */
async function getByID(req, reply) {
  const id = +req.params.id

  if (isNaN(id) || id < 1) {
    return reply.code(400).send()
  }

  const kk = await db.kk.findByPk(id, {
    include: {
      model: db.anggota_kk,
      as: 'anggota_kk',
    },
  })

  if (!kk) {
    return reply.send(400).send(respNotFound(id))
  }

  reply.send(kk)
}

/**
 * KK create controller
 * @type {import("fastify").RouteHandler}
 */
async function create(req, reply) {
  if (!req.body) {
    return reply.code(400).send()
  }

  const KK = req.body

  const createKK = await db.kk.create(KK)
  const save = await createKK.save()

  if (!save) {
    return reply.code(500).send({ message: `Gagal menambahkan keluarga baru` })
  }

  reply.send({ message: 'Sukses menambahkan keluarga baru' })
}

/**
 * KK update controller
 * @type {import("fastify").RouteHandler}
 */
async function update(req, reply) {
  const id = +req.params.id

  if (isNaN(id) || id < 1) {
    return reply.code(400).send()
  }

  if (!req.body) {
    return reply.code(400).send()
  }

  const KK = req.body
  KK.tgl_buat = null
  KK.tgl_terakhir_update = null

  const foundedKK = await db.kk.findByPk(id)

  if (!foundedKK) {
    return reply.code(400).send(respNotFound)
  }

  const updatedKK = await foundedKK.update(KK)

  if (!updatedKK) {
    return reply.code(500).send({ message: `Gagal memperbaharui keluargan dengan id ${id}` })
  }

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

  reply.send({ message: `Sukses memperbaharui kepala keluarga dengan id ${id}` })
}

async function remove(req, reply) {
  const id = +req.params.id

  if (isNaN(id) || id < 1) {
    return reply.code(400).send()
  }

  const KK = await db.kk.findByPk(id)
  if (!KK) {
    return reply.send(respNotFound(id))
  }
  await KK.destroy({ force: true })
  return reply.send({ message: `Sukses menghapus keluarga dengan id ${id}` })
}

module.exports = {
  create,
  get,
  getByID,
  remove,
  update,
}
