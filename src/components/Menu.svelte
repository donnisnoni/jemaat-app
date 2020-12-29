<script>
  import { onDestroy, onMount, tick } from 'svelte'

  export let //
    x = 0,
    y = 0,
    visible = false

  /** @type {Element} */
  let root
  /** @type {Element} */
  let lastActiveElement
  /** @type {Element} */
  let scrollingParrentElement
  let lastScrollingParrentElementAxis = { x: 0, y: 0 }

  const handleEscKey = (event) => {
    if (!visible) return
    if (event.code == 'Escape') close()
  }

  onMount(() => {
    /** @param {KeyboardEvent} event */
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  })

  /** @param {Event} event */
  const handleScrollingParentElement = (/* event */) => {
    const { x, y } = lastScrollingParrentElementAxis
    scrollingParrentElement.scrollTo(x, y)
  }

  /**
   * Open the menu
   * @param {MouseEvent} event
   */
  export async function open(event) {
    visible && close()

    event && event.target && searchScrollableElement(event.target)

    x = event.clientX
    y = event.clientY

    visible = true

    await tick()
    const rect = root.getBoundingClientRect()

    if (x + rect.width >= window.innerWidth) {
      x = x - rect.width - 10
    } else {
      x = x + 10
    }

    if (y + rect.height >= window.innerHeight) {
      y = y - rect.height - 10
    } else {
      y = y - rect.height / 2 + 10
    }

    await tick()
    lastActiveElement = document.activeElement
    root.focus()
  }

  /**
   * Search if element is scrollable and stop.
   * If not, will look to it's parent element.
   * It will stop searching after found `body` element
   * @param {Element} el
   */
  function searchScrollableElement(el) {
    if (el === document.body) return
    if (el.scrollHeight > el.clientHeight) {
      scrollingParrentElement = el
      lastScrollingParrentElementAxis.x = scrollingParrentElement.scrollLeft
      lastScrollingParrentElementAxis.y = scrollingParrentElement.scrollTop
      el.addEventListener('scroll', handleScrollingParentElement)
      return
    }
    searchScrollableElement(el.parentElement)
  }

  export async function close() {
    visible = false
    removeScrollingEvent()
    if (lastActiveElement) {
      lastActiveElement.focus()
      lastActiveElement = null
    }
  }

  function removeScrollingEvent() {
    scrollingParrentElement && scrollingParrentElement.removeEventListener('scroll', handleScrollingParentElement)
  }

  onDestroy(() => {
    document.removeEventListener('keydown', handleEscKey)
    removeScrollingEvent()
  })
</script>

<div
  on:blur={close}
  bind:this={root}
  tabindex="0"
  class="fixed bg-white card"
  style="min-height:20px;min-width:20px;top:{y}px;left:{x}px;outline:none"
  class:hidden={!visible}
  {...$$props}>
  <slot />
</div>
