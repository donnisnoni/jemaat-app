<script>
  import { current_component } from 'svelte/internal'
  import { forwardEventsBuilder } from '/@actions/forwardEvents.js'

  export let icon = '',
    primary = false,
    iconOnly = false
  // loading = false;

  const forwardEvents = forwardEventsBuilder(current_component)
</script>

<button
  class="btn"
  class:btn-primary={primary}
  class:icon-only={icon.length && iconOnly}
  use:forwardEvents
  {...$$props}>
  <!-- {#if loading}
    <span class="btn__loader">
      <ProgressCircular indeterminate size="23" width="2" />
    </span>
  {:else} -->
  {#if icon.length}<i class="mdi mdi-{icon}" />{/if}
  <slot />
  <!-- {/if} -->
</button>
