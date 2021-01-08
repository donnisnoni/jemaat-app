<script>
  import { autoCapitalizeWords } from '/@actions/inputDirectives.js'
  import selectValues from '/@shared/selectValues.js'
  import Dialog from '/@components/Dialog.svelte'
  import Button from '/@components/Button.svelte'
  import deepEqual from 'deep-equal'

  window.deepEqual = deepEqual

  /** @type {Dialog} */
  let dialog

  const dataPrototype = {
    nama: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jk: 'L',
    status: selectValues.statusAnggotaKK[0],
    golongan_darah: 'O',
    pendidikan: selectValues.pendidikan[0],
    kedudukan_di_jemaat: selectValues.kedudukanDiJemaat[0],
    jaminan_kesehatan: selectValues.jaminanKesehatan[0],
    pekerjaan: selectValues.pekerjaan[0],
    penghasilan: selectValues.penghasilan[0],
    sudah_baptis: false,
    tanggal_baptis: '',
    tempat_baptis: '',
    nama_pelayan_baptis: '',
    sudah_sidi: false,
    tanggal_sidi: '',
    tempat_sidi: '',
    nama_pelayan_sidi: '',
    sudah_nikah: false,
    tanggal_nikah: '',
    tempat_nikah: '',
    nama_pelayan_nikah: '',
  }

  /** @type {typeof dataPrototype} */
  const data = { ...dataPrototype }

  export function open() {
    dialog.open()
  }

  export function cancel() {
    dialog.close(true)
  }

  let isDirty = false

  function checkIsFormDirty() {
    isDirty = deepEqual(data, dataPrototype)
  }
</script>

