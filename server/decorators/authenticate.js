const db = require('../models')

/**
 * Authentication Decorator
 * @type {import("fastify").RouteHandler}
 */
async function authenticate(request, reply) {
  let decodedJWT
  try {
    decodedJWT = await request.jwtVerify()
  } catch (err) {
    return reply.send(err)
  }
  // console.log(decodedJWT)
  const { username, super_admin } = decodedJWT
  const where = { username }
  if (super_admin) where.super_admin = 1
  const foundedAdmin = await db.admin.findOne({ where })
  if (!foundedAdmin) {
    reply.code(401).send({ message: 'Autentikasi gagal, silahkan login lagi' })
  }
}

module.exports = authenticate
