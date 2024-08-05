export const filterPrice = {
   name: 'price',
   type: 'field-fromTo',
   postfix: '₽',
   from: {
      name: 'priceFrom',
      label: 'Цена от',
   },
   to: {
      name: 'priceTo',
      label: 'До',
   },
   value: {},
};

export const filterRooms = {
   name: 'rooms',
   type: 'rooms',
   options: [
      { value: 0, label: 'Студия' },
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4+' },
   ],
   value: [],
};

export const additionalFilters = [
   {
      name: 'type-house',
      nameLabel: 'Тип жилья',
      type: 'tags-single',
      options: [
         { value: 'apartment', label: 'Квартира' },
         { value: 'apartments', label: 'Апартаменты' },
      ],
      value: [],
   },
   {
      name: 'developer',
      nameLabel: 'Застройщик',
      type: 'list-multiple',
      options: [
         { value: 'pic', label: 'ПИК' },
         { value: 'samolet', label: 'ГК Самолет' },
      ],
      value: [],
   },
   {
      name: 'area',
      nameLabel: 'Площадь',
      type: 'field-fromTo',
      postfix: 'м²',
      from: {
         name: 'areaFrom',
         label: 'От',
      },
      to: {
         name: 'areaTo',
         label: 'До',
      },
      value: {},
   },
   {
      name: 'kitchenArea',
      nameLabel: 'Площадь кухни',
      type: 'field-fromTo',
      postfix: 'м²',
      from: {
         name: 'kitchenAreaFrom',
         label: 'От',
      },
      to: {
         name: 'kitchenAreaTo',
         label: 'До',
      },
      value: {},
   },
   {
      name: 'complex',
      nameLabel: 'Комплекс',
      type: 'list-multiple',
      options: [
         { value: 'pic', label: 'ПИК' },
         { value: 'samolet', label: 'ГК Самолет' },
         { value: 'miz', label: 'ГК МИЦ' },
         { value: 'donstroy', label: 'ГК ДОНСТРОЙ' },

         { value: 'test1', label: 'Тест1' },
         { value: 'test2', label: 'Тест2' },
         { value: 'test3', label: 'Тест3' },
         { value: 'test4', label: 'Тест4' },
         { value: 'test5', label: 'Тест5' },
         { value: 'test6', label: 'Тест6' },
         { value: 'test7', label: 'Тест7' },
         { value: 'test8', label: 'Тест8' },
         { value: 'test9', label: 'Тест9' },
         { value: 'test10', label: 'Тест10' },
      ],
      value: [],
   },
   {
      name: 'class',
      nameLabel: 'Класс',
      type: 'tags-multiple',
      options: [
         { value: 'economy', label: 'Эконом' },
         { value: 'comfort', label: 'Комфорт' },
         { value: 'business', label: 'Бизнес' },
         { value: 'elite', label: 'Элитный' },
         { value: 'premium', label: 'Премиум' },
      ],
      value: [],
   },
];
