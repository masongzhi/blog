import fetch from './fetch';

// Koala API
export function saveArticle(options) {
  options.method = 'POST';
  return fetch('/article', options);
}

export function login(options) {
  options.method = 'POST';
  return fetch('/public/login', options);
}

export function fetchArticles(options) {
  return fetch('/public/article', options);
}

export function fetchArticle(options) {
  return fetch(`/public/article/${options.id}`, options);
}

// 增加like view comment接口
export function addArticleLVC(options) {
  options.method = 'POST';
  return fetch('/public/article/addLVC', options);
}

export function subArticleLVC(options) {
  options.method = 'POST';
  return fetch('/public/article/subLVC', options);
}
