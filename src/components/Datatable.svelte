<script>
  import { tick, onMount } from 'svelte'

  // export let columns = []
  // export let data = []

  export let hidden = false

  onMount(updateTableRows)

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
</script>

<div class="table-wrapper" class:hidden-force={hidden}>
  <table bind:this={table}>
    <slot />
  </table>
</div>
