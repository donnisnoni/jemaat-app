<script>
  import { createEventDispatcher } from 'svelte'
  const emit = createEventDispatcher()

  export let pageCount = 5
  export let page = 1

  function update(_page) {
    if (_page != page) {
      page = _page
      emit('change')
    }
  }

  const decrement = () => {
    if (page > 1) {
      page--
      emit('change')
    }
  }
  const increment = () => {
    if (page < pageCount) {
      page++
      emit('change')
    }
  }

  $: {
    if (page > pageCount) {
      page = pageCount
      emit('change')
    }
  }
</script>

<div class="pagination--item" class:disabled={page == 1} on:click={decrement}>PREV</div>

{#each new Array(pageCount) as undefined, index}
  <div class="pagination--item" class:pagination--page-active={page == index + 1} on:click={() => update(index + 1)}>
    {index + 1}
  </div>
{/each}

<div class="pagination--item" class:disabled={page == pageCount} on:click={increment}>NEXT</div>
