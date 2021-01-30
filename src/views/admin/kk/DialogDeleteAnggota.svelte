<script>
  import Button from '/@components/Button.svelte'
  import Dialog from '/@components/Dialog.svelte'
  import { createEventDispatcher } from 'svelte'

  const emit = createEventDispatcher()

  /** @type {Dialog} */
  let dialog
  let nama = ''

  export function open(_nama) {
    nama = _nama
    dialog.open()
  }

  const emitYes = () => {
    emit('yes')
    dialog.close(true)
  }
</script>

<Dialog bind:this={dialog} class="simple-dialog" on:closed>
  <h3 class="px-3 py-2 text-lg">Hapus anggota keluarga?</h3>
  <div class="px-3 py-2">Apakah kamu yakin akan menghapus {nama} dari anggota keluarga?</div>
  <div class="flex flex-row-reverse px-3 py-2 mt-auto">
    <Button
      class="ml-auto text-white bg-red-500 btn"
      style="background-color:#ff5959"
      icon="delete"
      on:click={emitYes}
      title="Hapus Anggota Keluarga">
      Hapus
    </Button>
    <Button on:click={() => dialog.close(true)} icon="cancel">Tidak</Button>
  </div>
</Dialog>
