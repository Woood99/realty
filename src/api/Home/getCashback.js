import axios from 'axios';
import { BASE_URL } from '../../constants/api';

export const getCashback = async () => {
   try {
      const response = await axios(`${BASE_URL}/home/cashback`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
