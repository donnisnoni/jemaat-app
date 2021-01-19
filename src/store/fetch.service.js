import { writable } from 'svelte/store'
import cache from './cache'
import http from '/@shared/http'
// import axios from 'axios'

// let cancelTokenSrc = axios.CancelToken.source()

export function fetch(url, onSuccess, onDone) {
  const store = writable(new Promise(() => {}))
  if (cache.has(url)) {
    store.set(Promise.resolve(cache.get(url)))
  }

  const load = async () => {
    const response = await http.get(url)
    const data = await response.data
    cache.set(url, data)
    store.set(Promise.resolve(data))
    return Promise.resolve(data)
  }

  load()
    .then((data) => typeof onSuccess === 'function' && onSuccess(data))
    .finally(() => typeof onDone === 'function' && onDone())

  return store
}
/**
 * Cancel the request
 * @param {string} message
 */
// export function cancel(message) {
//   cancelTokenSrc.cancel(message)
// }
