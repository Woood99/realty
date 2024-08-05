const data = [
   {
      id: 1,
      title: 'ЖК “Элит цветочные поляны экопарк”',
      address: 'Краснодар, ул.Карла-Маркса., 234',

      deadline: '4 кв. 2024',

      images: [
         'https://woood99.github.io/inrut-news/app/img/card-1.webp',
         'https://woood99.github.io/inrut-news/app/img/card-3.webp',
         'https://woood99.github.io/inrut-news/app/img/card-6.webp',
         'https://woood99.github.io/inrut-news/app/img/card-9.webp',
      ],

      cashback: 29000,
      present: true,
      top: 5,
      tags: ['Тег 1', 'Очень длинный тег'],

      metro: [
         {
            name: 'Станция1',
            time: 60000, // 1м
         },
         {
            name: 'Станция1',
            time: 120000, // 2м
         },
         {
            name: 'Станция3',
            time: 60000, // 1м
         },
         {
            name: 'Станция4',
            time: 120000, // 2м
         },
      ],

      quantity: 10,
      apartments: [
         {
            room: 0,
            price: 2000000,
         },
         {
            room: 1,
            price: 3000000,
         },
         {
            room: 3,
            price: 18000000,
         },
      ],
      user: {
         avatarUrl: 'https://woood99.github.io/inrut-news/app/img/avatar-1.jpg',
         name: 'Югстройинвест',
         pos: 'Застройщик',
      },
   },
];

export default data;

