'use strict'
/** @type {import('fastify').FastifyInstance} */
const fastify = require('fastify')({
  logger: true,
  // ajv: {
  //   customOptions: { jsonPointers: true, allErrors: true },
  //   plugins: [require('ajv-errors')],
  // },
})

module.exports = fastify
