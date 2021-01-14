const db = require('../models')
const { fn, col, where, literal } = require('sequelize')

const include = [
  [literal(`(SELECT COUNT(id_kk) FROM kepala_keluarga WHERE kepala_keluarga.id_rayon = rayon.id_rayon)`), 'jumlah_kk'],
  [
    literal(`(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon)`),
    'jumlah_jemaat',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.jk = 'L')`
    ),
    'jumlah_jemaat_l',
  ],
  [
    literal(
      `(SELECT COUNT(id_anggota_kk) FROM anggota_kk WHERE kepala_keluarga.id_rayon = rayon.id_rayon AND anggota_kk.jk = 'P')`
    ),
    'jumlah_jemaat_p',
  ],
]

/**
 * Rayon get controller
 * @type {import("fastify").RouteHandler}
 */
const get = (req, reply) => {
  db.rayon
    .findAll({
      attributes: {
        include,
      },
      include: {
        model: db.kk,
        as: 'kepala_keluarga',
      },
      group: 'rayon.id_rayon',
      // order: [['tgl_buat', 'DESC']],
    })
    .then((dataRayon) => {
      // setTimeout(() => {
      reply.send(dataRayon)
      // }, 5000);
    })
    .catch((err) => {
      console.error(err)
      reply.send(err)
    })
}

/**
 * Rayon get by id controller
 * @type {import("fastify").RouteHandler}
 */
const getByID = async (req, reply) => {
  const id = +req.params.id
  if (isNaN(id) || id < 1) {
    return reply.code(400).send({ error: true, errors: [], message: 'Bad request' })
  }

  db.rayon
    .findByPk(id, {
      attributes: {
        include,
      },
      include: {
        model: db.kk,
        as: 'kepala_keluarga',
      },
      group: 'rayon.id_rayon',
    })
    .then((foundedRayon) => {
      reply.send(foundedRayon)
    })
    .catch((err) => console.error(err) && reply.code(500).send())
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
