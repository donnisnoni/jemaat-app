const appConfig = require('../../app.config.json')

/**
 * Get rayon schema
 * @type {import("fastify").FastifySchema}
 */
const getRayonSchema = {
  response: {
    200: {
      type: 'array',
    },
  },
}

/**
 * Create rayon schema
 * @type {import("fastify").FastifySchema}
 */
const createRayonSchema = {
  body: {
    type: 'object',
    required: ['nama'],
    properties: {
      nama: {
        type: 'string',
        minLength: appConfig.validation.namaRayon.minlength,
        errorMessage: {
          type: 'Nama salah',
          min: 'Nama minimal berjumlah  karakter',
        },
      },
    },
  },
  response: {
    400: {
      type: 'object',
      properties: {
        errors: { type: 'array' },
      },
    },
  },
}

module.exports = {
  getRayonSchema,
  createRayonSchema,
}
