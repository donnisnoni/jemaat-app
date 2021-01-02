<script>
  import * as fetchService from '/@store/fetch.service.js'
  import { link } from 'svelte-spa-router'
  // import appConfig from '../../../../app.config.json'

  export let params

  let loading = true
  let currentRayon

  fetchService
    .fetch('/api/data/rayon')
    .then((rayons) => {
      currentRayon = rayons.find((rayon) => rayon.id_rayon == params.id)
    })
    .finally(() => {
      loading = false
    })

  $: resolved = !loading && currentRayon
</script>

<!-- <svelte:head>
  {#if resolved}
    <title>Rayon {currentRayon.nama} - {appConfig.app_name}</title>
  {/if}
</svelte:head> -->

<div class="flex flex-col min-h-full">
  {#if resolved}
    <h3 class="page-header">Rayon {currentRayon.nama}</h3>
  {:else}
    <div class="flex flex-col items-center justify-center w-full h-full p-3 text-gray-600 bg-white hidden-100 card">
      <div class="text-lg">Uh oh... Tidak bisa menemukan rayon 😟</div>
      <a class="link" href="/admin/rayon" use:link>Kembali ke halaman rayon</a>
    </div>
  {/if}
</div>
