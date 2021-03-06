<script>
  import { fetch } from '/@store/fetch.service.js'
  import LoadingPlaceholder from '/@components/LoadingPlaceholder.svelte'
  import EmptyDataPlaceholder from '/@components/EmptyDataPlaceholder.svelte'
  import Button from '/@components/Button.svelte'
  import Dialog from '/@components/Dialog.svelte'
  import Datatable from '/@components/Datatable.svelte'
  import * as router from 'svelte-spa-router'
  import { openNewWindow } from '/@shared/utils'

  export let params = { id: 0 }

  /** @type {Datatable} */
  let datatable
  /** @type {Dialog} */
  let dialogPrint

  let rayon = { nama: '' }

  const rayonResponse = fetch(`rayon/${params.id}?with_kk=true`, (_rayon) => (rayon = _rayon))
  const openReport = (keyword) => openNewWindow(`/api/data/rayon/${rayon.id_rayon}/report?keyword=${keyword}`)
</script>

<div class="flex flex-col flex-1 bg-white card">
  <div class="flex flex-col flex-wrap p-3 bg-white border-b border-gray-200 md:flex-row">
    <div class="mb-2 md:place-self-center md:mb-0">
      <h3 class="text-lg">Rayon {rayon.nama}</h3>
    </div>
    <div class="w-full border border-t md:hidden" />
    {#if rayon && rayon.jumlah_kk}
      <div class="flex gap-1 mt-2 ml-auto md:mt-0">
        <Button icon="printer" iconOnly on:click={dialogPrint.open} title="Cetak Laporan" />
      </div>
    {/if}
  </div>

  {#await $rayonResponse}
    <LoadingPlaceholder />
  {:then rayon}
    {#if !rayon.jumlah_kk}
      <EmptyDataPlaceholder>Belum ada keluarga</EmptyDataPlaceholder>
    {:else}
      <div class="flex flex-col flex-wrap gap-2 p-3 md:flex-row">
        <!-- TOTAL KK -->
        <div class="flex items-center justify-around p-3 border rounded-md bg-gray-50" style="min-width: 200px">
          <img draggable="false" width="70px" src="/img/family.svg" alt="" />
          <div class="mx-auto text-3xl">
            <div class="flex flex-col items-center mx-auto">
              <div class="text-sm">Keluarga</div>
              {rayon.jumlah_kk}
            </div>
          </div>
        </div>
        <!-- TOTAL JEMAAT -->
        <div class="flex items-center justify-around p-3 border rounded-md bg-gray-50" style="min-width: 200px">
          <img draggable="false" width="87px" src="/img/peoples.svg" alt="" />
          <div class="mx-auto text-3xl">
            <div class="flex flex-col items-center mx-auto">
              <div class="text-sm">Jemaat</div>
              {rayon.jumlah_jemaat}
              <div class="text-xs">Sudah Sidi: {rayon.jumlah_jemaat_sudah_sidi}</div>
            </div>
          </div>
        </div>
        <!-- TOTAL JEMAAT L -->
        <div class="flex items-center justify-around p-3 border rounded-md bg-gray-50" style="min-width: 200px">
          <img draggable="false" width="70px" src="/img/man.svg" alt="" />
          <div class="mx-auto text-3xl">
            <div class="flex flex-col items-center mx-auto">
              <div class="text-sm">Jemaat Laki-laki</div>
              {rayon.jumlah_jemaat_l}
              <div class="text-xs">Sudah Sidi: {rayon.jumlah_jemaat_sudah_sidi_l}</div>
            </div>
          </div>
        </div>
        <!-- TOTAL JEMAAT P -->
        <div class="flex items-center justify-around p-3 border rounded-md bg-gray-50" style="min-width: 200px">
          <img draggable="false" width="72px" src="/img/woman.svg" alt="" />
          <div class="mx-auto text-3xl">
            <div class="flex flex-col items-center mx-auto">
              <div class="text-sm">Jemaat Perempuan</div>
              {rayon.jumlah_jemaat_p}
              <div class="text-xs">Sudah Sidi: {rayon.jumlah_jemaat_sudah_sidi_p}</div>
            </div>
          </div>
        </div>
      </div>

      <Datatable bind:this={datatable} hidden={!rayon.jumlah_kk}>
        <thead>
          <tr style="border-bottom: 1px solid #c0c3ca">
            <th>No</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Status Nikah</th>
            <th>No HP</th>
            <th>Kategori Rumah</th>
            <th>Status Rumah</th>
          </tr>
        </thead>
        <tbody class="select-none">
          {#each rayon.kepala_keluarga as KK, index}
            <tr on:dblclick={() => router.push(`/admin/kk/${KK.id_kk}`)}>
              <td class="p-1 text-center">{index + 1}</td>
              <td class="p-1">{KK.nama}</td>
              <td class="p-1">{KK.alamat}</td>
              <td class="p-1 text-center">{KK.status_nikah}</td>
              <td class="p-1 text-center">{KK.no_hp}</td>
              <td class="p-1 text-center">{KK.kategori_rumah}</td>
              <td class="p-1 text-center">{KK.status_rumah}</td>
            </tr>
          {/each}
        </tbody>
      </Datatable>

      <Dialog bind:this={dialogPrint} style="max-width: 900px" class="simple-dialog">
        <h3 class="px-3 py-2 text-lg">Cetak Laporan Rayon {rayon.nama}</h3>
        <hr />
        <div class="flex flex-wrap gap-1 p-2">
          <Button on:click={() => openReport('list_kk')}>Daftar Kepala Keluarga</Button>
          <Button on:click={() => openReport('list_jemaat')}>Daftar Jemaat</Button>
          <Button on:click={() => openReport('list_jemaat_lansia')}>Daftar Jemaat Lansia</Button>
          <Button on:click={() => openReport('list_kaum_bapak')}>Daftar Kaum Bapak</Button>
          <Button on:click={() => openReport('list_kaum_ibu')}>Daftar Kaum Ibu</Button>
          <Button on:click={() => openReport('list_anak_par')}>Daftar Anak PAR</Button>
        </div>
      </Dialog>
    {/if}
  {/await}
</div>
