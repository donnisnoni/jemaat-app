'use strict'
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
    console.error(error)
    return reply.code(500).send()
  }
  // console.log(decodedJWT)
  const { username, super_admin } = decodedJWT
  const foundedAdmin = await db.admin.findOne({
    where: { username, super_admin },
  })
  if (!foundedAdmin) {
    reply.code(401).send({ message: 'Autentikasi gagal, silahkan login lagi' })
  }
  request.decodedJWT = decodedJWT
}

module.exports = authenticate
