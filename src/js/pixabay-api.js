import axios from 'axios';
export async function fetchImages(query, page = 1, perPage = 15) {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '45282736-76f00277f987f73abb95d9f87';

  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
