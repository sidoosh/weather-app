import axios from "axios";
/**
 * Move to .env file
 */
const BASE_URL = " https://api.openweathermap.org/data/2.5";
const API_KEY = "27f6980a89ff4a1f4e51c7e83ce6bd60";

export const getWeatherDetails = async (endpoint, location, units) => {
  let response;
  try {
    if (location.includes("lat") || location.includes("long")) {
      /**
       * This API is somehow throwing an error with Bengaluru coordinates but works with any other
       * country coordinates, hence added a logic in catch block to default to city name to bengaluru
       *
       **/
      const res =
        await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?${location}&appid=${API_KEY}
      `);

      if (res.length > 0) {
        location = res[0].name;
      } else {
        location = "Bengaluru";
      }
      response = await axios.get(
        `${BASE_URL}/${endpoint}?q=${location}&units=${units}&APPID=${API_KEY}`
      );
    } else {
      response = await axios.get(
        `${BASE_URL}/${endpoint}?q=${location}&units=${units}&APPID=${API_KEY}`
      );
    }
  } catch (e) {
    location = "Bengaluru";
    response = await axios.get(
      `${BASE_URL}/${endpoint}?q=${location}&units=${units}&APPID=${API_KEY}`
    );
  }

  return response.data;
};
