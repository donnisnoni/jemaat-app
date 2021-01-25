<script>
  import * as fetchService from '/@store/fetch.service.js'
  import { onDestroy } from 'svelte'
  import AddRayonDialog from './AddRayonDialog.svelte'
  import UpdateRayonDialog from './UpdateRayonDialog.svelte'
  import EmptyDataPlaceholder from '/@components/EmptyDataPlaceholder.svelte'
  import LoadingPlaceholder from '/@components/LoadingPlaceholder.svelte'
  import Pagination from '/@components/Pagination.svelte'
  import DeleteRayonDialog from './DeleteRayonDialog.svelte'
  import Button from '/@components/Button.svelte'
  import MenuEditDelete from '/@components/MenuEditDelete.svelte'
  import { link, location, push, querystring } from 'svelte-spa-router'
  import { encode, decode } from 'query-string-lite'
  import moment from 'moment'

  /** @type {AddRayonDialog} */
  let addRayonDialog
  /** @type {UpdateRayonDialog} */
  let updateRayonDialog
  /** @type {DeleteRayonDialog} */
  let deleteRayonDialog
  /** @type {MenuEditDelete} */
  let menuEditDelete

  let queries = decode('?' + $querystring)

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
  let searchKeyword = (queries.s && queries.s[0]) || ''

  // Paginations
  let rayonTotalCount = 0
  let itemsPerPage = 10
  let page = (queries.page && +queries.page[0]) || 1

  const fetchURL = 'rayon?metadata=true&exclude_kk=true'

  const fetchData = () => {
    const _fetchURL = searchKeyword.length
      ? `${fetchURL}&page=${page}&search=${searchKeyword}`
      : `${fetchURL}&page=${page}`
    return fetchService.fetch(_fetchURL, ({ count, rows }) => {
      rayonTotalCount = count
      rayon = rows
    })
  }

  let rayonResponse = fetchData()

  function openAddDialog() {
    addRayonDialog.open()
  }

  function refetchData() {
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

  function search({ keyCode, target }) {
    if (keyCode != 13) return
    searchKeyword = target.value
    updateRouteQueries()
    refetchData()
  }

  const openUpdateRayonDialog = () => updateRayonDialog.open(rayon[lastIndexToActionWith])

  const openDeleteRayonDialog = () => deleteRayonDialog.open(rayon[lastIndexToActionWith])

  const updateRouteQueries = () => {
    const queriesObject = { page: [page + ''] }
    if (searchKeyword.length) queriesObject.s = [searchKeyword]
    push($location + encode(queriesObject))
  }

  $: totalPageCount = Math.ceil(rayonTotalCount / itemsPerPage)

  const unsubscribeQuerystring = querystring.subscribe((v) => {
    const _queries = decode('?' + v)
    if (_queries.page && _queries.page[0] && +_queries.page[0] != page) {
      page = _queries.page
    }
    if (_queries.s && _queries.s[0]) {
      searchKeyword = _queries.s[0]
    } else {
      searchKeyword = ''
    }
    refetchData()
  })

  onDestroy(unsubscribeQuerystring)
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="flex flex-col flex-wrap p-3 bg-white border-b border-gray-200 md:flex-row">
    <div class="mb-2 md:place-self-center md:mb-0">
      <h3 class="text-lg">Rayon</h3>
    </div>
    <div class="w-full border border-t md:hidden" />
    <div class="flex gap-1 mt-2 ml-auto md:mt-0">
      <!-- svelte-ignore a11y-autofocus -->
      <input autofocus on:keypress={search} class="field" placeholder="Cari..." value={searchKeyword} />
      <Button on:click={refetchData} icon="refresh" iconOnly title="Muat ulang Data" />
      <Button on:click={openAddDialog} icon="plus" iconOnly primary title="Tambah rayon" />
    </div>
  </div>

  {#if searchKeyword.length}
    <div class="p-2 border-b">
      Hasil pencarian dari "{searchKeyword}"
    </div>
  {/if}

  <div class="flex flex-col flex-1 overflow-y-auto" role="list">
    {#await $rayonResponse}
      <LoadingPlaceholder />
    {:then { rows }}
      {#each rows as rayon, index}
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
        <EmptyDataPlaceholder
          >{searchKeyword.length ? `Hasil pencarian kosong` : 'Belum ada rayon'}</EmptyDataPlaceholder>
      {/each}
    {/await}
  </div>

  {#if totalPageCount > 1}
    <div class="flex justify-center p-1 border-t">
      <div class="flex ml-auto hidden-100">
        <Pagination pageCount={totalPageCount} on:change={updateRouteQueries} bind:page />
      </div>
    </div>
  {/if}

  <MenuEditDelete
    bind:this={menuEditDelete}
    on:delete-clicked={openDeleteRayonDialog}
    on:edit-clicked={openUpdateRayonDialog} />

  <AddRayonDialog bind:this={addRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />
  <UpdateRayonDialog bind:this={updateRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />
  <DeleteRayonDialog bind:this={deleteRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />
</div>
