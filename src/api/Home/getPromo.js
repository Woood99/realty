import axios from 'axios';
import { BASE_URL } from '../../constants/api';

export const getPromo = async () => {
   try {
      const response = await axios(`${BASE_URL}/home/promo`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
