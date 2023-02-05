import axios from "axios";

/**
 * This API will be used as future enhancement to get list of locations which can
 * pre-populate list of locations as auto-suggestion while searching
 */

const COUNTRY_LIST_API = "v1-list-countries";
const BASE_URL = "https://api.dev.me/";
const config = {
  headers: {
    Accept: "application/json",
    "x-api-key": "63dea2d115a6110b34134059-681cacdf2275",
  },
};
export const getCountryList = async () => {
  const response = await axios.get(`${BASE_URL}${COUNTRY_LIST_API}`, config);

  return response.data;
};
