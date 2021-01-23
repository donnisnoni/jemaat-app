<script>
  import * as fetchService from '/@store/fetch.service.js'
  // import { onDestroy } from 'svelte'
  import AddRayonDialog from './AddRayonDialog.svelte'
  import UpdateRayonDialog from './UpdateRayonDialog.svelte'
  import EmptyDataPlaceholder from '/@components/EmptyDataPlaceholder.svelte'
  import LoadingPlaceholder from '/@components/LoadingPlaceholder.svelte'
  import Pagination from '/@components/Pagination.svelte'
  import DeleteRayonDialog from './DeleteRayonDialog.svelte'
  import Button from '/@components/Button.svelte'
  import MenuEditDelete from '/@components/MenuEditDelete.svelte'
  import { link, location, push } from 'svelte-spa-router'
  import moment from 'moment'

  const fetchURL = 'rayon?metadata=true&exclude_kk=true'

  /** @type {AddRayonDialog} */
  let addRayonDialog
  /** @type {UpdateRayonDialog} */
  let updateRayonDialog
  /** @type {DeleteRayonDialog} */
  let deleteRayonDialog
  /** @type {MenuEditDelete} */
  let menuEditDelete

  let lastIndexToActionWith = 0
  let lastRayonActionSuccess
  /**  Type of succes event.
   *
   * `1` for Create data succes;
   * `2` for Update data success;
   * `3` for Delete data success;
   * @type {1|2|3}
   */
  let successType
  let rayon

  // Paginations
  let rayonTotalCount = 0
  let itemsPerPage = 10
  let page = 1

  const fetchData = () => fetchService.fetch(`${fetchURL}&page=${page}`, (_rayon) => (rayon = _rayon))
  const fetchRayonTotalCount = () =>
    fetchService.fetch('rayon?count=true', (_rayonTotalCount) => (rayonTotalCount = _rayonTotalCount))
  fetchRayonTotalCount()

  let rayonResponse = fetchData()

  function openAddDialog() {
    addRayonDialog.open()
  }

  function refetchData() {
    fetchRayonTotalCount()
    rayonResponse = fetchData()
  }

  function onActionSuccess({ detail }) {
    lastRayonActionSuccess = detail.dataRayon
    successType = detail.successType
    refetchData()
  }

  function showSuccessAlert() {
    if (!lastRayonActionSuccess) return
    let message
    switch (successType) {
      case 1:
        message = `Sukses menambahkan ${lastRayonActionSuccess.nama} sebagai rayon baru kita!`
        break
      case 2:
        message = `Sukses memperbaharui data rayon!`
        break
      case 3:
        message = `Sukses menghapus rayon ${lastRayonActionSuccess.nama}!`
        break
      default:
        break
    }
    alert(message)
    lastRayonActionSuccess = null
  }

  function openContextMenu(event, index) {
    lastIndexToActionWith = index
    menuEditDelete.open(event)
  }

  function openUpdateRayonDialog() {
    updateRayonDialog.open(rayon[lastIndexToActionWith])
  }

  function openDeleteRayonDialog() {
    deleteRayonDialog.open(rayon[lastIndexToActionWith])
  }

  function updateRouteQuery() {
    push($location + '?page=' + page)
  }

  $: totalPageCount = Math.ceil(rayonTotalCount / itemsPerPage)
  $: {
    if (totalPageCount > 0 && page > totalPageCount) {
      page = totalPageCount
    }
    refetchData()
    updateRouteQuery()
  }

  // onDestroy(fetchService.cancel)
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="flex flex-col flex-wrap p-3 bg-white border-b border-gray-200 md:flex-row">
    <div class="mb-2 md:place-self-center md:mb-0">
      <h3 class="text-lg">Rayon</h3>
    </div>
    <div class="w-full border border-t md:hidden" />
    <div class="mt-2 ml-auto md:mt-0">
      <Button on:click={refetchData} icon="refresh" iconOnly title="Muat ulang Data" />
      <Button on:click={openAddDialog} icon="plus" iconOnly primary title="Tambah rayon" />
    </div>
  </div>

  <div class="flex flex-col flex-1 overflow-y-auto" role="list">
    {#await $rayonResponse}
      <LoadingPlaceholder />
    {:then rayons}
      {#each rayons as rayon, index}
        <a
          class="list--item"
          href={`/admin/rayon/${rayon.id_rayon}`}
          on:contextmenu|preventDefault={(event) => openContextMenu(event, index)}
          role="listitem"
          use:link>
          <div class="flex flex-col">
            <div class="font-bold">{rayon.nama}</div>
            <div class="time-from-now">{moment(rayon.tgl_terakhir_update).fromNow()}</div>
          </div>
          <div class="rayon-info--jumlah-kk" title="Jumlah kepala keluarga">{rayon.jumlah_kk}</div>
        </a>
      {:else}
        <EmptyDataPlaceholder>Belum ada rayon</EmptyDataPlaceholder>
      {/each}
    {/await}
  </div>

  <div class="flex justify-center p-1 border-t">
    <div class="flex ml-auto hidden-100">
      <Pagination pageCount={totalPageCount} bind:page />
    </div>
  </div>

  <MenuEditDelete
    bind:this={menuEditDelete}
    on:delete-clicked={openDeleteRayonDialog}
    on:edit-clicked={openUpdateRayonDialog} />

  <AddRayonDialog bind:this={addRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />
  <UpdateRayonDialog bind:this={updateRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />
  <DeleteRayonDialog bind:this={deleteRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />
</div>
