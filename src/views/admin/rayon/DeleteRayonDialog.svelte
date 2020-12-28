<script>
  import Button from '/@components/Button.svelte'
  import Dialog from '/@components/Dialog.svelte'

  /** @type {Dialog} */
  let dialog
  let loading = false
  let dataRayon = { nama: '' }

  export function open(_dataRayon) {
    dialog.open()
    dataRayon = _dataRayon
  }

  function preventDialogClosing(state = false) {
    return state
  }
</script>

<Dialog bind:this={dialog} class="simple-dialog" on:closed cancel={preventDialogClosing}>
  <h3 class="px-3 py-2 text-lg">Hapus Rayon {dataRayon.nama}?</h3>
  <div class="px-3 py-2">
    Apakah kamu yakin akan menghapus data ini? Data yang telah dihapus tidak dapat dikembalikan.
  </div>
  {#if dataRayon.jumlah_kk > 0}
    <div class="px-3 py-2 text-red-500">
      Catatan: Rayon
      {dataRayon.nama}
      memiliki
      {dataRayon.jumlah_kk}
      kepala keluarga, aksi ini juga akan menghapus data-data kepala keluarga tersebut.
    </div>
  {/if}
  <!-- <hr /> -->
  <div class="flex flex-col px-3 py-2 overflow-y-auto" />
  <div class="flex px-3 py-2 mt-auto">
    <Button on:click={dialog.close} icon="cancel">Cancel</Button>
    <Button
      class="ml-auto text-white bg-red-500 btn btn-scale"
      style="background-color:#ff5959"
      disabled={loading}
      icon={loading || 'delete'}
      title="Hapus Rayon">
      {!loading ? 'Hapus' : 'loading...'}
    </Button>
  </div>
</Dialog>
