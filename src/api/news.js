import { apiInstance } from "./index.js";

const api = apiInstance();

async function getNewsList(success, fail) {
  await api.get(`/api/news`).then(success).catch(fail);
}

export { getNewsList };
