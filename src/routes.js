import { wrap } from 'svelte-spa-router/wrap';

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
  '/admin/kk': wrap({
    asyncComponent: () => import('./views/admin/kk/Index.svelte'),
  }),
};

export default routes;
