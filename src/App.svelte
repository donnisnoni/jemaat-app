<script>
  import Router from 'svelte-spa-router'
  import { location } from 'svelte-spa-router'
  import routes from './routes.js'
  import AdminSidenav from './views/admin/Sidenav.svelte'
  import { decode } from 'query-string-lite'

  const appSuffix = ' -- Aplikasi Manajemen Jemaat Eden'

  function handler({ detail }) {
    let queries = decode('?' + detail.querystring)
    let page = +queries.page || 1
    if (page > 1) {
      document.title = detail.userData.title + ' halaman ' + page + appSuffix
      return
    }

    document.title = detail.userData.title + appSuffix
  }
</script>

{#if $location.startsWith('/admin')}
  <AdminSidenav />
{/if}

{#if $location != '/'}
  <div class="flex flex-col w-full max-h-screen min-h-screen p-2 overflow-y-auto">
    <Router {routes} on:routeLoaded={handler} />
  </div>
{:else}
  <Router {routes} on:routeLoaded={handler} />
{/if}
