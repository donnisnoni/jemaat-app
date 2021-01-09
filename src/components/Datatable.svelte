<script>
  import { tick } from 'svelte'

  // export let columns = []
  // export let data = []

  /**  @type {HTMLTableElement} */
  let table

  export async function updateTableRows() {
    await tick()
    const rows = table && table.rows ? table.rows : []

    /** @type { HTMLTableRowElement }*/
    const head = table.tHead.rows[0]
    /** @type { Array<HTMLTableRowElement> }*/
    const bodyRows = [...rows]

    const headCells = head && head.cells ? Array.from(head.cells) : []

    headCells.forEach((headCell, index) => {
      headCell.style.width = headCell.innerText.length + 'ch'
      const data = bodyRows.slice(1).map((bodyRow) => bodyRow.cells[index].innerText)
      const longestString = data.reduce((a, b) => (a.length > b.length ? a : b), headCell.innerText)
      const longestLength =
        longestString.length > headCell.innerText.length ? longestString.length : headCell.innerText.length
      headCell.style.width = longestLength + 2 + 'ch'
    })
  }

  updateTableRows()
</script>

<style global>
  .table-wrapper {
    @apply flex;
    @apply flex-col;
    @apply flex-1;
    @apply overflow-auto;
  }

  .table-wrapper table {
    /* @apply p-0; */
    /* @apply m-0; */
    /* @apply border; */
    /* @apply border-collapse; */
    @apply table-fixed;
    @apply w-max;
  }

  .table-wrapper table th {
    @apply sticky;
    @apply top-0;
    @apply left-0;
    @apply p-1;
    @apply m-0;
    @apply border;
    /* box-sizing: border-box; */
    border: none;
    @apply bg-gray-100;
  }

  .table-wrapper thead tr,
  .table-wrapper tbody tr {
    cursor: pointer;
    transition: all 0.1s linear;
  }

  .table-wrapper tbody tr:hover {
    background-color: rgba(184, 184, 184, 0.205);
  }
</style>

<div class="table-wrapper">
  <table bind:this={table}>
    <slot />
  </table>
</div>
