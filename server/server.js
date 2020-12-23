#!/usr/bin/env node
/** @type {import('fastify').FastifyInstance} */
const fastify = require('fastify')({
  logger: true,
  // ajv: {
  //   customOptions: { jsonPointers: true, allErrors: true },
  //   plugins: [require('ajv-errors')],
  // },
});

// Register Routes
const routes = require('./routes');
routes.forEach((route, idx) => {
  fastify.route(route);
});

// Run the server!
fastify.listen(8080, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});

module.exports = fastify;
