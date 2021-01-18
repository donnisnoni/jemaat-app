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
  }),
  '/admin': wrap({
    asyncComponent: () => import('./views/admin/Dashboard.svelte'),
    conditions,
  }),
  '/admin/rayon': wrap({
    asyncComponent: () => import('./views/admin/rayon/Index.svelte'),
    conditions,
  }),
  '/admin/rayon/:id': wrap({
    asyncComponent: () => import('./views/admin/rayon/ViewRayon.svelte'),
    conditions,
  }),
  '/admin/kk': wrap({
    asyncComponent: () => import('./views/admin/kk/Index.svelte'),
    conditions,
  }),
  '/admin/kk/create': wrap({
    asyncComponent: () => import('./views/admin/kk/KK.svelte'),
    conditions,
  }),
  '/admin/kk/:id': wrap({
    asyncComponent: () => import('./views/admin/kk/KK.svelte'),
    conditions,
  }),
  '/admin/jemaat': wrap({
    asyncComponent: () => import('./views/admin/jemaat/Index.svelte'),
    conditions,
  }),
}

export default routes
