import React from 'react';
import TitleIcon from '../TitleIcon';
import { IconStorm } from '../../../ui/Icons';
import { MainTableContent, MainTableHeader } from '../../../ui/MainTable';
import CardRow1 from '../../../ui/CardsRow/CardRow1';
import { Badges } from '../../../ui/Badges';

import homeRequests from '../../../data/homeRequests';
import UserInfo from '../../../ui/UserInfo';
import numberReplace from '../../../helpers/numberReplace';

import stylesCardRow from '../../../ui/CardsRow/CardRow1/CardRow1.module.scss';
import BannerInfo from '../../../components/BannerInfo';
import Button from '../../../uiForm/Button';

const PurchaseRequests = () => {
   return (
      <>
         <div className="white-block white-block-home">
            <TitleIcon icon={<IconStorm width={24} height={24} />} text="Заявки на покупку каталог" link={{ href: '#', name: 'Смотреть всё' }} />
            <div>
               <MainTableHeader className="grid-cols-[130px_305px_370px_1fr]">
                  <span>Тип</span>
                  <span>Параметры</span>
                  <span>Бюджет</span>
                  <span>Заявка от</span>
               </MainTableHeader>
               <MainTableContent className="mt-3">
                  {homeRequests.map((item, index) => {
                     const { id, name, user, rooms, price, areaFrom, areaTo, floorFrom, floorTo } = item;
                     const roomsArr = rooms ? rooms.filter(item => item !== 0) : [];
                     return (
                        <div key={id} className={stylesCardRow.afterShift}>
                           <CardRow1 key={index} className={`grid-cols-[156px_305px_370px_1fr] z-10`}>
                              <a href="#" className={`CardLinkElement ${stylesCardRow.linkShift}`}></a>
                              <h3 className="title-3">{name}</h3>
                              <div>
                                 {rooms && rooms.length > 0 && (
                                    <span>
                                       {rooms[0] === 0 && 'Студия,'} {roomsArr.length > 0 ? `${roomsArr.join(',')}-комн.` : ''}
                                    </span>
                                 )}
                                 {areaFrom && <span>от {areaFrom} м²</span>}
                                 {areaTo && <span>до {areaTo} м²</span>}
                                 {floorFrom && <span>до {floorFrom} эт.</span>}
                                 {floorTo && <span>до {floorTo} эт.</span>}
                              </div>
                              <div className="flex gap-5 items-center">
                                 <h3 className="title-3 whitespace-nowrap">{numberReplace(price)} ₽</h3>
                                 <Badges data={item.badges} className="z-20" />
                              </div>
                              <UserInfo avatar={user.avatarUrl} name={user.name} pos={user.pos} />
                           </CardRow1>
                        </div>
                     );
                  })}
               </MainTableContent>
            </div>
         </div>
         <BannerInfo backgroundColor="rgb(160, 186, 252)" className="mt-3">
            <h3 className="title-3">Оставить заявку если вам нужно особенное жильё под ваши требования</h3>
            <Button>Оставить заявку</Button>
         </BannerInfo>
      </>
   );
};

export default PurchaseRequests;
