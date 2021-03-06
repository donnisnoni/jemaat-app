'use strict'
const db = require('../models')
const { literal, Op } = require('sequelize')
const { getOffset } = require('../utils')
const PDF = require('../utils/pdf')
const path = require('path')
const moment = require('moment')
const utils = require('../utils')
const include = require('./shared/rayonIncludes')

const respNotFound = (id) => ({ message: `Tidak dapat menemukan rayon dengan id ${id}` })

/**
 * Rayon get controller
 * @type {import("fastify").RouteHandler}
 */
async function get(req, reply) {
  const qExcludeKK = req.query.exclude_kk
  const qMetadata = req.query.metadata
  const qCount = req.query.count
  const qSearch = req.query.search

  const qPage = req.query.page || 1
  const ipp = req.query.ipp || 10
  const offset = getOffset(qPage, ipp)

  const isValidSearch = typeof qSearch == 'string' && qSearch.length

  if (qCount) {
    const rayonCount = await db.rayon.count()
    return reply.send(rayonCount)
  }

  const rayons = await db.rayon.findAndCountAll({
    attributes: qMetadata ? { include } : null,
    where: isValidSearch ? { nama: { [Op.like]: `%${qSearch}%` } } : null,
    include: {
      model: db.kk,
      as: 'kepala_keluarga',
      attributes: qExcludeKK ? [] : null,
    },
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
    reply.code(400).send(respNotFound(id))
  }
  reply.send(foundedRayon)
}

/**
 * Create rayon controller
 * @type {import("fastify").RouteHandler}
 */
async function create(req, reply) {
  // if (req.validationError) {
  //   reply.send('ok').status(200)
  // }

  const createRayon = await db.rayon.create({ nama: req.body.nama })
  const save = await createRayon.save()

  if (!save) {
    return reply.code(500).send({ message: `Gagal menambahkan rayon baru` })
  }

  reply.send({ message: 'Sukses menambahkan rayon baru' })
}

/**
 * Delete rayon controller
 * @type {import("fastify").RouteHandler}
 */
async function remove(req, reply) {
  const id = +req.params.id

  if (isNaN(id) || id < 1) {
    return reply.code(400).send()
  }

  const rayon = await db.rayon.findByPk(id)
  if (!rayon) {
    return reply.code(400).send(respNotFound(id))
  }

  await rayon.destroy()
  reply.send({ message: `Berhasil menghapus rayon dengan id ${id}` })
}

/**
 * Update rayon controller
 * @type {import("fastify").RouteHandler}
 */
async function update(req, reply) {
  const id = +req.params.id

  if (isNaN(id) || id < 1) {
    return reply.code(400).send()
  }

  const rayon = await db.rayon.findByPk(id)
  if (!rayon) {
    return reply.code(400).send(respNotFound(id))
  }

  const updated = await rayon.update({ nama: req.body.nama })
  if (!updated) {
    return reply.code(500).send({ message: `Gagal memperbaharui rayon dengan id ${id}` })
  }

  reply.send({ message: `Sukses memperbaharui rayon dengan id ${id}` })
}

/**
 * Get report rayon controller
 * @type {import("fastify").RouteHandler}
 */
async function getReport(req, reply) {
  const id = +req.params.id

  if (isNaN(id) || id < 1) {
    return reply.code(400).send()
  }

  const { keyword } = req.query
  const validKeywords = [
    'list_kk',
    'list_kaum_bapak',
    'list_kaum_ibu',
    'list_jemaat_lansia',
    'list_anak_par',
    'list_jemaat',
  ]

  debugger
  if (!keyword || !validKeywords.includes(keyword)) {
    return reply.code(400).send({ message: 'Parameter `keyword` tidak ada atau tidak valid' })
  }

  const foundedRayon = await db.rayon.findByPk(id)
  if (!foundedRayon) {
    reply.code(400).send(respNotFound(id))
  }

  const date = utils.getDate()
  const respType = 'application/pdf'

  // List Keluarga
  if (keyword === validKeywords[0]) {
    let kks = await db.kk.findAll({
      where: { id_rayon: id },
      raw: true,
    })

    if (!kks.length) {
      return reply.send(`Belum ada keluarga di rayon ${foundedRayon.nama}`)
    }

    const title = `Laporan Daftar Kepala Keluarga Rayon ${foundedRayon.nama} | ${date}`
    const pdf = await PDF.createPDF({
      template: path.resolve(__dirname, '..', 'templates', 'DaftarKeluargaRayon.ejs'),
      title,
      data: { kks, nama: foundedRayon.nama, tanggalCetak: date },
      landscape: true,
    })

    reply.type(respType).headers(utils.generatePdfContentDispositionHeader(title)).send(pdf)
  }

  // List Kaum Bapak
  else if (keyword === validKeywords[1]) {
    let rayon = await db.rayon.findByPk(id, {
      attributes: { include: [include[12]] },
      include: {
        model: db.kk,
        as: 'kepala_keluarga',
        include: {
          model: db.anggota_kk,
          attributes: {
            include: [[literal('TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE())'), 'umur']],
          },
          as: 'anggota_kk',
          where: {
            [Op.and]: { sudah_nikah: 1, jk: 'L' },
          },
        },
      },
    })

    if (!rayon) {
      return reply.send(`Belum ada kaum bapak di rayon ${foundedRayon.nama}`)
    }

    rayon = JSON.parse(JSON.stringify(rayon))

    const title = `Laporan Daftar Kaum Bapak Rayon ${rayon.nama} | ${date}`
    const pdf = await PDF.createPDF({
      template: path.resolve(__dirname, '..', 'templates', 'DaftarKaumBapak.ejs'),
      title,
      data: { rayon, tanggalCetak: date, moment },
      format: 'A3',
      landscape: true,
    })

    reply.type(respType).headers(generatePdfContentDispositionHeader(title)).send(pdf)
  }

  // List Kaum Ibu
  else if (keyword === validKeywords[2]) {
    let rayon = await db.rayon.findByPk(id, {
      attributes: { include: [include[13]] },
      include: {
        model: db.kk,
        as: 'kepala_keluarga',
        include: {
          model: db.anggota_kk,
          attributes: {
            include: [[literal('TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE())'), 'umur']],
          },
          as: 'anggota_kk',
          where: {
            [Op.and]: { sudah_nikah: 1, jk: 'P' },
          },
        },
      },
    })

    if (!rayon) {
      return reply.send(`Belum ada kaum ibu di rayon ${foundedRayon.nama}`)
    }

    rayon = JSON.parse(JSON.stringify(rayon))

    const title = `Laporan Daftar Kaum Ibu Rayon ${rayon.nama} | ${date}`
    const pdf = await PDF.createPDF({
      template: path.resolve(__dirname, '..', 'templates', 'DaftarKaumIbu.ejs'),
      title,
      data: { rayon, tanggalCetak: date, moment },
      format: 'A3',
      landscape: true,
    })

    reply.type(respType).headers(generatePdfContentDispositionHeader(title)).send(pdf)
  }

  // List Jemaat Lansia
  else if (keyword == validKeywords[3]) {
    console.log(include.length)
    let rayon = await db.rayon.findByPk(id, {
      attributes: { include: [include[11]] },
      include: {
        model: db.kk,
        as: 'kepala_keluarga',
        include: {
          model: db.anggota_kk,
          attributes: {
            include: [[literal('TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE())'), 'umur']],
          },
          as: 'anggota_kk',
        },
      },
      having: {
        'kepala_keluarga.anggota_kk.umur': { [Op.gte]: 65 },
      },
    })

    if (!rayon) {
      return reply.send(`Belum ada jemaat lansia di rayon ${foundedRayon.nama}`)
    }

    rayon = JSON.parse(JSON.stringify(rayon))

    const title = `Laporan Lansia Rayon ${rayon.nama} | ${date}`
    const pdf = await PDF.createPDF({
      template: path.resolve(__dirname, '..', 'templates', 'DaftarJemaatLansia.ejs'),
      title,
      data: { rayon, tanggalCetak: date, moment },
      format: 'A3',
      landscape: true,
    })

    reply.type(respType).headers(generatePdfContentDispositionHeader(title)).send(pdf)
  }

  // List Anak PAR
  else if (keyword == validKeywords[4]) {
    let rayon = await db.rayon.findByPk(id, {
      attributes: {
        include: [include[10]],
      },
      include: {
        model: db.kk,
        as: 'kepala_keluarga',
        include: {
          model: db.anggota_kk,
          attributes: {
            include: [[literal('TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE())'), 'umur']],
          },
          as: 'anggota_kk',
        },
      },
      having: {
        'kepala_keluarga.anggota_kk.umur': { [Op.lte]: 15 },
      },
    })

    if (!rayon) {
      return reply.send(`Belum anak PAR di rayon ${foundedRayon.nama}`)
    }

    rayon = JSON.parse(JSON.stringify(rayon))

    const title = `Laporan Daftar Anak PAR Rayon ${rayon.nama} | ${date}`
    const pdf = await PDF.createPDF({
      template: path.resolve(__dirname, '..', 'templates', 'DaftarAnakPAR.ejs'),
      title,
      data: { rayon, tanggalCetak: date, moment },
      format: 'A3',
      landscape: true,
    })

    reply.type(respType).headers(generatePdfContentDispositionHeader(title)).send(pdf)
  }

  // List Jemaat
  else if (keyword == validKeywords[5]) {
    let rayon = await db.rayon.findByPk(id, {
      attributes: { include },
      include: {
        model: db.kk,
        as: 'kepala_keluarga',
        include: {
          model: db.anggota_kk,
          attributes: {
            include: [[literal('TIMESTAMPDIFF(YEAR, tanggal_lahir, CURDATE())'), 'umur']],
          },
          as: 'anggota_kk',
        },
      },
    })

    if (!rayon.kepala_keluarga.length) {
      return reply.send(`Belum anak jemaat di rayon ${foundedRayon.nama}`)
    }

    rayon = JSON.parse(JSON.stringify(rayon))

    const title = `Laporan Daftar Jemaat Rayon ${rayon.nama} | ${date}`
    const pdf = await PDF.createPDF({
      template: path.resolve(__dirname, '..', 'templates', 'DaftarJemaat.ejs'),
      title,
      data: { rayon, tanggalCetak: date, moment },
      format: 'A3',
      landscape: true,
    })

    reply.type(respType).headers(generatePdfContentDispositionHeader(title)).send(pdf)
  }
}

module.exports = {
  create,
  get,
  getByID,
  getReport,
  remove,
  update,
}
