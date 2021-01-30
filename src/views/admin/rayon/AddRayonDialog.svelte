<script>
  import { autoCapitalizeWords } from '/@actions/inputDirectives.js'
  import Dialog from '/@components/Dialog.svelte'
  import Button from '/@components/Button.svelte'
  import http from '/@shared/http.js'
  import axios from 'axios'
  import { createEventDispatcher, onDestroy } from 'svelte'

  const emit = createEventDispatcher()

  let dialog,
    nama = '',
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
    http
      .post('rayon', { nama }, { cancelToken: cancelTokenSrc.token })
      .then(() => {
        nama = ''
        emit('success')
        dialog.close(true)
      })
      .finally(() => (loading = false))
  }

  onDestroy(cancelTokenSrc.cancel)
</script>

<Dialog bind:this={dialog} class="simple-dialog" on:closed persistent={nama.length}>
  <h3 class="px-3 py-2 text-lg">Tambah Rayon</h3>
  <!-- <hr /> -->
  <div class="flex flex-col px-3 py-2 overflow-y-auto">
    <form id="form-add-rayon" bind:this={formAddRayon} on:submit|preventDefault={createRayon}>
      <label class="block" for="nama-rayon-1">Nama Rayon</label>
      <input
        autocomplete="off"
        bind:value={nama}
        class="w-full field"
        disabled={loading}
        id="nama-rayon-1"
        minlength="3"
        required
        spellcheck="false"
        use:autoCapitalizeWords />
    </form>
  </div>
  <div class="flex px-3 py-2 mt-auto">
    <Button
      class="ml-auto btn btn-primary "
      form="form-add-rayon"
      icon="plus"
      {loading}
      primary
      title="Tambah Rayon"
      type="submit">
      Tambah
    </Button>
  </div>
</Dialog>
