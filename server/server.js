#!/usr/bin/env node
'use strict'

require('dotenv').config()
const fastify = require('./fastify')

fastify.register(require('fastify-jwt'), {
  secret: process.env.ACCESS_TOKEN_SECRET,
})

fastify.decorate('authenticate', require('./decorators/authenticate'))

// Register Routes
const routes = require('./routes')
routes.forEach((route) => fastify.route(route))

// Run the server!
fastify.listen(8080, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})

module.exports = fastify
