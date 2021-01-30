<script>
  import { current_component } from 'svelte/internal'
  import { forwardEventsBuilder } from '/@actions/forwardEvents.js'

  export let icon = '',
    primary = false,
    iconOnly = false,
    loading = false

  const forwardEvents = forwardEventsBuilder(current_component)
</script>

<button
  class="btn"
  class:btn-state-loading={loading}
  class:btn-primary={primary}
  class:icon-only={icon.length && iconOnly}
  use:forwardEvents
  {...$$props}>
  {#if loading}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="loading-icon"
      width="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke-width="10"
        r="35"
        stroke-dasharray="164.93361431346415 56.97787143782138">
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1" />
      </circle>
    </svg>
  {:else}
    {#if icon.length}<i class="mdi mdi-{icon}" />{/if}
    <slot />
  {/if}
</button>
