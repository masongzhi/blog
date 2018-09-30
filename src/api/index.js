import fetch from './fetch';

export function saveArticle(options) {
  options.method = 'POST';
  return fetch('/article', options);
}

// 增加like comment接口
export function addArticleLC(options) {
  options.method = 'POST';
  return fetch('/article/addLC', options);
}

export function subArticleLC(options) {
  options.method = 'POST';
  return fetch('/article/subLC', options);
}

// public 接口(无需登录状态)
export function login(options) {
  options.method = 'POST';
  return fetch('/public/login', options);
}

export function register(options) {
  options.method = 'POST';
  return fetch('/public/register', options);
}

export function fetchArticles(options) {
  return fetch('/public/article', options);
}

export function fetchArticle(options) {
  return fetch(`/public/article/${options.articleId}`, options);
}
