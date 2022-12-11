import { apiInstance } from "./index.js";

const api = apiInstance();

function selectByAYM(param, success, fail) {
  let sidoName = param.sidoName;
  let gugunName = param.gugunName;
  let dongName = param.dongName;
  let dealYear = param.dealYear;
  let dealMonth = param.dealMonth;

  if(sidoName === "")
    sidoName = "none";
  if(gugunName === "")
    gugunName = "none";  
  if(dongName === "")
    dongName = "none";
  if(dealYear === "")
    dealYear = 0;
  if(dealMonth === "")
    dealMonth = 0;

  api
    .get(
      `/api/apt/${sidoName}/${gugunName}/${dongName}/${dealYear}/${dealMonth}`
    )
    .then(success)
    .catch(fail);
}

export { selectByAYM };
