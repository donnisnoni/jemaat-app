<script>
  import Button from '/@components/Button.svelte'
  import Dialog from '/@components/Dialog.svelte'
  import http from '/@shared/http.js'
  import axios from 'axios'
  import { createEventDispatcher } from 'svelte'

  const emit = createEventDispatcher()

  /** @type {Dialog} */
  let dialog
  let loading = false
  let rayon = { nama: '' }
  /** @type {import('axios').CancelTokenSource} */
  let cancelTokenSrc

  export function open(_rayon) {
    dialog.open()
    rayon = _rayon
  }

  function doDelete() {
    loading = true
    cancelTokenSrc = axios.CancelToken.source()
    rayon &&
      http
        .delete('rayon/' + rayon.id_rayon)
        .then(({ status }) => {
          if (status == 200) {
            emit('success')
            dialog.close(true)
          }
        })
        .finally(() => (loading = false))
  }

  function cancel() {
    if (loading) {
      cancelTokenSrc.cancel()
    } else {
      dialog.close(true)
    }
    loading = false
  }
</script>

<Dialog bind:this={dialog} class="simple-dialog" on:closed persistent>
  <h3 class="px-3 py-2 text-lg">Hapus Rayon</h3>
  <div class="px-3 py-2">Apakah kamu yakin akan menghapus rayon {rayon.nama}?</div>
  {#if rayon.jumlah_kk > 0}
    <div class="px-3 py-2 text-red-500">
      Peringatan: Rayon
      {rayon.nama}
      memiliki
      {rayon.jumlah_kk}
      keluarga, aksi ini akan menghapus semua keluarga yang ada!
    </div>
  {/if}
  <div class="flex flex-col px-3 py-2 overflow-y-auto" />
  <div class="flex flex-row-reverse px-3 py-2 mt-auto">
    <Button
      class="ml-auto text-white btn"
      style="background-color:#ff5959"
      icon="delete"
      {loading}
      on:click={doDelete}
      title="Hapus Rayon">
      Hapus
    </Button>
    <Button on:click={cancel} icon="cancel">{loading ? 'batalkan' : 'tidak'}</Button>
  </div>
</Dialog>
