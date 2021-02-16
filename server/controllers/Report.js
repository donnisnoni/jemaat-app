'use strict'
const db = require('../models')
const path = require('path')
const PDF = require('../utils/pdf')
const rayonIncludes = require('./shared/rayonIncludes')
const utils = require('../utils')
const { literal } = require('sequelize')

/**
 * Anggota KK get controller
 * @type {import("fastify").RouteHandler}
 */
async function get(req, reply) {
  const qReportType = req.params.report_type
  const validReporTypeValues = ['kepala_keluarga']

  if (!qReportType || !validReporTypeValues.includes(qReportType)) {
    return reply.code(400).send({ message: 'Parameter `report_type` tidak ada atau tidak valid' })
  }

  const date = utils.getDate()
  const respType = 'application/pdf'

  if (qReportType === validReporTypeValues[0]) {
    const rayons = await db.rayon.findAll({
      attributes: { include: [rayonIncludes[0]] },
      include: {
        model: db.kk,
        as: 'kepala_keluarga',
        attributes: [],
        subQuery: false,
      },
      raw: true,
      group: literal('id_rayon'),
    })

    if (!rayons.length) {
      return reply.code(400).send(`Belum ada rayon`)
    }

    const title = `Rekapitulasi Keluarga per Rayon | ${date}`
    const pdf = await PDF.createPDF({
      template: path.resolve(__dirname, '..', 'templates', 'RekapitulasiKeluargaPerRayon.ejs'),
      title,
      data: { rayons, tanggalCetak: date },
      landscape: true,
    })

    reply.type(respType).headers(utils.generatePdfContentDispositionHeader(title)).send(pdf)
  }
}

module.exports = {
  get,
}
