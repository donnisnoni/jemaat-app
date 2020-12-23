const controllers = require('../controllers');
const schemas = require('../schemas');

/**
 * Routes
 * @type {Array<import('fastify').RouteOptions>}
 */
const routes = [
  /* ------------------------------ RAYON ROUTES ------------------------------ */
  {
    method: 'GET',
    url: '/api/data/rayon',
    // schema: schemas.rayon.getRayonSchema,
    handler: controllers.Rayon.get,
  },
  {
    method: 'POST',
    url: '/api/data/rayon',
    schema: schemas.rayon.createRayonSchema,
    attachValidation: true,
    handler: controllers.Rayon.create,
  },
  {
    method: 'DELETE',
    url: '/api/data/rayon/:id',
    schema: null,
    attachValidation: true,
    handler: controllers.Rayon.remove,
  },
];

module.exports = routes;
