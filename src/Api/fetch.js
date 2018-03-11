import isomorphicFetch from 'isomorphic-fetch'
import URI from 'urijs'
import isEmpty from 'lodash/isEmpty'

export default function klgFetch(url, options = undefined) {
  if (options && options.query) {
    url = URI(url).query(options.query).toString()
    delete(options.query)
  }

  return isomorphicFetch(ensureAbsoluteUrl(url), optionsHandler(options))
    .then(handleResponse)
}

export function ensureAbsoluteUrl(input) {
  if (typeof input !== 'string') return input
  if (URI(input).is('absolute')) return input
  return URI('/api/v1' + input).normalize().toString()
}

export function optionsHandler(options) {
  let defaultOptions = {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  }

  if (!options) return defaultOptions

  let finalOptions = {
    ...defaultOptions,
    ...options
  }

  delete finalOptions.body
  if (options.body) {
    if (!isEmpty(options.body)) {
      finalOptions.body = JSON.stringify(options.body)
    }
  }

  return finalOptions
}

export const handlers = {
  JSONResponseHandler(response) {
    return response.json()
      .then(json => {
        if (json.code === 3) {
          // SSOHandler
          window.location.href = `${json.url}?from=${window.location.href}`
        } else if (response.ok && json.code === 0) {
          return json.data
        } else if (response.ok && !json.code) {
          return json
        } else {
          return Promise.reject({
            ...json,
            ...{
              statusCode: response.status, // statusCode is deprecated.
              status: response.status
            }
          })
        }
      })
  },
  textResponseHandler(response) {
    if (response.ok) {
      return response.text()
    } else {
      return Promise.reject({
        statusCode: response.status, // statusCode is deprecated.
        status: response.status,
        err: response.statusText
      })
    }
  }
}

export function handleResponse(response) {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handlers.JSONResponseHandler(response)
  } else if (contentType.includes('text/html')) {
    return handlers.textResponseHandler(response)
  } else {
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
}
