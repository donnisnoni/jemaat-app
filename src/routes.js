import { wrap } from 'svelte-spa-router/wrap'

const routes = {
  '/': wrap({
    asyncComponent: () => import('./views/Login.svelte'),
  }),
  '/admin': wrap({
    asyncComponent: () => import('./views/admin/Dashboard.svelte'),
  }),
  '/admin/rayon': wrap({
    asyncComponent: () => import('./views/admin/rayon/Index.svelte'),
  }),
  '/admin/rayon/:id': wrap({
    asyncComponent: () => import('./views/admin/rayon/ViewRayon.svelte'),
  }),
  '/admin/kk': wrap({
    asyncComponent: () => import('./views/admin/kk/Index.svelte'),
  }),
  '/admin/kk/create': wrap({
    asyncComponent: () => import('./views/admin/kk/KK.svelte'),
  }),
  '/admin/kk/:id': wrap({
    asyncComponent: () => import('./views/admin/kk/KK.svelte'),
  }),
  '/admin/jemaat': wrap({
    asyncComponent: () => import('./views/admin/jemaat/Index.svelte'),
  }),
}

export default routes
