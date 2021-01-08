<script>
  // import { current_component } from 'svelte/internal'
  import * as fetchService from '/@store/fetch.service.js'
  import { autoCapitalizeWords } from '/@actions/inputDirectives.js'
  import selectValues from '/@shared/selectValues.js'
  import { Datatable, rows } from 'svelte-simple-datatables'
  import Button from '/@components/Button.svelte'
  import DialogCreateAnggotaKK from './DialogCreateAnggotaKK.svelte'
  import http from '/@shared/http'
  import * as router from 'svelte-spa-router'
  // import { createEventDispatcher } from 'svelte'

  // const emit = createEventDispatcher()

  /* --------------------------- COMPONENT'S INSTANCE -------------------------- */
  /** @type {DialogCreateAnggotaKK} */
  let dialogCreateAnggotaKk
  /** @type {HTMLFormElement} */
  let form

  const settings = {
    sortable: true,
    pagination: true,
    scrollY: true,
    scrollX: true,
    rowPerPage: 10,
    columnFilter: false,
    blocks: {
      searchInput: false,
    },
  }

  const DataKKPrototype = {
    nama: '',
    alamat: '',
    no_hp: '',
    status_nikah: '',
    status_rumah: '',
    kategori_rumah: selectValues.kategoriRumah[0],
    id_rayon: 0,
    anggota_kk: [],
  }

  /** @type {typeof DataKKPrototype} */
  let dataKK = Object.create(DataKKPrototype)

  let rayonsResponse = fetchService.fetch('/api/data/rayon').then((data) => {
    dataKK.id_rayon = data[0]['id_rayon']
    return data
  })

  function openCreateAnggotaKKDialog() {
    dialogCreateAnggotaKk.open()
  }

  function resetForm() {
    form.reset()
    dataKK = { ...DataKKPrototype }
  }

  function doCreate() {
    // alert('Berhasil menambahkan KK!')
    console.log(dataKK)
    http
      .post('/api/data/kk', dataKK)
      .then(({ status }) => {
        // console.log(resp)
        if (status === 200) {
          resetForm()
          router.pop('/admin/kk')
        }
      })
      .catch((err) => {
        console.error(err)
      })
    // resetForm()
    // document.getElementById('nama-kk').focus()
  }
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="flex flex-col flex-wrap p-3 bg-white border-b border-gray-200 md:flex-row ">
    <div class="mb-2 md:place-self-center md:mb-0">
      <h3 class="text-lg">Kepala Keluarga</h3>
    </div>
    <div class="w-full border border-t md:hidden" />
    <div class="mt-2 ml-auto md:mt-0">
      <Button icon="notification-clear-all" on:click={resetForm} title="Reset" />
      <Button
        icon="account-multiple-plus-outline"
        on:click={openCreateAnggotaKKDialog}
        title="Tambah Anggota Keluarga" />
      <Button form="form-kepala-keluarga" icon="content-save-outline" primary title="Simpan" />
    </div>
  </div>

  <!-- FORM KEPALA KELUARGA -->
  <form
    bind:this={form}
    id="form-kepala-keluarga"
    class="relative flex flex-col p-2 overflow-y-auto border-b border-gray-200 md:flex-row"
    on:submit|preventDefault={doCreate}
    style="max-height:40%">
    <!--  -->
    <!--  -->
    <div class="flex flex-col flex-1 md:pr-2 md:mr-2 md:border-r md:w-6/12 md:overflow-y-auto">
      <!-- RAYON -->
      <section class="flex flex-col">
        <label for="rayon-kk">Rayon</label>
        <select
          bind:value={dataKK.id_rayon}
          class="p-1 border border-gray-200 rounded-sm bg-gray-50"
          id="rayon-kk"
          required>
          {#await rayonsResponse}
            <option default>Memuat Rayon...</option>
          {:then rayons}
            {#each rayons as rayon}
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
            bind:value={dataKK.nama}
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="nama-kk"
            required
            spellcheck="false"
            use:autoCapitalizeWords />
        </section>
        <!-- STATUS NIKAH -->
        <section class="flex flex-col">
          <label for="status-nikah-kk">Status Nikah</label>
          <select
            bind:value={dataKK.status_nikah}
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="status-nikah-kk"
            required>
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
          <input
            bind:value={dataKK.alamat}
            class="w-full p-1 border border-gray-200 rounded-sm bg-gray-50"
            spellcheck="false"
            required
            id="alamat-kk" />
        </section>
        <!-- STATUS RUMAH -->
        <section class="flex flex-col">
          <label for="status-rumah-kk">Status Rumah</label>
          <select
            bind:value={dataKK.status_rumah}
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="status-rumah-kk"
            required>
            {#each selectValues.statusRumah as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </section>
      </section>

      <section class="flex flex-wrap items-center">
        <section class="flex flex-col flex-1 my-2 mr-2" style="max-width: 300px">
          <label for="no-hp-kk">No HP</label>
          <input
            bind:value={dataKK.no_hp}
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="no-hp-kk"
            spellcheck="false"
            type="number"
            use:autoCapitalizeWords />
        </section>
        <!-- KATEGORI RUMAH -->
        <section class="flex flex-col mr-2">
          <label for="kategori-rumah-kk">Kategori Rumah</label>
          <select
            bind:value={dataKK.kategori_rumah}
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="kategori-rumah-kk"
            required>
            {#each selectValues.kategoriRumah as kategori}
              <option value={kategori}>{kategori}</option>
            {/each}
          </select>
        </section>
      </section>
    </div>
    <div class="justify-center hidden w-max md:flex" style="max-width:500px">
      <img alt="Gereja" class="rounded-md select-none" draggable="false" src="/img/login-bg.jpg" />
    </div>
  </form>

  <DialogCreateAnggotaKK bind:this={dialogCreateAnggotaKk} />

  <div class="flex flex-col flex-1">
    <Datatable {settings} data={dataKK.anggota_kk}>
      <thead>
        <th data-key="nama">Nama</th>
        <th data-key="jk">JK</th>
        <th data-key="tempat_lahir">Tempat Lahir</th>
        <th data-key="tanggal_lahir">Tanggal Lahir</th>
        <th data-key="status">Status</th>
        <th data-key="golongan_darah">Golongan Darah</th>
      </thead>
      <tbody>
        {#each $rows as row}
          <tr>
            <td>{row.id}</td>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
            <td>{row.email}</td>
            <td>{row.ip_address}</td>
          </tr>
        {/each}
      </tbody>
    </Datatable>
  </div>
</div>
