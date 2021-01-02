// import store from './store';
// import { writable } from 'svelte/store';
import cache from './cache'
import http from '/@shared/http'
import axios from 'axios'

let cancelTokenSrc = axios.CancelToken.source()

/** Trigger fetch data from server */
export async function fetch(url) {
  if (cache.has(url)) {
    return cache.get(url)
  } else {
    cancelTokenSrc = axios.CancelToken.source()
    return http.get(url, { cancelToken: cancelTokenSrc.token }).then((response) => {
      cache.set(url, response.data)
      return response.data
    })
  }
}

/** Delete the cache */
export function deleteCache(url) {
  cache.delete(url)
}

/**
 * Cancel the request
 * @param {string} message
 */
export function cancel(message) {
  cancelTokenSrc.cancel(message)
}
