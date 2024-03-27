import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

export const requestImages = async (value, page) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=${apiKey}&page=${page}&per_page=12&orientation=landscape&query=${value}`
  );

  return response.data;
};
