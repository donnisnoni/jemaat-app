'use strict'
const fastify = require('../fastify')
const db = require('../models')
const bcrypt = require('bcrypt')

/**
 * Login controller
 * @type {import("fastify").RouteHandler}
 */
async function login(req, reply) {
  if (!req.body || !req.body.username || !req.body.sandi || !req.body.hasOwnProperty('super_admin')) {
    return reply.code(400).send()
  }

  const { username, sandi, super_admin } = req.body
  const foundedAdmin = await db.admin.findOne({
    where: { username, super_admin },
  })
  if (!foundedAdmin) {
    return reply.code(400).send({ message: 'Username atau sandi salah!' })
  }
  const hash = foundedAdmin.sandi
  if (!bcrypt.compareSync(sandi, hash)) {
    return reply.code(400).send({ message: 'Username atau sandi salah!' })
  }

  const payload = {
    username: foundedAdmin.username,
    nama: foundedAdmin.nama,
    super_admin: !!foundedAdmin.super_admin,
  }

  const token = fastify.jwt.sign(payload, {
    algorithm: 'HS256',
    expiresIn: +process.env.ACCESS_TOKEN_LIFE,
  })

  return reply.send({ message: 'Berhasil login!', token })
}

/**
 * Signup controller
 * @type {import("fastify").RouteHandler}
 */
async function signup(req, reply) {
  // Guard, only super admin have access to it
  if (!req.decodedJWT.super_admin) {
    return reply.code(404).send()
  }

  if (!req.body || !req.body.nama || !req.body.username || !req.body.sandi || !req.body.hasOwnProperty('super_admin')) {
    return reply.code(400).send()
  }

  const newAdmin = req.body
  const salt = bcrypt.genSaltSync(2)
  newAdmin.sandi = bcrypt.hashSync(newAdmin.sandi, salt)

  await db.admin.create(newAdmin)
  return reply.send({ message: 'Berhasil menambahkan admin baru!' })
}

module.exports = { login, signup }
