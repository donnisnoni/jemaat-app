<script>
  import { autoCapitalizeWords } from '/@actions/inputDirectives.js'
  import selectValues from '/@shared/selectValues.js'
  import Dialog from '/@components/Dialog.svelte'
  import Button from '/@components/Button.svelte'
  import { createEventDispatcher } from 'svelte'

  /** @type {Dialog} */
  let dialog
  /** @type {HTMLFormElement} */
  let form
  let isUpdate = false
  let indexToUpdate = 0

  const emit = createEventDispatcher()

  const AnggotaKKPrototype = {
    nama: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jk: 'L',
    status: selectValues.statusAnggotaKK[0],
    golongan_darah: selectValues.golonganDarah[0],
    pendidikan: selectValues.pendidikan[0],
    kedudukan_di_jemaat: selectValues.kedudukanDiJemaat[0],
    jaminan_kesehatan: selectValues.jaminanKesehatan[0],
    pekerjaan: selectValues.pekerjaan[0],
    penghasilan: selectValues.penghasilan[0],
    sudah_baptis: false,
    tanggal_baptis: null,
    tempat_baptis: null,
    nama_pelayan_baptis: null,
    sudah_sidi: false,
    tanggal_sidi: null,
    tempat_sidi: null,
    nama_pelayan_sidi: null,
    sudah_nikah: false,
    tanggal_nikah: null,
    tempat_nikah: null,
    nama_pelayan_nikah: null,
    keterangan: selectValues.keterangan[0],
  }

  /** @type {typeof AnggotaKKPrototype} */
  let anggotaKK = { ...AnggotaKKPrototype }

  /** @param {typeof AnggotaKKPrototype} anggotaKKToUpdate
   * @param {number} index
   */
  export function open(anggotaKKToUpdate, index) {
    // debugger
    const isEvent = anggotaKKToUpdate instanceof Event
    if (!isEvent && !!anggotaKKToUpdate) {
      anggotaKK = { ...anggotaKKToUpdate }
      isUpdate = true
      indexToUpdate = index
    } else {
      isUpdate = false
    }
    dialog.open()
  }

  export function cancel() {
    if (isUpdate || confirm('Anda yakin ingin menutup formulir ini? Data yang terisi akan hilang!')) {
      dialog.close(true)
      resetFormAndData()
    }
  }

  function resetFormAndData() {
    form.reset()
    anggotaKK = { ...AnggotaKKPrototype }
  }

  function getFormatedData() {
    const anggotaKKCopy = { ...anggotaKK }
    // If falsy, set all data to null
    if (!anggotaKKCopy.sudah_baptis) {
      anggotaKKCopy.tanggal_baptis = null
      anggotaKKCopy.tempat_baptis = null
      anggotaKKCopy.nama_pelayan_baptis = null
    }
    if (!anggotaKKCopy.sudah_sidi) {
      anggotaKKCopy.tanggal_sidi = null
      anggotaKKCopy.tempat_sidi = null
      anggotaKKCopy.nama_pelayan_sidi = null
    }
    if (!anggotaKKCopy.sudah_nikah) {
      anggotaKKCopy.tanggal_nikah = null
      anggotaKKCopy.tempat_nikah = null
      anggotaKKCopy.nama_pelayan_nikah = null
    }
    // Convert boolean to integer
    anggotaKKCopy.sudah_baptis = +anggotaKKCopy.sudah_baptis
    anggotaKKCopy.sudah_sidi = +anggotaKKCopy.sudah_sidi
    anggotaKKCopy.sudah_nikah = +anggotaKKCopy.sudah_nikah
    return anggotaKKCopy
  }

  function post() {
    if (
      isUpdate &&
      !confirm(
        'Apakah kamu yakin ingin mengubah data anggota keluarga ini? Data yang sudah diubah tidak bisa dikembalikan'
      )
    ) {
      return
    }
    const formattedAnggotaKK = getFormatedData()
    emit('success', {
      anggotaKK: formattedAnggotaKK,
      isUpdate,
      indexToUpdate,
    })
    resetFormAndData()
    dialog.close(true)
  }
</script>

