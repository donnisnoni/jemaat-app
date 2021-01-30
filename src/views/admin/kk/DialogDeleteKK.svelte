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
  let KK = { nama: '' }
  /** @type {import('axios').CancelTokenSource} */
  let cancelTokenSrc

  export function open(_KK) {
    dialog.open()
    KK = _KK
  }

  function doDelete() {
    if (!KK) return
    loading = true
    cancelTokenSrc = axios.CancelToken.source()
    http
      .delete(`kk/${KK.id_kk}`)
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
  <h3 class="px-3 py-2 text-lg">Hapus Keluarga?</h3>
  <div class="px-3 py-2">Apakah kamu yakin akan menghapus keluarga {KK.nama}?</div>
  {#if KK.jumlah_anggota_kk > 0}
    <div class="px-3 py-2 text-red-500">
      Peringatan:
      {KK.nama}
      memiliki
      {KK.jumlah_anggota_kk}
      anggota keluarga, aksi ini juga akan menghapus data mereka.
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
      title="Hapus Keluarga">
      Hapus
    </Button>
    <Button on:click={cancel} icon="cancel">{loading ? 'batalkan' : 'tidak'}</Button>
  </div>
</Dialog>
