<script>
  import * as fetchService from '/@store/fetch.service.js'
  import { onMount } from 'svelte'
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
  let searchKeyword = (queries.s && queries.s[0]) || ''
  let page = (queries.page && +queries.page[0]) || 1

  let selectedIndex = 0
  let rayon

  let totalItemCount = 0
  let itemsPerPage = 10

  const fetchURL = 'rayon?metadata=true&exclude_kk=true'

  const fetchData = () => {
    const _fetchURL = searchKeyword.length
      ? `${fetchURL}&page=${page}&search=${searchKeyword}`
      : `${fetchURL}&page=${page}`
    return fetchService.fetch(
      _fetchURL,
      ({ count, rows }) => {
        totalItemCount = count
        rayon = rows
      },
      null,
      null,
      !!searchKeyword.length
    )
  }

  let rayonResponse = fetchData()

  function refetchData() {
    rayonResponse = fetchData()
  }

  function openContextMenu(event, index) {
    selectedIndex = index
    menuEditDelete.open(event)
  }

  function search({ keyCode, target }) {
    if (keyCode != 13 || target.value === searchKeyword) return
    page = 1
    searchKeyword = target.value
    updateRouteQueries()
    refetchData()
  }

  const openUpdateRayonDialog = () => updateRayonDialog.open(rayon[selectedIndex])

  const openDeleteRayonDialog = () => deleteRayonDialog.open(rayon[selectedIndex])

  const updateRouteQueries = () => {
    const queriesObject = { page: [page + ''] }
    if (searchKeyword.length) queriesObject.s = [searchKeyword]
    push($location + encode(queriesObject))
  }

  $: totalPageCount = Math.ceil(totalItemCount / itemsPerPage)

  onMount(() => {
    let init = 1
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
      !init && refetchData()
    })
    init = false
    return unsubscribeQuerystring
  })
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
      <Button on:click={addRayonDialog.open} icon="plus" iconOnly primary title="Tambah rayon" />
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
        <EmptyDataPlaceholder>
          {searchKeyword.length
            ? `Hasil pencarian kosong`
            : page == 1
            ? 'Belum ada rayon'
            : `Halaman ${page} kosong, coba ke halaman lain`}
        </EmptyDataPlaceholder>
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

  <AddRayonDialog bind:this={addRayonDialog} on:success={refetchData} />
  <UpdateRayonDialog bind:this={updateRayonDialog} on:success={refetchData} />
  <DeleteRayonDialog bind:this={deleteRayonDialog} on:success={refetchData} />
</div>
