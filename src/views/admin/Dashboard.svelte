<script>
  // @ts-check
  import { fetch } from '/@store/fetch.service'
  import LoadingPlaceholder from '/@components/LoadingPlaceholder.svelte'

  const totalRayonResponse = fetch('/api/data/rayon').then((rayon) => {
    return rayon.length
  })
  const totalKKResponse = fetch('/api/data/kk').then((KK) => {
    return KK.length
  })

  const totalJemaatResponse = fetch('/api/data/anggota_kk?count=true').then((count) => {
    return count
  })
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="p-3 border-b">
    <h3 class="text-lg">Dashboard</h3>
  </div>
  <div class="flex flex-col flex-1 p-3 overflow-y-auto">
    <div class="flex flex-col flex-shrink gap-2 md:flex-row">
      <!-- TOTAL RAYON -->
      <div class="flex flex-col items-center flex-1 p-3 border rounded-md bg-gray-50">
        {#await totalRayonResponse}
          <LoadingPlaceholder />
        {:then jumlahRayon}
          <div class="text-3xl hidden-100">{jumlahRayon}</div>
          <div class="text-sm">Rayon</div>
        {/await}
      </div>
      <!-- TOTAL KK -->
      <div class="flex flex-col items-center flex-1 p-3 border rounded-md bg-gray-50">
        {#await totalKKResponse}
          <LoadingPlaceholder />
        {:then jumlahKK}
          <div class="text-3xl hidden-100">{jumlahKK}</div>
          <div class="text-sm">Keluarga</div>
        {/await}
      </div>
      <!-- TOTAL JEMAAT -->
      <div class="flex flex-col items-center flex-1 p-3 border rounded-md bg-gray-50">
        {#await totalJemaatResponse}
          <LoadingPlaceholder />
        {:then jumlahJemaat}
          <div class="text-3xl hidden-100">{jumlahJemaat}</div>
          <div class="text-sm">Jemaat</div>
        {/await}
      </div>
    </div>
  </div>
</div>
