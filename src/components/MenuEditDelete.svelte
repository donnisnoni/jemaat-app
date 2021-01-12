<script>
  import { createEventDispatcher } from 'svelte'
  import Menu from '/@components/Menu.svelte'

  const emit = createEventDispatcher()

  /** @type {Menu}*/
  let menu

  export function open(event) {
    menu.open(event)
  }

  function emitEdit() {
    emit('edit-clicked')
  }

  function emitDelete() {
    emit('delete-clicked')
  }
</script>

<Menu bind:this={menu}>
  <ul class="p-1">
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a class="inline-flex p-2 cursor-pointer" on:click={emitEdit}> <i class="ml-auto mdi mdi-pencil" />Ubah </a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a class="inline-flex p-2 cursor-pointer" on:click={emitDelete}> <i class="ml-auto mdi mdi-delete" />Hapus </a>
    </li>
  </ul>
</Menu>
