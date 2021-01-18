const controllers = require('../controllers')
const fastify = require('../fastify')
const schemas = require('../schemas')

/**
 * Routes
 * @type {Array<import('fastify').RouteOptions>}
 */
const routes = [
  {
    method: 'POST',
    url: '/api/login',
    handler: controllers.Auth.login,
  },
  {
    method: 'POST',
    url: '/api/signup',
    handler: controllers.Auth.signup,
  },
  /* ------------------------------ RAYON ROUTES ------------------------------ */
  {
    method: 'GET',
    url: '/api/data/rayon',
    // schema: schemas.rayon.getRayonSchema,
    preValidation: [fastify.authenticate],
    handler: controllers.Rayon.get,
  },
  {
    method: 'GET',
    url: '/api/data/rayon/:id',
    // schema: schemas.rayon.getRayonSchema,
    preValidation: [fastify.authenticate],
    handler: controllers.Rayon.getByID,
  },
  {
    method: 'POST',
    url: '/api/data/rayon',
    schema: schemas.rayon.createRayonSchema,
    attachValidation: true,
    preValidation: [fastify.authenticate],
    handler: controllers.Rayon.create,
  },
  {
    method: 'PUT',
    url: '/api/data/rayon/:id',
    // schema: schemas.rayon.createRayonSchema,
    // attachValidation: true,
    preValidation: [fastify.authenticate],
    handler: controllers.Rayon.update,
  },
  {
    method: 'DELETE',
    url: '/api/data/rayon/:id',
    schema: null,
    attachValidation: true,
    preValidation: [fastify.authenticate],
    handler: controllers.Rayon.remove,
  },

  /* ------------------------- KEPALA KELUARGA ROUTES ------------------------- */
  {
    method: 'GET',
    url: '/api/data/kk',
    preValidation: [fastify.authenticate],
    handler: controllers.KK.get,
  },
  {
    method: 'GET',
    url: '/api/data/kk/:id',
    preValidation: [fastify.authenticate],
    handler: controllers.KK.getByID,
  },
  {
    method: 'POST',
    url: '/api/data/kk',
    preValidation: [fastify.authenticate],
    handler: controllers.KK.create,
  },
  {
    method: 'PUT',
    url: '/api/data/kk/:id',
    preValidation: [fastify.authenticate],
    handler: controllers.KK.update,
  },
  {
    method: 'DELETE',
    url: '/api/data/kk/:id',
    preValidation: [fastify.authenticate],
    handler: controllers.KK.remove,
  },

  /* ---------------------------- ANGGOTA KK ROUTES --------------------------- */
  {
    method: 'GET',
    url: '/api/data/anggota_kk',
    preValidation: [fastify.authenticate],
    handler: controllers.AnggotaKK.get,
  },
]

module.exports = routes