<Dialog bind:this={dialog} full visible persistent={isDirty}>
  <h3 class="p-2 py-2 text-lg border-b">Tambah Anggota Kepala Keluarga</h3>
  <form
    class="relative flex flex-col flex-1 max-h-full px-2 overflow-y-auto sm:px-4 md:px-6"
    id="create-anggota-kk"
    on:input={checkIsFormDirty}>
    <!-- NAMA -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="nama-anggota-kk">Nama Lengkap</label>
      <input
        autocomplete="off"
        bind:value={data.nama}
        class="p-1 border border-gray-200 rounded-sm bg-gray-50"
        id="nama-anggota-kk"
        required
        spellcheck="false"
        use:autoCapitalizeWords />
    </section>

    <!-- JENIS KELAMIN -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="jk-anggota-kk">Jenis Kelamin</label>
      <section class="py-2">
        <label class="mr-2">
          <!--  -->
          <input bind:group={data.jk} type="radio" value="L" />
          Laki-laki
        </label>
        <label>
          <!--  -->
          <input bind:group={data.jk} type="radio" value="P" />
          Perempuan
        </label>
      </section>
    </section>

    <!-- STATUS DALAM KELUARGA -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="status-dalam-anggota-kk">Status dalam Keluarga</label>
      <select
        bind:value={data.status}
        class="p-1 border border-gray-200 rounded-sm bg-gray-50"
        id="status-dalam-anggota-kk"
        required>
        {#each selectValues.statusAnggotaKK as status}
          <option value={status}>{status}</option>
        {/each}
      </select>
    </section>

    <!-- TEMPAT TANGGAL LAHIR -->
    <section class="flex flex-wrap w-full max-w-600">
      <!-- TEMPAT LAHIR -->
      <section class="flex flex-col my-2 mr-2">
        <label for="tempat-lahir-anggota-kk">Tempat Lahir</label>
        <input
          bind:value={data.tempat_lahir}
          class="p-1 border border-gray-200 rounded-sm bg-gray-50"
          id="tempat-lahir-anggota-kk"
          required />
      </section>
      <!-- TANGGAL LAHIR -->
      <section class="flex flex-col my-2 max-w-600">
        <label for="tanggal-lahir-anggota-kk">Tanggal Lahir</label>
        <input
          bind:value={data.tanggal_lahir}
          class="p-1 border border-gray-200 rounded-sm bg-gray-50"
          id="tanggal-lahir-anggota-kk"
          type="date"
          required />
      </section>
    </section>

    <!-- GOLONGAN DARAH -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="status-anggota-kk">Golongan Darah</label>
      <select class="p-1 border border-gray-200 rounded-sm bg-gray-50" id="status-anggota-kk" required>
        {#each selectValues.golonganDarah as golonganDarah}
          <option value={golonganDarah}>{golonganDarah}</option>
        {/each}
      </select>
    </section>

    <!-- KEDUDUKAN DI JEMAAT -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="status-anggota-kk">Status dalam Jemaat</label>
      <select
        bind:value={data.golongan_darah}
        class="p-1 border border-gray-200 rounded-sm bg-gray-50"
        id="status-anggota-kk"
        required>
        {#each selectValues.kedudukanDiJemaat as kedudukanDiJemaat}
          <option value={kedudukanDiJemaat}>{kedudukanDiJemaat}</option>
        {/each}
      </select>
    </section>

    <section class="flex items-center my-2 max-w-600">
      <label for="is-baptis-anggota-kk">Sudah Baptis</label>
      <input
        class="ml-2"
        style="width:15px;height:15px"
        id="is-baptis-anggota-kk"
        bind:checked={data.sudah_baptis}
        type="checkbox" />
    </section>

    {#if data.sudah_baptis}
      <section class="flex flex-wrap">
        <!-- TANGGAL BAPTIS -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tanggal-baptis-anggota-kk">Tanggal Baptis</label>
          <input
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="tanggal-baptis-anggota-kk"
            type="date"
            required={data.sudah_baptis} />
        </section>
        <!-- TEMPAT BAPTIS -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tempat-baptis-anggota-kk">Tempat Baptis</label>
          <input
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="tempat-baptis-anggota-kk"
            required={data.sudah_baptis} />
        </section>
        <!-- PELAYAN BAPTIS -->
        <section class="flex flex-col my-2 max-w-600">
          <label for="pelayan-baptis-anggota-kk">Nama Pelayan Baptis</label>
          <input
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="pelayan-baptis-anggota-kk"
            required={data.sudah_baptis} />
        </section>
      </section>
    {/if}

    <section class="flex items-center my-2 max-w-600">
      <label for="is-sidi-anggota-kk">Sudah Sidi</label>
      <input
        class="ml-2"
        style="width:15px;height:15px"
        id="is-sidi-anggota-kk"
        bind:checked={data.sudah_sidi}
        type="checkbox" />
    </section>

    {#if data.sudah_sidi}
      <section class="flex flex-wrap">
        <!-- TANGGAL SIDI -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tanggal-sidi-anggota-kk">Tanggal Sidi</label>
          <input
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="tanggal-sidi-anggota-kk"
            type="date"
            required={data.sudah_sidi} />
        </section>
        <!-- TEMPAT SIDI -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tempat-sidi-anggota-kk">Tempat Sidi</label>
          <input
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="tempat-sidi-anggota-kk"
            required={data.sudah_sidi} />
        </section>
        <!-- PELAYAN SIDI -->
        <section class="flex flex-col my-2 max-w-600">
          <label for="pelayan-sidi-anggota-kk">Nama Pelayan Sidi</label>
          <input
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="pelayan-sidi-anggota-kk"
            required={data.sudah_sidi} />
        </section>
      </section>
    {/if}

    <section class="flex items-center my-2 max-w-600">
      <label for="is-sidi-anggota-kk">Sudah Nikah</label>
      <input
        class="ml-2"
        style="width:15px;height:15px"
        id="is-sidi-anggota-kk"
        bind:checked={data.sudah_nikah}
        type="checkbox" />
    </section>

    {#if data.sudah_nikah}
      <section class="flex flex-wrap">
        <!-- TANGGAL NIKAH -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tanggal-nikah-anggota-kk">Tanggal Nikah</label>
          <input
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="tanggal-nikah-anggota-kk"
            type="date"
            required={data.sudah_nikah} />
        </section>
        <!-- TEMPAT NIKAH -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tempat-nikah-anggota-kk">Tempat Nikah</label>
          <input
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="tempat-nikah-anggota-kk"
            required={data.sudah_nikah} />
        </section>
        <!-- PELAYAN NIKAH -->
        <section class="flex flex-col my-2 max-w-600">
          <label for="pelayan-sidi-anggota-kk">Nama Pelayan Nikah</label>
          <input
            class="p-1 border border-gray-200 rounded-sm bg-gray-50"
            id="pelayan-sidi-anggota-kk"
            required={data.sudah_nikah} />
        </section>
      </section>
    {/if}

    <!-- PENDIDIKAN TERAKHIR -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="pendidikan-anggota-kk">Pendidikan</label>
      <select class="p-1 border border-gray-200 rounded-sm bg-gray-50" id="pendidikan-anggota-kk" required>
        {#each selectValues.pendidikan as pendidikan}
          <option value={pendidikan}>{pendidikan}</option>
        {/each}
      </select>
    </section>

    <!-- PEKERJAAN -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="status-anggota-kk">Pekerjaan</label>
      <select class="p-1 border border-gray-200 rounded-sm bg-gray-50" id="status-anggota-kk" required>
        {#each selectValues.pekerjaan as pekerjaan}
          <option value={pekerjaan}>{pekerjaan}</option>
        {/each}
      </select>
    </section>

    <!-- PENGHASILAN -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="jaminan-kesehatan-anggota-kk">Penghasilan</label>
      <select class="p-1 border border-gray-200 rounded-sm bg-gray-50" id="jaminan-kesehatan-anggota-kk" required>
        {#each selectValues.penghasilan as penghasilan}
          <option value={penghasilan}>{penghasilan}</option>
        {/each}
      </select>
    </section>

    <!-- JAMINAN KESEHATAN -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="jaminan-kesehatan-anggota-kk">Jaminan Kesehatan</label>
      <select class="p-1 border border-gray-200 rounded-sm bg-gray-50" id="jaminan-kesehatan-anggota-kk" required>
        {#each selectValues.jaminanKesehatan as jaminanKesehatan}
          <option value={jaminanKesehatan}>{jaminanKesehatan}</option>
        {/each}
      </select>
    </section>

    <!-- KETERANGAN -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="status-anggota-kk">Keterangan</label>
      <select class="p-1 border border-gray-200 rounded-sm bg-gray-50" id="status-anggota-kk" required>
        {#each selectValues.keterangan as keterangan}
          <option value={keterangan}>{keterangan}</option>
        {/each}
      </select>
    </section>
  </form>

  <div class="flex p-2 border-t">
    <Button icon="close" on:click={() => dialog.close(true)}>{isDirty ? 'Batal' : 'Tutup'}</Button>
    <div class="ml-auto">
      <Button icon="plus" primary>Tambah</Button>
    </div>
  </div>
</Dialog>
