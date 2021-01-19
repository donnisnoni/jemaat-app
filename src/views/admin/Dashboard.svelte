<script>
  import { fetch } from '/@store/fetch.service'
  import LoadingPlaceholder from '/@components/LoadingPlaceholder.svelte'

  const totalRayonResponse = fetch('rayon')
  const totalKKResponse = fetch('kk')

  const totalJemaatResponse = fetch('anggota_kk?metadata=true&fields=jumlah_jemaat')
  const totalJemaatLResponse = fetch('anggota_kk?metadata=true&fields=jumlah_jemaat_l')
  const totalJemaatPResponse = fetch('anggota_kk?metadata=true&fields=jumlah_jemaat_p')
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="p-3 border-b">
    <h3 class="text-lg">Dashboard</h3>
  </div>
  <div class="flex flex-col flex-1 p-3 overflow-y-auto">
    <div class="flex flex-col gap-2 md:flex-row">
      <div class="flex items-center justify-around p-3 border rounded-md bg-gray-50" style="min-width: 200px">
        <img draggable="false" width="82px" src="/img/village.svg" alt="" />
        {#await $totalRayonResponse}
          <LoadingPlaceholder />
        {:then jumlah_rayon}
          <div class="mx-auto text-3xl">
            <div class="flex flex-col items-center mx-auto">
              <div class="text-sm">Rayon</div>
              {jumlah_rayon.length}
            </div>
          </div>
        {/await}
      </div>
      <!-- TOTAL KK -->
      <div class="flex items-center justify-around p-3 border rounded-md bg-gray-50" style="min-width: 200px">
        <img draggable="false" width="70px" src="/img/family.svg" alt="" />
        {#await $totalKKResponse}
          <LoadingPlaceholder />
        {:then jumlah_kk}
          <div class="mx-auto text-3xl">
            <div class="flex flex-col items-center mx-auto">
              <div class="text-sm">Keluarga</div>
              {jumlah_kk.length}
            </div>
          </div>
        {/await}
      </div>
      <!-- TOTAL JEMAAT -->
      <div class="flex items-center justify-around p-3 border rounded-md bg-gray-50" style="min-width: 200px">
        <img draggable="false" width="82px" src="/img/peoples.svg" alt="" />
        {#await $totalJemaatResponse}
          <LoadingPlaceholder />
        {:then jemaatMetadata}
          <div class="mx-auto text-3xl">
            <div class="flex flex-col items-center mx-auto">
              <div class="text-sm">Jemaat</div>
              {jemaatMetadata.jumlah_jemaat}
            </div>
          </div>
        {/await}
      </div>
      <!-- TOTAL JEMAAT L -->
      <div class="flex items-center justify-around p-3 border rounded-md bg-gray-50" style="min-width: 200px">
        <img draggable="false" width="70px" src="/img/man.svg" alt="" />
        {#await $totalJemaatLResponse}
          <LoadingPlaceholder />
        {:then jemaatMetadata}
          <div class="mx-auto text-3xl">
            <div class="flex flex-col items-center mx-auto">
              <div class="text-sm">Jemaat Laki-laki</div>
              {jemaatMetadata.jumlah_jemaat_l}
            </div>
          </div>
        {/await}
      </div>
      <!-- TOTAL JEMAAT P -->
      <div class="flex items-center justify-around p-3 border rounded-md bg-gray-50" style="min-width: 200px">
        <img draggable="false" width="72px" src="/img/woman.svg" alt="" />
        {#await $totalJemaatPResponse}
          <LoadingPlaceholder />
        {:then jemaatMetadata}
          <div class="mx-auto text-3xl">
            <div class="flex flex-col items-center mx-auto">
              <div class="text-sm">Jemaat Perempuan</div>
              {jemaatMetadata.jumlah_jemaat_p}
            </div>
          </div>
        {/await}
      </div>
    </div>
  </div>
</div>
