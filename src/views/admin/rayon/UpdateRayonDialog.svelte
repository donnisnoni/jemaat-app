<script>
  import { autoCapitalizeWords, autoSelectOnFocus } from '/@actions/inputDirectives.js'
  import Dialog from '/@components/Dialog.svelte'
  import Button from '/@components/Button.svelte'
  import http from '/@shared/http.js'
  import axios from 'axios'
  import { createEventDispatcher, onDestroy } from 'svelte'

  const emit = createEventDispatcher()

  let dialog,
    namaRayon = '',
    namaRayonBefore = '',
    idRayon = 0,
    loading = false,
    cancelTokenSrc = axios.CancelToken.source()

  /** @type {HTMLFormElement} */
  let formAddRayon

  export function open({ id_rayon, nama }) {
    namaRayon = namaRayonBefore = nama
    idRayon = id_rayon
    dialog.open()
  }

  function doUpdate() {
    loading = true
    if (!formAddRayon.checkValidity()) return
    cancelTokenSrc = axios.CancelToken.source()
    http
      .put(`rayon/${idRayon}`, { nama: namaRayon }, { cancelToken: cancelTokenSrc.token })
      .then(async (/* resp */) => {
        resetData()
        emit('success', { successType: 3 })
        dialog.close(true)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        loading = false
      })
  }

  function resetData() {
    namaRayon = ''
  }

  function cancel() {
    dialog.close(true)
  }

  onDestroy(() => {
    cancelTokenSrc.cancel('Component is destroyed')
  })

  $: persistent = !namaRayon.length ? false : namaRayon != namaRayonBefore
</script>

<Dialog bind:this={dialog} class="simple-dialog" on:closed {persistent}>
  <h3 class="px-3 py-2 text-lg">Ubah Rayon {namaRayonBefore}</h3>
  <!-- <hr /> -->
  <div class="flex flex-col px-3 py-2 overflow-y-auto">
    <form id="form-update-rayon" bind:this={formAddRayon} on:submit|preventDefault={doUpdate}>
      <label class="block" for="nama-rayon-2">Nama Rayon</label>
      <input
        autocomplete="off"
        bind:value={namaRayon}
        class="w-full field"
        disabled={loading}
        id="nama-rayon-2"
        minlength="3"
        required
        spellcheck="false"
        type="text"
        use:autoCapitalizeWords
        use:autoSelectOnFocus />
    </form>
  </div>
  <div class="flex px-3 py-2 mt-auto">
    <Button on:click={cancel} icon="cancel">{loading || namaRayon !== namaRayonBefore ? 'batalkan' : 'tutup'}</Button>
    <Button
      class="ml-auto btn btn-primary btn-scale"
      disabled={loading || namaRayon === namaRayonBefore}
      form="form-update-rayon"
      icon={loading || 'content-save-outline'}
      primary
      title="Simpan"
      type="submit">
      {!loading ? 'Simpan' : 'memperbaharui...'}
    </Button>
  </div>
</Dialog>
