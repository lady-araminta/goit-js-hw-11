import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30416408-c6842ca729ef5a51b1af270dd';
const params = `?key=${KEY}&image_type=photo&orientation=horizontal&safesearch=true&colors=grayscale`;

export async function getPictures(query) {
  console.log(query);
  try {
    const response = await axios.get(`${BASE_URL}${params}&q=${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
