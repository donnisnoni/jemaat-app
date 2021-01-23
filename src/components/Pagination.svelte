<script>
  export let pageCount = 5
  export let page = 1
</script>

<div class="pagination--item" class:disabled={page == 1} on:click={() => page > 1 && page--}>PREV</div>

{#each new Array(pageCount) as undefined, index}
  <div class="pagination--item" class:pagination--page-active={page == index + 1} on:click={() => (page = index + 1)}>
    {index + 1}
  </div>
{/each}

<div class="pagination--item" class:disabled={page == pageCount} on:click={() => page <= pageCount && page++}>NEXT</div>
