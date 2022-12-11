import { apiInstance } from "./index.js";

const api = apiInstance();

function selectAllFavorite(success, fail) {
  api.get(`/api/favorite`).then(success).catch(fail);
}

function selectAllFavorite(memberId, success, fail) {
  api.get(`/api/favorite/${memberId}`).then(success).catch(fail);
}

function insertFavorite(favorite, success, fail) {
  api.post(`/api/favorite`, JSON.stringify(favorite)).then(success).catch(fail);
}

export { selectAllFavorite,  selectAllFavorite, insertFavorite };