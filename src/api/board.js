import { apiInstance } from "./index.js";

const api = apiInstance();

function listNotice(param, success, fail) {
  api.get(`/board/notice`, { params: param}).then(success).catch(fail);
}

function listArticle(param, success, fail) {
  api.get(`/board/free`, { params: param }).then(success).catch(fail);
}

function writeNotice(article, success, fail) {
  api.post(`/board/notice`, JSON.stringify(article)).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  api.post(`/board/free`, JSON.stringify(article)).then(success).catch(fail);
}

function getNotice(articleno, success, fail) {
  api.get(`/board/notice/${articleno}`).then(success).catch(fail);
}

function getArticle(articleno, success, fail) {
  api.get(`/board/free/${articleno}`).then(success).catch(fail);
}

function modifyNotice(article, success, fail) {
  api.put(`/board/notice`, JSON.stringify(article)).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.put(`/board/free`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteNotice(articleno, success, fail) {
  api.delete(`/board/notice/${articleno}`).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  api.delete(`/board/free/${articleno}`).then(success).catch(fail);
}

export { listNotice, listArticle, writeNotice, writeArticle, 
        getNotice, getArticle, modifyNotice, modifyArticle, 
        deleteNotice, deleteArticle 
};
