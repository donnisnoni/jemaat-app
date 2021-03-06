<script>
  import * as fetchService from '/@store/fetch.service.js'
  import { autoCapitalizeWords, numberPhone } from '/@actions/inputDirectives.js'
  import selectValues from '/@shared/selectValues.js'
  import moment from 'moment'
  import Datatable from '/@components/Datatable.svelte'
  import Button from '/@components/Button.svelte'
  import MenuEditDelete from '/@components/MenuEditDelete.svelte'
  import EmptyDataPlaceholder from '/@components/EmptyDataPlaceholder.svelte'
  import DialogAnggotaKK from './DialogAnggotaKK.svelte'
  import DialogDeleteAnggota from './DialogDeleteAnggota.svelte'
  import http from '/@shared/http'
  import * as router from 'svelte-spa-router'
  import { onMount } from 'svelte'
  import LoadingPlaceholder from '/@components/LoadingPlaceholder.svelte'
  // import deepEqual from 'deep-equal'

  export let params = {}

  /* --------------------------- COMPONENT'S INSTANCE -------------------------- */
  /** @type {DialogAnggotaKK} */
  let dialogAnggotaKk
  /** @type {HTMLFormElement} */
  let form
  /** @type {Datatable} */
  let datatable
  /** @type {MenuEditDelete} */
  let menuEditDelete
  /** @type {DialogDeleteAnggota} */
  let dialogDeleteAnggota

  /* --------------------------------- STATE'S -------------------------------- */
  let isUpdate = false
  let loading = {
    load: false,
    updateOrCreate: false,
  }
  let indexToActionWith = 0

  let KKPrototype = {
    nama: '',
    alamat: '',
    no_hp: '',
    status_nikah: selectValues.statusNikah[0],
    status_rumah: selectValues.statusRumah[0],
    kategori_rumah: selectValues.kategoriRumah[0],
    id_rayon: 0,
    anggota_kk: [],
  }

  /** @type {typeof KKPrototype} */
  let KK = { ...KKPrototype }

  let rayonsResponse = fetchService.fetch('rayon', ({ rows }) => (KK.id_rayon = rows[0]['id_rayon']))

  onMount(() => {
    isUpdate = !!params.id
    if (isUpdate) {
      loading.load = true
      http
        .get(`kk/${params.id}`)
        .then(({ data }) => {
          KKPrototype = { ...data }
          KK = { ...KKPrototype }
          datatable.updateTableRows()
        })
        .finally(() => (loading.load = false))
    }
  })

  function resetDataAndForm() {
    form.reset()
    KK = { ...KKPrototype }
  }

  function post() {
    const OK = ({ status }) => {
      if (status === 200) {
        resetDataAndForm()
        router.push('/admin/kk')
      }
    }
    const done = () => (loading.updateOrCreate = false)
    loading.updateOrCreate = true
    if (!isUpdate) {
      http.post('kk', KK).then(OK).finally(done)
    } else {
      http.put(`kk/${KK.id_kk}`, KK).then(OK).finally(done)
    }
  }

  function onAnggotaKKPost({ detail }) {
    if (detail.isUpdate) {
      KK.anggota_kk[detail.indexToUpdate] = detail.anggotaKK
    } else {
      KK.anggota_kk = [...KK.anggota_kk, detail.anggotaKK]
    }
    datatable.updateTableRows()
  }

  function openContextMenu(event, index) {
    menuEditDelete.open(event)
    indexToActionWith = index
  }

  function openDialogAnggotaKK(index) {
    dialogAnggotaKk.open(KK.anggota_kk[index], index)
  }

  function deleteAnggotaKK() {
    const anggotaKKCopy = [...KK.anggota_kk]
    anggotaKKCopy.splice(indexToActionWith, 1)
    KK.anggota_kk = anggotaKKCopy
  }

  const sudahBelum = (value) => (!!value ? 'Sudah' : 'Belum')
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="flex flex-col flex-wrap p-3 bg-white border-b border-gray-200 md:flex-row ">
    <div class="mb-2 md:place-self-center md:mb-0">
      <h3 class="text-lg">Keluarga {KKPrototype.nama}</h3>
    </div>
    <div class="w-full border border-t md:hidden" />
    <div class="mt-2 ml-auto md:mt-0">
      <Button icon="notification-clear-all" iconOnly on:click={resetDataAndForm} title="Reset" />
      <Button
        icon="account-multiple-plus-outline"
        iconOnly
        on:click={dialogAnggotaKk.open}
        title="Tambah Anggota Keluarga" />
      <Button
        form="form-kepala-keluarga"
        icon={isUpdate ? 'content-save-outline' : 'plus'}
        loading={loading.updateOrCreate}
        iconOnly
        primary
        title={isUpdate ? 'Simpan' : 'Tambah Keluarga'} />
    </div>
  </div>

  {#if isUpdate && loading.load}
    <LoadingPlaceholder />
  {/if}

  <!-- FORM KEPALA KELUARGA -->
  <form
    bind:this={form}
    id="form-kepala-keluarga"
    class:hidden={isUpdate && loading.load}
    class="relative flex flex-col p-2 overflow-y-auto border-b md:flex-row"
    on:submit|preventDefault={post}
    style="max-height:40%">
    <!--  -->
    <div class="flex flex-col flex-1 md:pr-2 md:mr-2 md:border-r md:w-6/12 md:overflow-y-auto">
      <!-- RAYON -->
      <section class="flex flex-col">
        <label for="rayon-kk">Rayon</label>
        <select bind:value={KK.id_rayon} class="field" id="rayon-kk" required>
          {#await $rayonsResponse}
            <option default>Memuat Rayon...</option>
          {:then { rows }}
            {#each rows as rayon}
              <option value={rayon.id_rayon}>{rayon.nama}</option>
            {/each}
          {/await}
        </select>
      </section>

      <section class="flex flex-wrap items-center">
        <!-- NAMA -->
        <section class="flex flex-col flex-1 w-full my-2 md:mr-2" style="max-width: 300px">
          <label for="nama-kk">Nama KK</label>
          <!-- svelte-ignore a11y-autofocus -->
          <input
            autocomplete="off"
            autofocus
            bind:value={KK.nama}
            class="field"
            id="nama-kk"
            required
            spellcheck="false"
            use:autoCapitalizeWords />
        </section>
        <!-- STATUS NIKAH -->
        <section class="flex flex-col">
          <label for="status-nikah-kk">Status Nikah</label>
          <select bind:value={KK.status_nikah} class="field" id="status-nikah-kk" required>
            {#each selectValues.statusNikah as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </section>
      </section>

      <section class="flex flex-wrap items-center">
        <!-- ALAMAT -->
        <section class="flex flex-col flex-1 my-2 mr-2" style="max-width: 300px">
          <label for="alamat-kk">Alamat</label>
          <input bind:value={KK.alamat} class="field" spellcheck="false" required id="alamat-kk" />
        </section>
        <!-- STATUS RUMAH -->
        <section class="flex flex-col">
          <label for="status-rumah-kk">Status Rumah</label>
          <select bind:value={KK.status_rumah} class="field" id="status-rumah-kk" required>
            {#each selectValues.statusRumah as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </section>
      </section>

      <section class="flex flex-wrap items-center">
        <section class="flex flex-col flex-1 my-2 mr-2" style="max-width: 300px">
          <label for="no-hp-kk">No HP</label>
          <input autocomplete="off" bind:value={KK.no_hp} class="field" id="no-hp-kk" type="tel" use:numberPhone />
        </section>
        <!-- KATEGORI RUMAH -->
        <section class="flex flex-col mr-2">
          <label for="kategori-rumah-kk">Kategori Rumah</label>
          <select bind:value={KK.kategori_rumah} class="field" id="kategori-rumah-kk" required>
            {#each selectValues.kategoriRumah as kategori}
              <option value={kategori}>{kategori}</option>
            {/each}
          </select>
        </section>
      </section>
    </div>
    <div class="justify-center hidden w-max md:flex" style="max-width:500px">
      <img alt="Gereja" class="w-full rounded-md select-none" draggable="false" src="/img/login-bg.jpg" />
    </div>
  </form>

  <Datatable bind:this={datatable} hidden={!KK.anggota_kk.length}>
    <thead>
      <tr class="border-b">
        <th>No</th>
        <th>Nama</th>
        <th>L/P</th>
        <th>Status dalam Keluarga</th>
        <th>TTL</th>
        <th>Gol Darah</th>
        <th>Status dalam Jemaat</th>
        <th>Status Baptis</th>
        <th>Status Sidi</th>
        <th>Status Nikah</th>
        <th>Pendidikan</th>
        <th>Pekerjaan</th>
        <th>Penghasilan</th>
        <th>Jaminan Kesehatan</th>
        <th>Keterangan</th>
      </tr>
    </thead>
    <tbody class="select-none">
      {#each KK.anggota_kk as anggota_kk, index}
        <tr
          on:dblclick={() => openDialogAnggotaKK(index)}
          on:contextmenu|preventDefault={(e) => openContextMenu(e, index)}>
          <td class="p-1 text-center">{index + 1}</td>
          <td class="p-1">{anggota_kk.nama}</td>
          <td class="p-1 text-center">{anggota_kk.jk}</td>
          <td class="p-1 text-center">{anggota_kk.status}</td>
          <td class="p-1">{anggota_kk.tempat_lahir + ', ' + moment(anggota_kk.tanggal_lahir).format('D MMMM YYYY')}</td>
          <td class="p-1 text-center">{anggota_kk.golongan_darah}</td>
          <td class="p-1 text-center">{anggota_kk.kedudukan_di_jemaat}</td>
          <td class="p-1 text-center">{sudahBelum(anggota_kk.sudah_baptis)}</td>
          <td class="p-1 text-center">{sudahBelum(anggota_kk.sudah_sidi)}</td>
          <td class="p-1 text-center">{sudahBelum(anggota_kk.sudah_nikah)}</td>
          <td class="p-1 text-center">{anggota_kk.pendidikan}</td>
          <td class="p-1 text-center">{anggota_kk.pekerjaan}</td>
          <td class="p-1 text-center">{anggota_kk.penghasilan}</td>
          <td class="p-1 text-center">{anggota_kk.jaminan_kesehatan}</td>
          <td class="p-1 text-center">{anggota_kk.keterangan}</td>
        </tr>
      {/each}
    </tbody>
  </Datatable>

  {#if !isUpdate && !KK.anggota_kk.length}
    <EmptyDataPlaceholder>Belum ada anggota keluarga</EmptyDataPlaceholder>
  {/if}

  <DialogAnggotaKK bind:this={dialogAnggotaKk} on:success={onAnggotaKKPost} />

  <MenuEditDelete
    bind:this={menuEditDelete}
    on:delete-clicked={() => dialogDeleteAnggota.open(KK.anggota_kk[indexToActionWith].nama)}
    on:edit-clicked={() => openDialogAnggotaKK(indexToActionWith)} />

  <DialogDeleteAnggota bind:this={dialogDeleteAnggota} on:yes={deleteAnggotaKK} />
</div>
