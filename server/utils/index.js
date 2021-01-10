function hasDuplicates(arr) {
  return arr.some(function (item) {
    return arr.indexOf(item) !== arr.lastIndexOf(item)
  })
}

module.exports = {
  hasDuplicates,
}