<Dialog bind:this={dialog} full persistent>
  <h3 class="p-2 py-2 text-lg border-b">{isUpdate ? 'Ubah' : 'Tambah'} Anggota Keluarga</h3>
  <form
    bind:this={form}
    class="relative flex flex-col flex-1 max-h-full px-2 overflow-y-auto sm:px-4 md:px-6"
    id="create-anggota-kk"
    on:submit|preventDefault={post}>
    <!-- NAMA -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="nama-anggota-kk">Nama Lengkap</label>
      <input
        autocomplete="off"
        bind:value={anggotaKK.nama}
        class="field"
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
          <input bind:group={anggotaKK.jk} type="radio" value="L" />
          Laki-laki
        </label>
        <label>
          <!--  -->
          <input bind:group={anggotaKK.jk} type="radio" value="P" />
          Perempuan
        </label>
      </section>
    </section>

    <!-- STATUS DALAM KELUARGA -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="status-dalam-anggota-kk">Status dalam Keluarga</label>
      <select bind:value={anggotaKK.status} class="field" id="status-dalam-anggota-kk" required>
        {#each selectValues.statusAnggotaKK as status}
          <option value={status}>{status}</option>
        {/each}
      </select>
    </section>

    <!-- TEMPAT TANGGAL LAHIR -->
    <section class="flex flex-wrap w-full max-w-600">
      <!-- TEMPAT LAHIR -->
      <section class="flex flex-col flex-1 my-2 mr-2">
        <label for="tempat-lahir-anggota-kk">Tempat Lahir</label>
        <input bind:value={anggotaKK.tempat_lahir} class="field" id="tempat-lahir-anggota-kk" required />
      </section>
      <!-- TANGGAL LAHIR -->
      <section class="flex flex-col my-2 max-w-600">
        <label for="tanggal-lahir-anggota-kk">Tanggal Lahir</label>
        <input bind:value={anggotaKK.tanggal_lahir} class="field" id="tanggal-lahir-anggota-kk" type="date" required />
      </section>
    </section>

    <!-- GOLONGAN DARAH -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="golongan-darah-anggota-kk">Golongan Darah</label>
      <select bind:value={anggotaKK.golongan_darah} class="field" id="golongan-darah-anggota-kk" required>
        {#each selectValues.golonganDarah as golonganDarah}
          <option value={golonganDarah}>{golonganDarah}</option>
        {/each}
      </select>
    </section>

    <!-- KEDUDUKAN DI JEMAAT -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="kedudukan-di-jemaat-anggota-kk">Status dalam Jemaat</label>
      <select bind:value={anggotaKK.kedudukan_di_jemaat} class="field" id="kedudukan-di-jemaat-anggota-kk" required>
        {#each selectValues.kedudukanDiJemaat as kedudukanDiJemaat}
          <option value={kedudukanDiJemaat}>{kedudukanDiJemaat}</option>
        {/each}
      </select>
    </section>

    <section class="flex items-center my-2 max-w-600">
      <label for="is-baptis-anggota-kk">Sudah Baptis</label>
      <input
        bind:checked={anggotaKK.sudah_baptis}
        class="ml-2"
        style="width:15px;height:15px"
        id="is-baptis-anggota-kk"
        type="checkbox" />
    </section>

    {#if anggotaKK.sudah_baptis}
      <section class="flex flex-wrap">
        <!-- TANGGAL BAPTIS -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tanggal-baptis-anggota-kk">Tanggal Baptis</label>
          <input bind:value={anggotaKK.tanggal_baptis} class="field" id="tanggal-baptis-anggota-kk" type="date" />
          <!-- required={anggotaKK.sudah_baptis} -->
        </section>
        <!-- TEMPAT BAPTIS -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tempat-baptis-anggota-kk">Tempat Baptis</label>
          <input bind:value={anggotaKK.tempat_baptis} class="field" id="tempat-baptis-anggota-kk" />
          <!-- required={anggotaKK.sudah_baptis} -->
        </section>
        <!-- PELAYAN BAPTIS -->
        <section class="flex flex-col my-2 max-w-600">
          <label for="pelayan-baptis-anggota-kk">Nama Pelayan Baptis</label>
          <input bind:value={anggotaKK.nama_pelayan_baptis} class="field" id="pelayan-baptis-anggota-kk" />
          <!-- required={anggotaKK.sudah_baptis} -->
        </section>
      </section>
    {/if}

    <section class="flex items-center my-2 max-w-600">
      <label for="is-sidi-anggota-kk">Sudah Sidi</label>
      <input
        class="ml-2"
        style="width:15px;height:15px"
        id="is-sidi-anggota-kk"
        bind:checked={anggotaKK.sudah_sidi}
        type="checkbox" />
    </section>

    {#if anggotaKK.sudah_sidi}
      <section class="flex flex-wrap">
        <!-- TANGGAL SIDI -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tanggal-sidi-anggota-kk">Tanggal Sidi</label>
          <input bind:value={anggotaKK.tanggal_sidi} class="field" id="tanggal-sidi-anggota-kk" type="date" />
          <!-- required={anggotaKK.sudah_sidi} -->
        </section>
        <!-- TEMPAT SIDI -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tempat-sidi-anggota-kk">Tempat Sidi</label>
          <input bind:value={anggotaKK.tempat_sidi} class="field" id="tempat-sidi-anggota-kk" />
          <!-- required={anggotaKK.sudah_sidi} -->
        </section>
        <!-- PELAYAN SIDI -->
        <section class="flex flex-col my-2 max-w-600">
          <label for="pelayan-sidi-anggota-kk">Nama Pelayan Sidi</label>
          <input bind:value={anggotaKK.nama_pelayan_sidi} class="field" id="pelayan-sidi-anggota-kk" />
          <!-- required={anggotaKK.sudah_sidi} -->
        </section>
      </section>
    {/if}

    <section class="flex items-center my-2 max-w-600">
      <label for="is-nikah-anggota-kk">Sudah Nikah</label>
      <input
        bind:checked={anggotaKK.sudah_nikah}
        class="ml-2"
        style="width:15px;height:15px"
        id="is-nikah-anggota-kk"
        type="checkbox" />
    </section>

    {#if anggotaKK.sudah_nikah}
      <section class="flex flex-wrap">
        <!-- TANGGAL NIKAH -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tanggal-nikah-anggota-kk">Tanggal Nikah</label>
          <input bind:value={anggotaKK.tanggal_nikah} class="field" id="tanggal-nikah-anggota-kk" type="date" />
          <!-- required={anggotaKK.sudah_nikah} -->
        </section>
        <!-- TEMPAT NIKAH -->
        <section class="flex flex-col my-2 mr-2 max-w-600">
          <label for="tempat-nikah-anggota-kk">Tempat Nikah</label>
          <input bind:value={anggotaKK.tempat_nikah} class="field" id="tempat-nikah-anggota-kk" />
          <!-- required={anggotaKK.sudah_nikah} -->
        </section>
        <!-- PELAYAN NIKAH -->
        <section class="flex flex-col my-2 max-w-600">
          <label for="pelayan-nikah-anggota-kk">Nama Pelayan Nikah</label>
          <input bind:value={anggotaKK.nama_pelayan_nikah} class="field" id="pelayan-nikah-anggota-kk" />
          <!-- required={anggotaKK.sudah_nikah} -->
        </section>
      </section>
    {/if}

    <!-- PENDIDIKAN TERAKHIR -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="pendidikan-anggota-kk">Pendidikan</label>
      <select bind:value={anggotaKK.pendidikan} class="field" id="pendidikan-anggota-kk" required>
        {#each selectValues.pendidikan as pendidikan}
          <option value={pendidikan}>{pendidikan}</option>
        {/each}
      </select>
    </section>

    <!-- PEKERJAAN -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="pekerjaan-anggota-kk">Pekerjaan</label>
      <select bind:value={anggotaKK.pekerjaan} class="field" id="pekerjaan-anggota-kk" required>
        {#each selectValues.pekerjaan as pekerjaan}
          <option value={pekerjaan}>{pekerjaan}</option>
        {/each}
      </select>
    </section>

    <!-- PENGHASILAN -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="penghasilan-anggota-kk">Penghasilan</label>
      <select bind:value={anggotaKK.penghasilan} class="field" id="penghasilan-anggota-kk" required>
        {#each selectValues.penghasilan as penghasilan}
          <option value={penghasilan}>{penghasilan}</option>
        {/each}
      </select>
    </section>

    <!-- JAMINAN KESEHATAN -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="jaminan-kesehatan-anggota-kk">Jaminan Kesehatan</label>
      <select bind:value={anggotaKK.jaminan_kesehatan} class="field" id="jaminan-kesehatan-anggota-kk" required>
        {#each selectValues.jaminanKesehatan as jaminanKesehatan}
          <option value={jaminanKesehatan}>{jaminanKesehatan}</option>
        {/each}
      </select>
    </section>

    <!-- KETERANGAN -->
    <section class="flex flex-col my-2 max-w-600">
      <label for="keterangan-anggota-kk">Keterangan</label>
      <select bind:value={anggotaKK.keterangan} class="field" id="keterangan-anggota-kk" required>
        {#each selectValues.keterangan as keterangan}
          <option value={keterangan}>{keterangan}</option>
        {/each}
      </select>
    </section>
  </form>

  <div class="flex p-2 border-t">
    <Button icon="close" on:click={cancel}>Tutup</Button>
    <div class="ml-auto">
      <Button form="create-anggota-kk" icon={isUpdate ? 'content-save-outline' : 'plus'} primary type="submit">
        {isUpdate ? 'Ubah' : 'Tambah'}
      </Button>
    </div>
  </div>
</Dialog>
