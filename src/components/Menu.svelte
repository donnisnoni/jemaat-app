<script>
  import ANIMATIONS from '../shared/animation.js'
  import { onMount, tick } from 'svelte'

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

  onMount(() => {
    /** @param {KeyboardEvent} event */
    const handleEscKey = (event) => {
      if (event.code === 'Escape') close()
    }
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  })

  export async function open(x_, y_) {
    visible && closeAnimation && closeAnimation.cancel() && close()

    x = x_
    y = y_

    visible = true

    await tick()
    const rect = _this.getBoundingClientRect()

    if (x + rect.width > window.innerWidth) {
      x = x - rect.width - 10
    } else {
      x = x + 10
    }

    if (y + rect.height > window.innerHeight) {
      y = y - rect.height - 10
    } else {
      y = y + 10
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

  export async function close() {
    closeAnimation = _this.animate(ANIMATIONS.SLIDE_TOP.KEYFRAMES, {
      easing: ANIMATIONS.SLIDE_TOP.EASING,
      duration: 100,
      fill: 'both',
      direction: 'reverse',
    })
    closeAnimation.onfinish = () => {
      visible = false
      lastActiveElement && lastActiveElement.focus()
      lastActiveElement = null
    }
  }
</script>

<div
  on:blur={close}
  bind:this={_this}
  tabindex="0"
  class="fixed bg-white card"
  style="min-height:20px; min-width:20px; top:{y}px; left:{x}px; z-index:8; outline:none"
  class:hidden={!visible}
  {...$$props}>
  <slot />
</div>
