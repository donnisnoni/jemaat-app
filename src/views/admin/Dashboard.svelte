<script>
  // @ts-check
  import { fetch } from '/@store/fetch.service'

  const totalRayonResponse = fetch('/api/data/rayon').then((rayon) => {
    return rayon.length
  })
  const totalKKResponse = fetch('/api/data/kk').then((KK) => {
    return KK.length
  })

  const totalJemaatResponse = Promise.resolve(90)
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="p-3 border-b">
    <h3 class="text-lg">Dashboard</h3>
  </div>
  <div class="flex flex-col flex-1 p-3 overflow-y-auto">
    <div class="flex flex-col flex-shrink gap-2 md:flex-row">
      <!-- TOTAL RAYON -->
      <div class="flex flex-col items-center flex-1 p-3 border rounded-md bg-gray-50">
        <div class="text-6xl">
          {#await totalRayonResponse}0{:then jumlahRayon}{jumlahRayon}{/await}
        </div>
        <div class="text-lg">Rayon</div>
      </div>
      <!-- TOTAL KK -->
      <div class="flex flex-col items-center flex-1 p-3 border rounded-md bg-gray-50">
        <div class="text-6xl">
          {#await totalKKResponse}0{:then jumlahKK}{jumlahKK}{/await}
        </div>
        <div class="text-lg">Kepala Keluarga</div>
      </div>
      <!-- TOTAL JEMAAT -->
      <div class="flex flex-col items-center flex-1 p-3 border rounded-md bg-gray-50">
        <div class="text-6xl">
          {#await totalJemaatResponse}0{:then jumlahJemaat}{jumlahJemaat}{/await}
        </div>
        <div class="text-lg">Jemaat</div>
      </div>
    </div>
  </div>
</div>
