import axios from "axios";
import { baseURL } from "../constant";

async function exchangeCode(code) {
  const response = await axios.get(
    baseURL + `/exchange-code?code=${code}`
  );
  console.log(response);
  return response.data;
}

function getWithToken(token) {
  async function get(path) {
    const response = await axios.get(`https://discord.com/api${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
  return get;
}

export { exchangeCode, getWithToken };
