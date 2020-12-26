export function convertToUnit(str, unit = 'px') {
  if (isNaN(str)) {
    return str
  }
  return str - 0 + unit
}

export function exclude_internal_props__(props, internalProps) {
  let result = {}
  Object.keys(props).forEach((key) => {
    if (!internalProps.includes(key)) result[key] = props[key]
  })
  return result
}
