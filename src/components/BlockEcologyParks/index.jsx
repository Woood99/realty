import React from 'react';

import Tabs from '../../ui/Tabs';
import GalleryPhoto from '../GalleryPhoto';
import FullscreenBtn from '../../ui/FullscreenBtn';

const BlockEcologyParks = ({ data }) => {
   const dataTabs = data.map(item => {
      return {
         name: item.name,
         body: <GalleryPhoto allData={data} data={item} variant="modal" />,
      };
   });

   return (
      <div className="white-block">
         <h2 className="title-2 mb-4">Экология и парки</h2>
         <Tabs data={dataTabs} bodyContent={<FullscreenBtn />} contentClassName="relative" />
      </div>
   );
};

export default BlockEcologyParks;
