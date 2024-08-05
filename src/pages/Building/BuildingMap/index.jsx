import React, { useEffect, useState } from 'react';
import styles from './BuildingMap.module.scss';

import fetchScript from '../../../helpersComponent/fetchScript';
import { YMAPS_API } from '../../../constants/api';

const BuildingMap = ({ coordinates, address }) => {
   const [isLoaded, setIsLoaded] = useState(false);
   const [map, setMap] = useState(null);

   useEffect(() => {
      fetchScript(YMAPS_API).then(() => setIsLoaded(true));
   }, []);

   const createMap = () => {
      try {
         ymaps.ready(() => {
            const myMap = new ymaps.Map('customMap', {
               center: coordinates,
               zoom: 13,
               controls: [],
            });

            const placemarkEl = new ymaps.Placemark(
               coordinates,
               {},
               {
                  preset: 'islands#icon',
                  iconColor: '#0095b6',
               }
            );

            myMap.geoObjects.add(placemarkEl);

            setMap(myMap);
         });
      } catch (error) {
         console.log('error is', error);
      }
   };

   useEffect(() => {
      if (isLoaded && !map) {
         createMap();
      }
   }, [isLoaded, map]);

   return (
      <div className="white-block">
         <h2 className="title-2">Расположение</h2>
         <p className="mt-3">{address}</p>
         <div id="customMap" className={`${styles.BuildingMapWrapper} remove-copyrights-pane`} ></div>
      </div>
   );
};

export default BuildingMap;
