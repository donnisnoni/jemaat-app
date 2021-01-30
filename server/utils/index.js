'use strict'

const CONSTS = require('../shared/consts')
const moment = require('moment')

function hasDuplicates(arr) {
  return arr.some(function (item) {
    return arr.indexOf(item) !== arr.lastIndexOf(item)
  })
}

function getOffset(page, ipp) {
  return page * ipp - ipp
}

const getDate = () => moment().format(CONSTS.MOMENT_FORMAT)

module.exports = {
  hasDuplicates,
  getOffset,
  getDate,
}
