<script>
  import Button from '/@components/Button.svelte';
  import Dialog from '/@components/Dialog.svelte';

  let dialog,
    loading = false;
</script>

<Dialog bind:this={dialog} class="simple-dialog" on:closed cancel={() => true}>
  <h3 class="px-3 py-2 text-lg">Tambah Rayon</h3>
  <!-- <hr /> -->
  <div class="flex flex-col px-3 py-2 overflow-y-auto" />
  <div class="flex px-3 py-2 mt-auto">
    <Button
      class="ml-auto btn btn-primary btn-scale"
      disabled={loading}
      icon={loading || 'delete'}
      primary
      title="Hapus Rayon">
      {!loading ? 'Hapus' : 'loading...'}
    </Button>
  </div>
</Dialog>
