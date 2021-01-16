<script>
  import * as fetchService from '/@store/fetch.service.js'
  import Button from '/@components/Button.svelte'
  import EmptyDataPlaceholder from '/@components/EmptyDataPlaceholder.svelte'
  import MenuEditDelete from '/@components/MenuEditDelete.svelte'
  import DialogDeleteKK from './DialogDeleteKK.svelte'
  import { push, link } from 'svelte-spa-router'
  import moment from 'moment'

  /** @type {MenuEditDelete} */
  let menuEditDelete
  /** @type {DialogDeleteKK} */
  let dialogDeleteKk

  const fetchURL = '/api/data/kk'

  let lastIndexToActionWith = 0
  let KK
  let KKResponse = fetchService.fetch(fetchURL).then((_KK) => {
    KK = _KK
    return _KK
  })

  function refetchData() {
    fetchService.cancel()
    KKResponse = fetchService.fetch(fetchURL).then((_KK) => {
      KK = _KK
      return _KK
    })
  }

  function openContextMenu(event, index) {
    lastIndexToActionWith = index
    menuEditDelete.open(event)
  }

  function opendDialogDeleteKK() {
    dialogDeleteKk.open(KK[lastIndexToActionWith])
  }
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="flex flex-col flex-wrap p-3 bg-white border-b border-gray-200 md:flex-row ">
    <div class="mb-2 md:place-self-center md:mb-0">
      <h3 class="text-lg">Keluarga</h3>
    </div>
    <div class="w-full border border-t md:hidden" />
    <div class="mt-2 ml-auto md:mt-0">
      <Button icon="refresh" on:click={refetchData} title="Muat ulang Data" />
      <Button icon="plus" on:click={() => push('/admin/kk/create')} primary title="Tambah Keluarga" />
    </div>
  </div>
  <!-- <div class="flex px-3 py-1 border-b border-gray-200">
    <input class="p-1" placeholder="Cari..." spellcheck="false" style="min-height:25px" type="text" />
    <div class="flex ml-2">
      <label class="self-center mr-1" for="sort-select">Urutkan:</label>
      <select id="sort-select" class="bg-white">
        <option value="Terbaru">Terbaru</option>
        <option value="Terbaru">Terlama</option>
      </select>
    </div>
  </div> -->

  <div class="flex flex-col flex-1 overflow-y-auto" role="list">
    {#await KKResponse}
      <!--  -->
    {:then dataKK}
      {#each dataKK as KK, index}
        <a
          class="list--item"
          href={`/admin/kk/${KK.id_kk}`}
          on:contextmenu|preventDefault={(event) => openContextMenu(event, index)}
          role="listitem"
          use:link>
          <div class="flex flex-col">
            <div class="font-bold">{KK.nama}</div>
            <div class="time-from-now">{moment(KK.tgl_terakhir_update).fromNow()}</div>
          </div>
          <div
            class="flex items-center justify-center p-1 ml-auto text-white bg-blue-500 rounded-full rayon-info--jumlah-kk"
            title="Jumlah anggota keluarga">
            {KK.jumlah_anggota_kk}
          </div>
        </a>
      {:else}
        <EmptyDataPlaceholder>Belum ada keluarga</EmptyDataPlaceholder>
      {/each}
    {/await}
  </div>

  <MenuEditDelete
    bind:this={menuEditDelete}
    on:edit-clicked={() => push(`/admin/kk/${KK[lastIndexToActionWith].id_kk}`)}
    on:delete-clicked={opendDialogDeleteKK} />

  <DialogDeleteKK bind:this={dialogDeleteKk} on:success={refetchData} />
</div>
