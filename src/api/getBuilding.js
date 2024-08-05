import axios from 'axios';
import { BASE_URL } from '../constants/api';

export const getBuilding = async id => {
   try {
      const response = await axios(`${BASE_URL}/building/${id}`);
      return response.data;
   } catch (error) {
      console.log(error);
   }
};
