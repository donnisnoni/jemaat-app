<script>
  export let pageCount = 5
  export let page = 1
</script>

{#each new Array(pageCount) as undefined, index}
  <div
    class="px-2 py-1 m-1 bg-gray-100 border rounded-sm cursor-pointer"
    class:pagination-active-page={page == index + 1}
    on:click={() => (page = index + 1)}>
    {index + 1}
  </div>
{/each}
