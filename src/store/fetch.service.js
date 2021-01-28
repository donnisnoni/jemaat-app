import { writable } from 'svelte/store'
import http from '/@shared/http'
// import axios from 'axios'

const cache = new Map()

// let cancelTokenSrc = axios.CancelToken.source()

export function fetch(url, onSuccess, onDone, onError, disableCache = false) {
  const store = writable(new Promise(() => {}))
  if (!disableCache && cache.has(url)) {
    store.set(Promise.resolve(cache.get(url)))
  }

  http
    .get(url)
    .then(({ data }) => {
      !disableCache && cache.set(url, data)
      store.set(Promise.resolve(data))
      typeof onSuccess == 'function' && onSuccess(data)
    })
    .catch((err) => typeof onError == 'function' && onError(err))
    .finally(() => typeof onDone == 'function' && onDone())

  return store
}
/**
 * Cancel the request
 * @param {string} message
 */
// export function cancel(message) {
//   cancelTokenSrc.cancel(message)
// }
