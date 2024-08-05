import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeType } from '../../../redux/slices/listingSlice';
import { useSearchParams } from 'react-router-dom';

import { listingDefaultValue } from '../../../redux/slices/listingSlice';

const ShowType = ({ className = '' }) => {
   const dispatch = useDispatch();
   const currentState = useSelector(state => state.listing.type);

   const [, setSearchParams] = useSearchParams();

   const onClickHandler = (e, name) => {
      e.preventDefault();

      if (currentState === name) return;

      dispatch(changeType(name));

      if (window.innerWidth > 1222) {
         const currentParams = {
            type: name,
         };
         if (listingDefaultValue.type === currentParams.type) {
            delete currentParams['type'];
         }

         setSearchParams(currentParams);
      }
   };

   return (
      <div className={`flex items-center gap-4 ${className}`}>
         <span>Поиск:</span>
         <button onClick={e => onClickHandler(e, 'map')} className={`blue-link ${currentState === 'map' ? '_active' : ''}`}>
            На карте
         </button>
         <button onClick={e => onClickHandler(e, 'list')} className={`blue-link ${currentState === 'list' ? '_active' : ''}`}>
            Списком
         </button>
      </div>
   );
};

export default ShowType;
