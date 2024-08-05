import React, { useContext, useState } from 'react';
import Tabs from '../../../ui/Tabs';
import { BuildingContext } from '..';

import RoomInfo from '../RoomInfo/RoomInfo';

const BuildingTabs = () => {
   const { apartments } = useContext(BuildingContext);

   const [isActiveSpoller, setIsActiveSpoller] = useState(null);

   const activeSpollerHandler = index => {
      if (isActiveSpoller === index) {
         setIsActiveSpoller(null);
      } else {
         setIsActiveSpoller(index);
      }
   };

   const ApartmentsItems = () => {
      return (
         <div className="flex flex-col gap-3">
            {apartments.map((apartment, index) => {
               return <RoomInfo key={index} apartment={apartment} active={index === isActiveSpoller} onClick={() => activeSpollerHandler(index)} />;
            })}
         </div>
      );
   };

   const dataTabs = [
      {
         name: 'Квартиры',
         body: 1,
      },
      {
         name: 'Планировки',
         body: <ApartmentsItems />,
      },
   ];

   return <Tabs data={dataTabs} defaultValue={1} />;
};

export default BuildingTabs;
