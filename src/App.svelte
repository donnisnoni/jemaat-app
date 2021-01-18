<script>
  import Router from 'svelte-spa-router'
  import { location } from 'svelte-spa-router'
  import routes from './routes.js'
  import AdminSidenav from './views/admin/Sidenav.svelte'

  function setTitle({ detail }) {
    // console.log(detail)
    document.title = detail.userData.title + ' -- Aplikasi Manajemen Jemaat Eden'
  }
</script>

{#if $location.startsWith('/admin')}
  <AdminSidenav />
{/if}

{#if $location != '/'}
  <div class="flex flex-col w-full max-h-screen min-h-screen p-2 overflow-y-auto">
    <Router {routes} on:routeLoaded={setTitle} />
  </div>
{:else}
  <Router {routes} on:routeLoaded={setTitle} />
{/if}
