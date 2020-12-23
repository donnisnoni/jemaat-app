<script>
  import * as rayonStore from '/@store/rayon.js';
  import { onDestroy } from 'svelte';
  import AddRayonDialog from './AddRayonDialog.svelte';
  import Button from '/@components/Button.svelte';
  import moment from 'moment';
  import { fade, fly } from 'svelte/transition';
  import { linear } from 'svelte/easing';

  let addRayonDialog;
  let lastRayonSuccesCreated = null;

  let response = rayonStore.fetch();

  function openAddDialog() {
    addRayonDialog.open();
  }

  function refetchData() {
    rayonStore.deleteCache();
    rayonStore.cancel();
    response = rayonStore.fetch();
  }

  function onSuccessCreateRayon({ detail }) {
    lastRayonSuccesCreated = detail.dataRayon;
  }

  function showSuccessAlert() {
    window.alert('Berhasil menambahkan ' + lastRayonSuccesCreated.nama + ' sebagai rayon baru kita!');
  }

  onDestroy(() => {
    rayonStore.cancel('Component is destroyed');
  });
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

  <AddRayonDialog bind:this={addRayonDialog} on:success={onSuccessCreateRayon} on:closed={showSuccessAlert} />

  <div class="flex flex-col flex-1 overflow-y-auto">
    {#await response}
      <div class="flex justify-center flex-1 hidden-100">
        <div class="self-center text-lg text-gray-600 animate-pulse">Loading...</div>
      </div>
    {:then dataRayon}
      {#each dataRayon as rayon}
        <!-- transition:fly={{ duration: 200, easing: linear }} -->
        <div class="flex p-3 border-b cursor-pointer">
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
      {/each}
    {/await}
  </div>
</div>
