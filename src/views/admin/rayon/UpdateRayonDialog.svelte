<script>
  import { autoCapitalizeWords, autoSelectOnFocus } from '/@actions/inputDirectives.js'
  import Dialog from '/@components/Dialog.svelte'
  import Button from '/@components/Button.svelte'
  import http from '/@shared/http.js'
  import axios from 'axios'
  import { createEventDispatcher, onDestroy } from 'svelte'

  const emit = createEventDispatcher()

  let dialog,
    nama = '',
    namaBefore = '',
    idRayon = 0,
    loading = false,
    cancelTokenSrc = axios.CancelToken.source()

  /** @type {HTMLFormElement} */
  let formAddRayon

  export function open({ id_rayon, nama: _nama }) {
    namaBefore = _nama
    nama = _nama
    idRayon = id_rayon
    dialog.open()
  }

  function doUpdate() {
    loading = true
    if (!formAddRayon.checkValidity()) return
    cancelTokenSrc = axios.CancelToken.source()
    http
      .put(`rayon/${idRayon}`, { nama }, { cancelToken: cancelTokenSrc.token })
      .then(() => {
        nama = ''
        emit('success')
        dialog.close(true)
      })
      .finally(() => (loading = false))
  }

  function cancel() {
    dialog.close(true)
  }

  onDestroy(cancelTokenSrc.cancel)

  $: persistent = !nama.length ? false : nama != namaBefore
</script>

<Dialog bind:this={dialog} class="simple-dialog" on:closed {persistent}>
  <h3 class="px-3 py-2 text-lg">Ubah Rayon {namaBefore}</h3>
  <div class="flex flex-col px-3 py-2 overflow-y-auto">
    <form id="form-update-rayon" bind:this={formAddRayon} on:submit|preventDefault={doUpdate}>
      <label class="block" for="nama-rayon-2">Nama Rayon</label>
      <input
        autocomplete="off"
        bind:value={nama}
        class="w-full field"
        disabled={loading}
        id="nama-rayon-2"
        minlength="3"
        required
        spellcheck="false"
        type="text"
        use:autoCapitalizeWords />
    </form>
  </div>
  <div class="flex px-3 py-2 mt-auto">
    <Button
      class="flex-row-reverse ml-auto btn btn-primary btn-scale"
      disabled={nama === namaBefore}
      form="form-update-rayon"
      icon="content-save-outline"
      {loading}
      primary
      title="Simpan"
      type="submit">
      Simpan
    </Button>
    <Button on:click={cancel} icon="cancel">{loading || nama !== namaBefore ? 'batalkan' : 'tutup'}</Button>
  </div>
</Dialog>
