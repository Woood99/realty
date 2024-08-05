import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss';

import { IconLocation, IconNotif, IconFavoriteStroke, IconComparison, IconCalendar, IconAdd, IconDoorOpen } from '../../ui/Icons';

import CityModal from '../../ModalsMain/CityModal';
import AddModal from '../../ModalsMain/AddModal';
import PersonalModal from '../../ModalsMain/PersonalModal';
import SelectAccLogModal from '../../ModalsMain/SelectAccLogModal';
import Tooltip from '../../ui/Tooltip';

import disableScroll from '../../helpers/disableScroll';
import enableScroll from '../../helpers/enableScroll';
import Logo from './Logo';

const HeaderActions = ({ dataNav, width,containerHeader }) => {
   const authInfo = useSelector(state => state.auth);

   const [popupCityOpen, setPopupCityOpen] = useState(false);
   const [popupAddOpen, setPopupAddOpen] = useState(false);
   const [popupPersonalOpen, setPopupPersonalOpen] = useState(false);

   const [isOpenMenu, setIsOpenMenu] = useState(false);

   const actionsTooltipsData = [
      {
         textTooltip: 'Уведомления',
         mobileVisible: true,
         body: (
            <a href="#" className={`${styles.headerAction} relative`}>
               <div className={styles.notifCount}>4</div>
               <IconNotif width={16} height={16} className="fill-primary400" />
            </a>
         ),
      },
      {
         mobileVisible: true,
         textTooltip: 'Избранное',
         body: (
            <a href="#" className={`${styles.headerAction}`}>
               <IconFavoriteStroke width={16} height={16} className="fill-primary400" />
            </a>
         ),
      },
      {
         mobileVisible: true,
         textTooltip: 'Сравнение',
         body: (
            <a href="#" className={`${styles.headerAction}`}>
               <IconComparison width={16} height={16} className="fill-primary400" />
            </a>
         ),
      },
      {
         mobileVisible: false,
         textTooltip: 'Календарь',
         body: (
            <a href="#" className={`${styles.headerAction}`}>
               <IconCalendar width={14} height={14} className="fill-primary400" />
            </a>
         ),
      },
   ];

   const CityBlock = () => {
      return (
         <div className={styles.headerCity}>
            <button className={`${styles.headerAction}`} onClick={() => setPopupCityOpen(true)}>
               <IconLocation width={12} height={14} className="fill-primary400" />
               <span>Краснодар</span>
            </button>
            <CityModal condition={popupCityOpen} set={setPopupCityOpen} />
         </div>
      );
   };

   const MenuMobile = () => {
      return (
         <>
            <button
               className={styles.burger}
               onClick={() => {
                  setIsOpenMenu(true);
                  disableScroll();
               }}>
               <span className={styles.burgerLine}></span>
            </button>
            {isOpenMenu && (
               <div className={styles.Menu}>
                  <button
                     onClick={() => {
                        setIsOpenMenu(false);
                        enableScroll();
                     }}
                     className={styles.MenuClose}>
                     Закрыть
                  </button>
                  <h3 className="title-3">Меню</h3>
                  <div>
                     {dataNav.map((item, index) => {
                        if (item.items) {
                           return (
                              <div key={index}>
                                 <span>{item.name}</span>
                                 <div>
                                    {item.items.flat().map((item, index) => (
                                       <a key={index} href={item.link}>
                                          <span>{item.name}</span>
                                          <span>{item.subtitle}</span>
                                       </a>
                                    ))}
                                 </div>
                              </div>
                           );
                        } else {
                           return (
                              <div key={index}>
                                 <span>{item.name}</span>
                              </div>
                           );
                        }
                     })}
                  </div>
                  <CityBlock />
               </div>
            )}
         </>
      );
   };

   return (
      <div className={`${styles.headerActions}`}>
         <div className={`${styles.headerActionsContainer} ${containerHeader ? 'container' : 'px-4 md1:pr-0'}`}>
            {width > 1222 && <CityBlock />}
            {width <= 1222 && (
               <>
                  <MenuMobile />
                  <Logo />
               </>
            )}

            <div className={styles.headerActionsList}>
               {actionsTooltipsData.map((item, index) => {
                  if (!item.mobileVisible && width <= 1222) return
                  return (
                     <Tooltip key={index} variant="text" text={item.textTooltip} event="move" gap={10} position="bottom" className="w-full h-full">
                        {item.body}
                     </Tooltip>
                  );
               })}
               {width > 1222 && (
                  <>
                     <button className={`${styles.headerAction}`} onClick={() => setPopupAddOpen(true)}>
                        <IconAdd width={14} height={14} className="fill-primary400" />
                        <span>Добавить</span>
                     </button>
                     <AddModal condition={popupAddOpen} set={setPopupAddOpen} />
                  </>
               )}
            </div>

            <button className={`${styles.headerAction}`} onClick={() => setPopupPersonalOpen(true)}>
               <IconDoorOpen width={14} height={14} className="fill-primary400" />
               {width > 1222 && <span>Кабинет</span>}
            </button>
            {authInfo.auth ? (
               <PersonalModal condition={popupPersonalOpen} set={setPopupPersonalOpen} />
            ) : (
               <SelectAccLogModal condition={popupPersonalOpen} set={setPopupPersonalOpen} />
            )}
         </div>
      </div>
   );
};

export default HeaderActions;
