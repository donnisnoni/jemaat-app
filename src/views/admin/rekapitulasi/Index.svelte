<script>
  const generateHref = (keyword) => `/api/data/report/${keyword}`
  const keywords = [
    {
      keyword: 'kepala_keluarga',
      label: 'Kepala Keluarga',
    },
    {
      keyword: 'jemaat',
      label: 'Jemaat',
    },
    {
      keyword: 'jemaat',
      label: 'Jemaat',
    },
    {
      keyword: 'jemaat',
      label: 'Jemaat',
    },
    {
      keyword: 'lansia',
      label: 'Lansia',
    },
    {
      keyword: 'par',
      label: 'PAR',
    },
    {
      keyword: 'kaum_ibu',
      label: 'Kaum Ibu',
    },
    {
      keyword: 'kaum_bapak',
      label: 'Kaum Bapak',
    },
    {
      keyword: 'status_nikah',
      label: 'Status Nikah',
    },
    {
      keyword: 'pendidikan',
      label: 'Pendidikan',
    },
    {
      keyword: 'pekerjaan',
      label: 'Pekerjaan',
    },
    {
      keyword: 'presibiter',
      label: 'Presibiter',
    },
  ]
</script>

<div class="flex flex-col flex-1 overflow-hidden bg-white card">
  <div class="p-3 border-b">
    <h3 class="text-lg">Rekapitulasi</h3>
  </div>
  <div class="flex flex-col flex-1 p-3 overflow-y-auto">
    <div class="flex flex-col flex-wrap gap-2 md:flex-row">
      {#each keywords as keyword}
        <a class="item" href={generateHref(keyword.keyword)} target="_blank">{keyword.label}</a>
      {/each}
    </div>
  </div>
</div>

<style>
  .item {
    @apply flex;
    @apply flex-col;
    @apply items-center;
    @apply p-2;
    @apply border;
    @apply rounded-md;
    @apply bg-gray-50;
  }
</style>
