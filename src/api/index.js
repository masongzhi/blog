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

export function getComment(options) {
  return fetch('/comment/get', options);
}

export function getCommentById(options, id) {
  return fetch(`/comment/get/${id}`, options);
}

export function addComment(options) {
  options.method = 'POST';
  return fetch('/comment/add', options);
}

export function replyComment(options) {
  options.method = 'POST';
  return fetch('/comment/reply', options);
}
