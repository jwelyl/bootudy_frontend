import { apiInstance } from "./index.js";

const api = apiInstance();

function selectByAptName(aptName, success, fail) {
  api.get(`/api/aptresults/${aptName}`).then(success).catch(fail);
}

export { selectByAptName };