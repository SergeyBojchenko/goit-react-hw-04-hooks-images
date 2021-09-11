import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '23297629-762e8a158b8176c6fdba47d64';

const findImage = ({ searchQuery, currentPage }) =>
  axios
    .get(
      `?q=${searchQuery}&key=${API_KEY}&image_type=photo&orientation=horizontal&page=${currentPage}&per_page=12`,
    )
    .then(response => response.data.hits);


export default { findImage };