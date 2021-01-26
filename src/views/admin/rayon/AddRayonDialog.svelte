<script>
  import { autoCapitalizeWords } from '/@actions/inputDirectives.js'
  import Dialog from '/@components/Dialog.svelte'
  import Button from '/@components/Button.svelte'
  import http from '/@shared/http.js'
  import axios from 'axios'
  import { createEventDispatcher, onDestroy } from 'svelte'

  const emit = createEventDispatcher()

  let dialog,
    namaRayon = '',
    loading = false,
    cancelTokenSrc = axios.CancelToken.source()

  /** @type {HTMLFormElement} */
  let formAddRayon

  export function open() {
    dialog.open()
  }

  function createRayon() {
    loading = true
    if (!formAddRayon.checkValidity()) return
    cancelTokenSrc = axios.CancelToken.source()
    const dataRayon = { nama: namaRayon }
    http
      .post('rayon', dataRayon, { cancelToken: cancelTokenSrc.token })
      .then(async (/* resp */) => {
        resetData()
        emit('success', { dataRayon, successType: 1 })
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

  onDestroy(() => {
    cancelTokenSrc.cancel('Component is destroyed')
  })

  $: persistent = namaRayon.length
</script>

<Dialog bind:this={dialog} class="simple-dialog" on:closed {persistent}>
  <h3 class="px-3 py-2 text-lg">Tambah Rayon</h3>
  <!-- <hr /> -->
  <div class="flex flex-col px-3 py-2 overflow-y-auto">
    <form id="form-add-rayon" bind:this={formAddRayon} on:submit|preventDefault={createRayon}>
      <label class="block" for="nama-rayon">Nama Rayon</label>
      <input
        autocomplete="off"
        bind:value={namaRayon}
        class="w-full field"
        disabled={loading}
        id="nama-rayon"
        minlength="3"
        required
        spellcheck="false"
        type="text"
        use:autoCapitalizeWords />
    </form>
  </div>
  <div class="flex px-3 py-2 mt-auto">
    <Button
      class="ml-auto btn btn-primary btn-scale"
      disabled={loading}
      form="form-add-rayon"
      icon={loading || 'plus'}
      primary
      title="Tambah Rayon"
      type="submit">
      {!loading ? 'Tambah' : 'menambahkan...'}
    </Button>
  </div>
</Dialog>
