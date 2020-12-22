<script>
  import Router from 'svelte-spa-router';
  import { location } from 'svelte-spa-router';
  import routes from './routes.js';
  import AdminSidenav from './views/admin/Sidenav.svelte';
</script>

{#if $location.startsWith('/admin')}
  <AdminSidenav />
{/if}

{#if $location != '/'}
  <div
    class="flex overflow-y-auto flex-col p-2 w-full min-h-screen max-h-screen">
    <Router {routes} />
  </div>
{:else}
  <Router {routes} />
{/if}
