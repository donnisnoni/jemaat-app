const db = require('../models')
const { literal } = require('sequelize')
const { getOffset } = require('../utils')

const include = [
  [literal(`(SELECT COUNT(id_kk) FROM kepala_keluarga WHERE kepala_keluarga.id_rayon = rayon.id_rayon)`), 'jumlah_kk'],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.id_kk = kepala_keluarga.id_kk)`
    ),
    'jumlah_jemaat',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.id_kk = kepala_keluarga.id_kk AND anggota_kk.jk = 'L')`
    ),
    'jumlah_jemaat_l',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.id_kk = kepala_keluarga.id_kk AND anggota_kk.jk = 'P')`
    ),
    'jumlah_jemaat_p',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.id_kk = kepala_keluarga.id_kk AND anggota_kk.sudah_sidi = 1)`
    ),
    'jumlah_jemaat_sudah_sidi',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.id_kk = kepala_keluarga.id_kk AND anggota_kk.sudah_sidi = 0)`
    ),
    'jumlah_jemaat_belum_sidi',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.id_kk = kepala_keluarga.id_kk AND anggota_kk.jk = 'L' AND anggota_kk.sudah_sidi = 1)`
    ),
    'jumlah_jemaat_sudah_sidi_l',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.id_kk = kepala_keluarga.id_kk AND anggota_kk.jk = 'P' AND anggota_kk.sudah_sidi = 1)`
    ),
    'jumlah_jemaat_sudah_sidi_p',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.id_kk = kepala_keluarga.id_kk AND anggota_kk.jk = 'L' AND anggota_kk.sudah_sidi = 0)`
    ),
    'jumlah_jemaat_belum_sidi_l',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.id_kk = kepala_keluarga.id_kk AND anggota_kk.jk = 'P' AND anggota_kk.sudah_sidi = 0)`
    ),
    'jumlah_jemaat_belum_sidi_p',
  ],
]

const getRayonCount = async () => await db.rayon.count()

/**
 * Rayon get controller
 * @type {import("fastify").RouteHandler}
 */
async function get(req, reply) {
  const qExcludeKK = req.query.exclude_kk
  const qMetadata = req.query.metadata
  const qCount = req.query.count

  const qPage = req.query.page || 1
  const ipp = req.query.ipp || 10
  const offset = getOffset(qPage, ipp)

  if (qCount) {
    const rayonCount = await getRayonCount()
    return reply.send(rayonCount)
  }

  const rayons = await db.rayon.findAll({
    attributes: qMetadata ? { include } : null,
    include: {
      model: db.kk,
      as: 'kepala_keluarga',
      attributes: qExcludeKK ? [] : null,
    },
    order: [['id_rayon', 'ASC']],
    offset,
    limit: ipp,
    subQuery: false,
  })
  reply.send(rayons)
}

/**
 * Rayon get by id controller
 * @type {import("fastify").RouteHandler}
 */
async function getByID(req, reply) {
  const id = +req.params.id
  if (isNaN(id) || id < 1) {
    return reply.code(400).send({ message: 'id harus berupa angka' })
  }

  const foundedRayon = await db.rayon.findByPk(id, {
    attributes: { include },
    include: {
      model: db.kk,
      as: 'kepala_keluarga',
    },
  })
  if (!foundedRayon) {
    reply.code(400).send({ message: `Tidak dapat menemukan rayon dengan id ${id}` })
  }
  reply.send(foundedRayon)
}

/**
 * Create rayon controller
 * @type {import("fastify").RouteHandler}
 */
const create = async (req, reply) => {
  // TODO: Validation
  // console.log(req.body);
  if (req.validationError) {
    reply.send('ok').status(200)
  }
  db.rayon
    .create({ nama: req.body.nama })
    .then((rayon) => {
      rayon.save()
      reply.send(rayon)
    })
    .catch((err) => {
      console.error(err)
    })
}

/**
 * Delete rayon controller
 * @type {import("fastify").RouteHandler}
 */
const remove = async (req, reply) => {
  const id = +req.params.id

  if (isNaN(id) || id < 1) {
    return reply.code(400).send({ error: true, errors: [], message: 'Bad request' })
  }
  db.rayon
    .findByPk(id)
    .then((foundedRayon) => {
      if (foundedRayon) {
        foundedRayon
          .destroy()
          .then(() => reply.send({ error: false, message: 'Berhasil menghapus data' }))
          .catch((err) => console.error(err) && reply.code(500).send())
      } else {
        reply.code(500).send()
      }
    })
    .catch((err) => console.error(err) && reply.code(500).send())

  // console.log(typeof id);
  // console.log(id);
  // console.log(isNaN(id));

  // reply.send('ok');
}

/**
 * Update rayon controller
 * @type {import("fastify").RouteHandler}
 */
const update = async (req, reply) => {
  const id = +req.params.id

  if (isNaN(id) || id < 1) {
    return reply.code(400).send({ error: true, errors: [], message: 'Bad request' })
  }

  db.rayon
    .findByPk(id)
    .then((foundedRayon) => {
      foundedRayon.update({ nama: req.body.nama }).then((editedRayon) => {
        reply.send(editedRayon)
      })
    })
    .catch((err) => console.error(err) && reply.code(500).send())
}

module.exports = {
  create,
  get,
  getByID,
  update,
  remove,
}
