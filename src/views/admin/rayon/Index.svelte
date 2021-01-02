<script>
  import * as fetchService from '/@store/fetch.service.js'
  import { onDestroy } from 'svelte'
  import AddRayonDialog from './AddRayonDialog.svelte'
  import UpdateRayonDialog from './UpdateRayonDialog.svelte'
  import DeleteRayonDialog from './DeleteRayonDialog.svelte'
  import Button from '/@components/Button.svelte'
  import Menu from '/@components/Menu.svelte'
  import { link } from 'svelte-spa-router'
  import moment from 'moment'

  const fetchURL = '/api/data/rayon'

  /** @type {AddRayonDialog} */
  let addRayonDialog
  /** @type {UpdateRayonDialog} */
  let updateRayonDialog
  /** @type {DeleteRayonDialog} */
  let deleteRayonDialog

  let currentSelectedKey = 0
  let lastRayonActionSuccess
  /** @type {Menu} */
  let menu
  /**  Type of succes event.
   *
   * `1` for Create data succes;
   * `2` for Update data success;
   * `3` for Delete data success;
   * @type {1|2|3}
   */
  let successType

  let response = fetchService.fetch(fetchURL)

  function openAddDialog() {
    addRayonDialog.open()
  }

  function refetchData() {
    fetchService.deleteCache(fetchURL)
    fetchService.cancel()
    response = fetchService.fetch(fetchURL)
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

  function openContextMenu(event) {
    menu.open(event)
    currentSelectedKey = +event.target.dataset.key
  }

  async function openUpdateRayonDialog() {
    const currentSelectedRayon = await getCurrenSelectedRayon()
    updateRayonDialog.open(currentSelectedRayon)
  }

  async function openDeleteRayonDialog() {
    const currentSelectedRayon = await getCurrenSelectedRayon()
    deleteRayonDialog.open(currentSelectedRayon)
  }

  async function getCurrenSelectedRayon() {
    const dataRayon = await fetchService.fetch(fetchURL)
    return dataRayon[currentSelectedKey]
  }

  onDestroy(fetchService.cancel)
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="flex flex-col flex-wrap p-3 bg-white border-b border-gray-200 md:flex-row ">
    <div class="mb-2 md:place-self-center md:mb-0">
      <h3 class="text-lg">Rayon</h3>
    </div>
    <div class="w-full border border-t md:hidden">
      <!--  -->
    </div>
    <div class="mt-2 ml-auto md:mt-0">
      <Button on:click={refetchData} icon="refresh" title="Muat ulang Data" />
      <Button on:click={openAddDialog} icon="plus" primary title="Tambah rayon" />
    </div>
  </div>

  <Menu bind:this={menu}>
    <ul class="p-1">
      <!-- svelte-ignore a11y-missing-attribute -->
      <li>
        <a class="inline-flex p-2 cursor-pointer" on:click={openUpdateRayonDialog}>
          <i class="ml-auto mdi mdi-pencil" />Ubah
        </a>
      </li>
      <!-- svelte-ignore a11y-missing-attribute -->
      <li>
        <a class="inline-flex p-2 cursor-pointer" on:click={openDeleteRayonDialog}>
          <i class="ml-auto mdi mdi-delete" />Hapus
        </a>
      </li>
    </ul>
  </Menu>

  <AddRayonDialog bind:this={addRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />
  <UpdateRayonDialog bind:this={updateRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />
  <DeleteRayonDialog bind:this={deleteRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />

  <div class="flex flex-col flex-1 overflow-y-auto" role="list">
    {#await response}
      <div class="flex justify-center flex-1 hidden-100">
        <div class="self-center text-lg text-gray-600 animate-pulse">Memuat...</div>
      </div>
    {:then dataRayon}
      {#each dataRayon as rayon, key}
        <a
          class="list--item"
          data-key={key}
          href={`/admin/rayon/${rayon.id_rayon}`}
          on:contextmenu|preventDefault={openContextMenu}
          role="listitem"
          use:link>
          <!--  -->
          <div class="flex flex-col">
            <div class="font-bold">{rayon.nama}</div>
            <!-- svelte-ignore missing-declaration -->
            <div class="text-xs">{moment(rayon.tgl_terakhir_update).fromNow()}</div>
          </div>
          <div
            class="flex items-center justify-center p-1 ml-auto text-white bg-blue-500 rounded-full rayon-info--jumlah-kk"
            title="Jumlah kepala keluarga">
            {rayon.jumlah_kk}
          </div>
        </a>
      {:else}
        <div class="flex flex-col items-center justify-center flex-1 text-gray-600 hidden-100">
          <div class=""><i class="mdi mdi-database-outline" style="vertical-align:unset;font-size:100px" /></div>
          <div class="text-lg">Uh oh... Belum ada data</div>
        </div>
      {/each}
    {/await}
  </div>
</div>
