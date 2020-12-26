/** @param {HTMLInputElement} node */
export function autoSelectOnFocus(node) {
  const handleFocus = (event) => {
    const el = event.target
    typeof el.select == 'function' && el.select()
  }
  node.addEventListener('focus', handleFocus)
  return {
    onDestroy() {
      node.removeEventListener(handleFocus)
    },
  }
}

/** @param {HTMLInputElement} node */
export function blurOnEsc(node) {
  const handleKey = (event) => {
    const el = event.target
    event.key == 'Escape' && typeof el.blur == 'function' && el.blur()
  }
  node.addEventListener('keydown', handleKey)
  return {
    onDestroy() {
      node.removeEventListener(handleKey)
    },
  }
}

/** @param {HTMLInputElement} node */
export function autoCapitalizeWords(node) {
  const handleInput = (event) => {
    /** @type {string} */
    const value = event.target.value.replace(/ +(?= )/g, '')

    if (!value.length) return
    const words = value.split(/\s/)
    const newValueArray = []

    words.forEach((word) => {
      let letters = word.split('')
      letters = letters.map((letter, letterIdx) => (letterIdx == 0 ? letter.toUpperCase() : letter.toLowerCase()))
      const newWord = letters.join('')
      newValueArray.push(newWord)
    })
    node.value = newValueArray.join(' ')
  }

  node.addEventListener('input', handleInput)

  return {
    onDestroy() {
      node.removeEventListener('input', handleInput)
    },
  }
}
