<script>
  import * as fetchService from '/@store/fetch.service.js'
  import Button from '/@components/Button.svelte'
  import EmptyDataPlaceholder from '/@components/EmptyDataPlaceholder.svelte'
  import LoadingPlaceholder from '/@components/LoadingPlaceholder.svelte'
  import MenuEditDelete from '/@components/MenuEditDelete.svelte'
  // import DialogDeleteKK from './DialogDeleteKK.svelte'
  import { push, link } from 'svelte-spa-router'
  import moment from 'moment'

  /** @type {MenuEditDelete} */
  let menuEditDelete
  /** @type {DialogDeleteKK} */
  // let dialogDeleteKk

  const fetchURL = 'anggota_kk'

  let lastIndexToActionWith = 0
  let anggotaKk
  const fetchData = () => fetchService.fetch(fetchURL, (_KK) => (anggotaKk = _KK))
  let anggotaKKResponse = fetchData()

  function refetchData() {
    // fetchService.cancel()
    anggotaKKResponse = fetchData()
  }

  function openContextMenu(event, index) {
    lastIndexToActionWith = index
    menuEditDelete.open(event)
  }

  function opendDialogDeleteKK() {
    dialogDeleteKk.open(anggotaKk[lastIndexToActionWith])
  }
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="flex flex-col flex-wrap p-3 bg-white border-b border-gray-200 md:flex-row ">
    <div class="mb-2 md:place-self-center md:mb-0">
      <h3 class="text-lg">Jemaat</h3>
    </div>
    <div class="w-full border border-t md:hidden" />
    <div class="mt-2 ml-auto md:mt-0">
      <Button icon="refresh" iconOnly on:click={refetchData} title="Muat ulang Data" />
      <Button icon="plus" iconOnly on:click={() => push('/admin/kk/create')} primary title="Tambah Jemaat" />
    </div>
  </div>

  <div class="flex flex-col flex-1 overflow-y-auto" role="list">
    {#await $anggotaKKResponse}
      <LoadingPlaceholder />
    {:then dataAnggotaKK}
      {#each dataAnggotaKK as anggotaKk}
        <!-- on:contextmenu|preventDefault={(event) => openContextMenu(event, index)} -->
        <a class="list--item" href={`/admin/kk/${anggotaKk.id_kk}`} role="listitem" use:link>
          <div class="emoji-gender">
            {anggotaKk.jk == 'L' ? '👨' : '👩'}
          </div>
          <div class="flex flex-col">
            <div class="font-bold">
              {anggotaKk.nama}
            </div>
            <div class="time-from-now">{moment(anggotaKk.tgl_terakhir_update).fromNow()}</div>
          </div>
        </a>
      {:else}
        <EmptyDataPlaceholder>Belum ada jemaat</EmptyDataPlaceholder>
      {/each}
    {/await}
  </div>

  <MenuEditDelete
    bind:this={menuEditDelete}
    on:edit-clicked={() => push(`/admin/kk/${anggotaKk[lastIndexToActionWith].id_kk}`)}
    on:delete-clicked={opendDialogDeleteKK} />

  <!-- <DialogDeleteKK bind:this={dialogDeleteKk} on:success={refetchData} /> -->
</div>
