<script>
  import { onMount, tick, createEventDispatcher } from 'svelte'
  import ANIMATIONS from '../shared/animation.js'

  const emit = createEventDispatcher()
  const KEYS = { TAB: 9, ESC: 27 }

  // API for cancel the dialog for closing
  export let cancel = () => false

  let dialogEl,
    overlayEl,
    focusableEls,
    firstFocusableEl,
    lastFocusableEl,
    focusedElBeforeOpen,
    visible = false

  onMount(() => {
    const _focusableEls = dialogEl.querySelectorAll(
      "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex='0']"
    )
    focusableEls = Array.from(_focusableEls)
    firstFocusableEl = focusableEls[0]
    lastFocusableEl = focusableEls[focusableEls.length - 1]
  })

  export function open() {
    focusedElBeforeOpen = document.activeElement
    document.body.classList.add('overflow-y-hidden')
    dialogEl.addEventListener('keydown', handleDialogKeyDown)
    document.addEventListener('keydown', handleDocumentKeyDown, { once: true })
    visible = true
    const animation = dialogEl.animate(ANIMATIONS.FADE_IN.KEYFRAMES, {
      duration: 150,
      easing: 'linear',
    })
    animation.onfinish = async () => {
      await tick()
      firstFocusableEl && firstFocusableEl.focus()
    }
  }

  export function close(force = false) {
    if (!force && typeof cancel == 'function' && cancel()) {
      dialogEl.animate([{ transform: 'scale(1.05)' }], {
        duration: 150,
        easing: 'ease-out',
      })
      return
    }
    const animation = dialogEl.animate(ANIMATIONS.FADE_IN.KEYFRAMES, {
      duration: 150,
      easing: 'linear',
      direction: 'reverse',
    })
    animation.onfinish = async () => {
      visible = false
      if (focusedElBeforeOpen) {
        await tick()
        document.body.classList.remove('overflow-y-hidden')
        focusedElBeforeOpen.focus()
      }
    }
    emit('closed')
  }

  function handleDocumentKeyDown(e) {
    if (e.keyCode == KEYS.ESC) close()
  }

  function handleDialogKeyDown(e) {
    function handleBackwardTab() {
      if (document.activeElement === firstFocusableEl) {
        e.preventDefault()
        lastFocusableEl.focus()
      }
    }

    function handleForwardTab() {
      if (document.activeElement === lastFocusableEl) {
        e.preventDefault()
        firstFocusableEl && firstFocusableEl.focus()
      }
    }

    switch (e.keyCode) {
      case KEYS.TAB:
        if (focusableEls.length === 1) {
          e.preventDefault()
          break
        }
        if (e.shiftKey) {
          handleBackwardTab()
        } else {
          handleForwardTab()
        }
        break
      case KEYS.ESC:
        close()
        break
      default:
        break
    }
  }

  function handleOverlayClick(e) {
    if (e.target !== overlayEl) return
    close()
  }
</script>

<div
  bind:this={overlayEl}
  on:click={handleOverlayClick}
  class:hidden={!visible}
  class="flex justify-center p-2 align-middle lg:p-6 dialog-overlay justify-items-center"
  aria-hidden={!visible}>
  <!--  -->

  <div
    bind:this={dialogEl}
    class="dialog bg-white rounded-sm flex flex-col z-10 {$$props.class || ''}"
    role="dialog"
    aria-hidden={!visible}>
    <slot />
  </div>
  <!--  -->
</div>
