import React, { useContext, useState } from 'react';

import { BuildingContext } from '..';

import Sidebar from '../../../components/Sidebar';
import Avatar from '../../../ui/Avatar';
import Button from '../../../uiForm/Button';
import RecordViewing from '../../../ModalsMain/RecordViewing';

const BuildingSidebar = () => {
   const { developer } = useContext(BuildingContext);

   const [isOpenRecordView, setIsOpenRecordView] = useState(false);

   return (
      <Sidebar>
         <div className="flex flex-col text-center items-center white-block-small p-6">
            <Avatar size={95}>
               <img src={developer.avatarUrl} alt={developer.name} />
            </Avatar>
            <span className="font-medium mt-5">{developer.name}</span>
            <span className="text-verySmall text-primary400 mt-1.5">{developer.pos}</span>
            <div className="mt-5 font-medium">
               <span>{developer.underСonstruction} строится, </span>
               <span>{developer.handedOver} сдано</span>
            </div>
            <div className="mt-5 flex flex-col gap-3 w-full">
               <Button variant="secondary">Заказать консультацию</Button>
               <Button onClick={() => setIsOpenRecordView(true)}>Записаться на просмотр</Button>
            </div>
         </div>
         <RecordViewing condition={isOpenRecordView} set={setIsOpenRecordView} />
      </Sidebar>
   );
};

export default BuildingSidebar;
