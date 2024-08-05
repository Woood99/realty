import { BASE_URL } from '../constants/api';
import axios from 'axios';

const getCardsBuildings = async data => {
   try {
      const response = await axios.post(`${BASE_URL}/api/catalog`, data);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};

export default getCardsBuildings;
