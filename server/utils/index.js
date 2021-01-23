function hasDuplicates(arr) {
  return arr.some(function (item) {
    return arr.indexOf(item) !== arr.lastIndexOf(item)
  })
}

function getOffset(page, ipp) {
  return page * ipp - ipp
}

module.exports = {
  hasDuplicates,
  getOffset,
}
