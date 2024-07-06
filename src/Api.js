import axios from 'axios';  /*axios는 HTTP 클라이언트 라이브러리로, 웹 요청을 보내고 응답을 받는 데 사용 */

async function getAPI(name, language, page, type, query) {
    const api_key = "6ccc4e7c9c0572e8f21a941c64ba48c5";
    let url;
    if(type === "movie") {
      url = `https://api.themoviedb.org/3/movie/${name}?language=${language}&page=${page}&api_key=${api_key}`;
  } else {
      url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=${language}&page=${page}&api_key=${api_key}`;
  }

    try {
      //응답 성공
      const response = await axios.get(url,{});  /* axios를 사용하여 API에 GET 요청 보냄*/
      let itemss = await response.data.results;
      return itemss;
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

export default getAPI;