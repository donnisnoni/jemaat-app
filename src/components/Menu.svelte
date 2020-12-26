<script>
  import ANIMATIONS from '../shared/animation.js'
  import { tick } from 'svelte'

  export let //
    x = 0,
    y = 0,
    visible = false

  let //
    _this,
    lastActiveElement,
    closeAnimation

  export async function open(x_, y_) {
    visible && closeAnimation && closeAnimation.cancel() && close()

    x = x_
    y = y_

    visible = true
    _this.animate(ANIMATIONS.SLIDE_TOP.KEYFRAMES, {
      easing: ANIMATIONS.SLIDE_TOP.EASING,
      duration: 200,
      fill: 'forwards',
    })

    await tick()
    lastActiveElement = document.activeElement
    _this.focus()
  }

  export async function close() {
    closeAnimation = _this.animate(ANIMATIONS.SLIDE_TOP.KEYFRAMES, {
      easing: ANIMATIONS.SLIDE_TOP.EASING,
      duration: 200,
      fill: 'both',
      direction: 'reverse',
    })
    closeAnimation.onfinish = () => (visible = false)
    await tick()
    lastActiveElement && lastActiveElement.focus()
    lastActiveElement = null
  }
</script>

<div
  bind:this={_this}
  on:blur={close}
  tabindex="0"
  class="fixed bg-white card{$$props.class || ''}"
  style="min-height:20px; min-width:20px; top:{y}px; left:{x}px; z-index:8; outline:none"
  class:hidden={!visible}>
  <slot />
</div>
