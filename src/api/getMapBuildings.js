import axios from 'axios';
import { BASE_URL } from '../constants/api';

export const getMapBuildings = async () => {
   try {
      const response = await axios(`${BASE_URL}/api/data-map-buildings`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
