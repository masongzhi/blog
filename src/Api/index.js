import fetch from './fetch'

// Koala API
export function fetchArticles (options) {
  return fetch('/article', options)
}

export function fetchArticle (options) {
  return fetch(`/article/${options.id}`, options)
}

export function saveArticle (options) {
  options.method = 'POST'
  return fetch('/article', options)
}

export function addArticleLVC (options) {
  options.method = 'POST'
  return fetch('/article/addLVC', options)
}

export function subArticleLVC (options) {
  options.method = 'POST'
  return fetch('/article/subLVC', options)
}
