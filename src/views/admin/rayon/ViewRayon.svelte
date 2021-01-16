<script>
  import { fetch } from '/@store/fetch.service.js'
  // import * as router from 'svelte-spa-router'

  export let params = { id: 0 }

  let rayon

  const rayonResponse = fetch(`/api/data/rayon/${params.id}`).then((_rayon) => {
    rayon = _rayon
    return _rayon
  })
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="p-3 border-b">
    <h3 class="text-lg">Rayon {rayon && rayon.nama}</h3>
  </div>
  <div class="flex flex-col flex-1 p-3 overflow-y-auto">
    <!--  -->
    {#await rayonResponse}
      loading...
    {:then rayon}
      <div>Jumlah Keluarga: {rayon.jumlah_kk}</div>
      <div>Jumlah Jemaat: {rayon.jumlah_jemaat}</div>
      <div>Jumlah Jemaat Laki-laki: {rayon.jumlah_jemaat_l}</div>
      <div>Jumlah Jemaat Perempuan: {rayon.jumlah_jemaat_p}</div>
    {/await}
  </div>
</div>
