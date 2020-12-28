<script>
  import * as rayonStore from '/@store/rayon.js'
  import { onDestroy } from 'svelte'
  import AddRayonDialog from './AddRayonDialog.svelte'
  import Button from '/@components/Button.svelte'
  import Menu from '/@components/Menu.svelte'
  import DeleteRayonDialog from './DeleteRayonDialog.svelte'
  import moment from 'moment'

  /** @type {AddRayonDialog} */
  let addRayonDialog
  let currentSelectedKey = 0
  /** @type {DeleteRayonDialog} */
  let deleteRayonDialog
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

  let response = rayonStore.fetch()

  function openAddDialog() {
    addRayonDialog.open()
  }

  function refetchData() {
    rayonStore.deleteCache()
    rayonStore.cancel()
    response = rayonStore.fetch()
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
    if (currentSelectedKey != event.target.dataset.key) {
      currentSelectedKey = event.target.dataset.key
    }
  }

  async function openDeleteRayonDialog() {
    const dataRayon = await response
    const currentSelectedRayon = dataRayon[currentSelectedKey]
    // console.log(currentSelectedRayon)
    deleteRayonDialog.open(currentSelectedRayon)
  }

  onDestroy(rayonStore.cancel)
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
      <li><a class="inline-flex p-2 cursor-pointer"> <i class="ml-auto mdi mdi-pencil" />Ubah</a></li>
      <!-- svelte-ignore a11y-missing-attribute -->
      <li>
        <a class="inline-flex p-2 cursor-pointer" on:click={openDeleteRayonDialog}>
          <i class="ml-auto mdi mdi-delete" />Hapus
        </a>
      </li>
    </ul>
  </Menu>

  <AddRayonDialog bind:this={addRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />
  <DeleteRayonDialog bind:this={deleteRayonDialog} on:success={onActionSuccess} on:closed={showSuccessAlert} />

  <div class="flex flex-col flex-1 overflow-y-auto">
    {#await response}
      <div class="flex justify-center flex-1 hidden-100">
        <div class="self-center text-lg text-gray-600 animate-pulse">Memuat...</div>
      </div>
    {:then dataRayon}
      {#each dataRayon as rayon, key}
        <div class="flex p-3 border-b cursor-pointer" data-key={key} on:contextmenu|preventDefault={openContextMenu}>
          <div class="flex flex-col">
            <div class="font-bold">{rayon.nama}</div>
            <!-- svelte-ignore missing-declaration -->
            <div class="text-xs place-self-end">{moment(rayon.tgl_terakhir_update).fromNow()}</div>
          </div>
          <div
            class="flex items-center justify-center p-1 ml-auto text-white bg-blue-500 rounded-full rayon-info--jumlah-kk"
            title="Jumlah kepala keluarga">
            {rayon.jumlah_kk}
          </div>
        </div>
      {:else}
        <div class="flex flex-col items-center justify-center flex-1 text-gray-600 hidden-100">
          <div class=""><i class="mdi mdi-database-outline" style="vertical-align:unset;font-size:100px" /></div>
          <div class="text-lg">Uh oh... Belum ada data</div>
        </div>
      {/each}
    {/await}
  </div>
</div>
