import { useEffect, useState } from 'react';

const links = [
   {
      id: 'section-apartments-id',
      label: 'Квартиры',
   },
   {
      id: 'section-ribbon-id',
      label: 'Лента',
   },
   {
      id: 'section-descr-id',
      label: 'Описание',
   },
   {
      id: 'section-apartRenov-id',
      label: 'Отделка квартир',
   },
   {
      id: 'section-location-id',
      label: 'Расположение',
   },
   {
      id: 'section-ecologyParks-id',
      label: 'Экология и парки',
   },
   {
      id: 'section-constPrgs-id',
      label: 'Ход строительства',
   },
];

const getNavLinks = () => {
   return links.filter(item => document.querySelector(`#${item.id}`));
};

export default getNavLinks;
