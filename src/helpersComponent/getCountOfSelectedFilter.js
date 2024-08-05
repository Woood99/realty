import isEmptyArrObj from '../helpers/isEmptyArrObj';

function getCountOfSelectedFilter(arr) {
   let res = 0;
   arr.forEach(item => {
      Object.keys(item).forEach(key => {
         if (!isEmptyArrObj(item[key].value)) {
            res++;
         }
      });
   });

   return res;
}

export default getCountOfSelectedFilter;
