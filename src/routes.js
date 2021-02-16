import { replace } from 'svelte-spa-router'
import { wrap } from 'svelte-spa-router/wrap'

const conditions = [
  () => {
    if (!localStorage['token']) {
      replace('/')
      return false
    }
    return true
  },
]

const routes = {
  '/': wrap({
    asyncComponent: () => import('./views/Login.svelte'),
    userData: { title: 'Login' },
  }),
  '/admin': wrap({
    asyncComponent: () => import('./views/admin/Dashboard.svelte'),
    userData: { title: 'Dashboard' },
    conditions,
  }),
  '/admin/rayon': wrap({
    asyncComponent: () => import('./views/admin/rayon/Index.svelte'),
    userData: { title: 'Rayon' },
    conditions,
  }),
  '/admin/rayon/:id': wrap({
    asyncComponent: () => import('./views/admin/rayon/ViewRayon.svelte'),
    userData: { title: 'Data Rayon' },
    conditions,
  }),
  '/admin/kk': wrap({
    asyncComponent: () => import('./views/admin/kk/Index.svelte'),
    userData: { title: 'Keluarga' },
    conditions,
  }),
  '/admin/kk/create': wrap({
    asyncComponent: () => import('./views/admin/kk/KK.svelte'),
    userData: { title: 'Tambah Keluarga' },
    conditions,
  }),
  '/admin/kk/:id': wrap({
    asyncComponent: () => import('./views/admin/kk/KK.svelte'),
    userData: { title: 'Ubah Keluarga' },
    conditions,
  }),
  '/admin/jemaat': wrap({
    asyncComponent: () => import('./views/admin/jemaat/Index.svelte'),
    userData: { title: 'Jemaat' },
    conditions,
  }),
  '/admin/rekapitulasi': wrap({
    asyncComponent: () => import('./views/admin/rekapitulasi/Index.svelte'),
    userData: { title: 'Rekapitulasi' },
    conditions,
  }),
}

export default routes
