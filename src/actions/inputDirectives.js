/** @param {HTMLElement} node */
export function numberPhone(node) {
  const handler = (event) => {
    const selectionStart = event.target.selectionStart
    const selectionEnd = event.target.selectionEnd
    const newValue = event.target.value.replace(/\D/, '')
    const isValid = event.target.value == newValue
    event.target.value = newValue
    event.target.setSelectionRange(selectionStart, isValid ? selectionEnd : selectionEnd - 1)
  }
  node.addEventListener('input', handler)
  return {
    onDestroy() {
      node.removeEventListener('input', handler)
    },
  }
}

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
    const selectionStart = event.target.selectionStart
    const selectionEnd = event.target.selectionEnd

    words.forEach((word) => {
      let letters = word.split('')
      letters = letters.map((letter, letterIdx) => (letterIdx == 0 ? letter.toUpperCase() : letter.toLowerCase()))
      const newWord = letters.join('')
      newValueArray.push(newWord)
    })
    event.target.value = newValueArray.join(' ')
    event.target.setSelectionRange(selectionStart, selectionEnd)
  }

  node.addEventListener('input', handleInput)

  return {
    onDestroy() {
      node.removeEventListener('input', handleInput)
    },
  }
}
