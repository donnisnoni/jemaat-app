<script>
  import ANIMATIONS from '../shared/animation.js'
  import { onDestroy, onMount, tick } from 'svelte'

  export let //
    x = 0,
    y = 0,
    visible = false

  /** @type {Element} */
  let _this
  /** @type {Element} */
  let lastActiveElement
  /** @type {Animation}*/
  let closeAnimation
  /** @type {Element} */
  let scrollingParrentElement
  let lastScrollingParrentElementAxis = { x: 0, y: 0 }

  const handleEscKey = (event) => {
    if (event.code === 'Escape' && visible) close()
  }

  onMount(() => {
    /** @param {KeyboardEvent} event */
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  })

  /** @param {Event} event */
  const handleScrollingParentElement = (event) => {
    const { x, y } = lastScrollingParrentElementAxis
    scrollingParrentElement.scrollTo(x, y)
  }

  /**
   * Open the menu
   * @param {MouseEvent} event
   */
  export async function open(event) {
    visible && closeAnimation && closeAnimation.cancel() && close()

    if (event && event.target) {
      searchScrollableElement(event.target)
    }

    x = event.clientX
    y = event.clientY

    visible = true

    await tick()
    const rect = _this.getBoundingClientRect()

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

    const animation = _this.animate(ANIMATIONS.SLIDE_TOP.KEYFRAMES, {
      easing: ANIMATIONS.SLIDE_TOP.EASING,
      duration: 100,
      fill: 'forwards',
    })

    animation.onfinish = () => {
      lastActiveElement = document.activeElement
      _this.focus()
    }
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
    closeAnimation = _this.animate(ANIMATIONS.SLIDE_TOP.KEYFRAMES, {
      easing: ANIMATIONS.SLIDE_TOP.EASING,
      duration: 100,
      fill: 'both',
      direction: 'reverse',
    })
    scrollingParrentElement.removeEventListener('scroll', handleScrollingParentElement)
    closeAnimation.onfinish = () => {
      visible = false
      document.removeEventListener('keydown', handleEscKey)
      lastActiveElement && lastActiveElement.focus()
      lastActiveElement = null
    }
  }

  onDestroy(() => {
    scrollingParrentElement && scrollingParrentElement.removeEventListener('scroll', handleScrollingParentElement)
  })
</script>

<div
  on:blur={close}
  bind:this={_this}
  tabindex="0"
  class="fixed bg-white card"
  style="min-height:20px;min-width:20px;top:{y}px;left:{x}px;outline:none"
  class:hidden={!visible}
  {...$$props}>
  <slot />
</div>
