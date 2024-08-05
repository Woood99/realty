import axios from 'axios';
import { BASE_URL } from '../../constants/api';

export const getRecommended = async () => {
   try {
      const response = await axios(`${BASE_URL}/home/recommended`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
