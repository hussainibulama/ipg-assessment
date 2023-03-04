import axios from '../Utitlities/Axios';
const API_KEY = 'c2e08c0c7b0e411694e191334230303';

export async function getWeather(location) {
  try {
    const resp = await axios.get(`current.json?key=${API_KEY}&q=${location}`);
    return resp;
  } catch (error) {
    return {
      data: {
        error: true,
        status: 'error',
        message:
          error?.response?.data?.message || error?.data?.message || error,
      },
    };
  }
}
