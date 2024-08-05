import React, { useContext } from 'react';
import { BuildingContext } from '..';
import BuildingTabs from '../BuildingTabs';
import BuildingFilter from '../BuildingFilter';

const BuildingApartments = () => {
   const { apartmentsLastUpdate } = useContext(BuildingContext);
   return (
      <div className="white-block">
         <h2 className="title-2">Квартиры от застройщика</h2>
         <p className="mt-2 text-primary400 text-small">Информация о квартирах обновлена {apartmentsLastUpdate}</p>
         <BuildingFilter />
         <BuildingTabs />
      </div>
   );
};

export default BuildingApartments;
