import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://8080-idx-spotify-clone-1745156815475.cluster-w5vd22whf5gmav2vgkomwtc4go.cloudworkstations.dev/api'
});