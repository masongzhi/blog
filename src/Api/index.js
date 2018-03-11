import fetch from './fetch'

// Koala API
export function fetchArticles (options) {
  return fetch('/article', options)
}

export function saveArticle (options) {
  options.method = 'POST'
  return fetch('/article', options)
}
