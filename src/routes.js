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
    asyncComponent: () => import('./views/admin/kk/CreateKK.svelte'),
  }),
}

export default routes
