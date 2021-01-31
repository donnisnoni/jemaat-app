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
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="flex flex-col flex-wrap p-3 bg-white border-b border-gray-200 md:flex-row">
    <div class="mb-2 md:place-self-center md:mb-0">
      <h3 class="text-lg">Rayon {rayon.nama}</h3>
    </div>
    <div class="w-full border border-t md:hidden" />
    <div class="flex gap-1 mt-2 ml-auto md:mt-0">
      <Button icon="printer" iconOnly on:click={dialogPrint.open} title="Cetak Laporan" />
    </div>
  </div>

  {#await $rayonResponse}
    <LoadingPlaceholder />
  {:then rayon}
    <div class="flex flex-col p-3 overflow-y-auto border-b" style="max-height:400px">
      <table class="table-fixed" style="max-width: 300px">
        <tr>
          <td class="max-w-max">Jumlah Keluarga</td>
          <td>:</td>
          <td>{rayon.jumlah_kk}</td>
        </tr>
        <tr>
          <td class="max-w-max">Jumlah Jemaat</td>
          <td>:</td>
          <td>{rayon.jumlah_jemaat} | L: {rayon.jumlah_jemaat_l} | P: {rayon.jumlah_jemaat_p}</td>
        </tr>
        <tr>
          <td class="max-w-max">Jumlah Jemaat yang sudah sidi</td>
          <td>:</td>
          <td>
            {rayon.jumlah_jemaat_sudah_sidi}
            | L:
            {rayon.jumlah_jemaat_sudah_sidi_l}
            | P:
            {rayon.jumlah_jemaat_sudah_sidi_p}
          </td>
        </tr>
        <tr>
          <td class="max-w-max">Jumlah Jemaat yang belum sidi</td>
          <td>:</td>
          <td>
            {rayon.jumlah_jemaat_belum_sidi}
            | L:
            {rayon.jumlah_jemaat_belum_sidi_l}
            | P:
            {rayon.jumlah_jemaat_belum_sidi_p}
          </td>
        </tr>
      </table>
    </div>
    {#if !rayon.jumlah_kk}
      <EmptyDataPlaceholder>Belum ada keluarga</EmptyDataPlaceholder>
    {/if}
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
  {/await}

  <Dialog bind:this={dialogPrint} style="max-width: 900px" visible class="simple-dialog">
    <h3 class="px-3 py-2 text-lg">Cetak Laporan Rayon {rayon.nama}</h3>
    <hr />
    <div class="flex flex-wrap gap-1 p-2">
      <Button on:click={openNewWindow(`/api/data/rayon/${rayon.id_rayon}/report?keyword=list_kk`)}>
        Daftar Kepala Keluarga
      </Button>
      <Button on:click={openNewWindow(`/api/data/rayon/${rayon.id_rayon}/report?keyword=list_jemaat`)}>
        Daftar Jemaat
      </Button>
      <Button>Daftar Anak PAR</Button>
      <Button>Daftar Lansia</Button>
      <Button>Daftar Kaum Bapak</Button>
      <Button>Daftar Kaum Ibu</Button>
    </div>
  </Dialog>
</div>
