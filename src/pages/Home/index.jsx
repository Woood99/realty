import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import styles from './Home.module.scss';

import BannerMain from './BannerMain';
import LogIn from './LogIn';
import Cashback from './Cashback';
import Stocks from './Stocks';
import Recommend from './Recommend';
import PurchaseRequests from './PurchaseRequests';

import bannerBg from '../../assets/img/bannerBg.png';
import { getCashback } from '../../api/Home/getCashback';
import { getPromo } from '../../api/Home/getPromo';
import { getRecommended } from '../../api/Home/getRecommended';

const bannersData = [
   {
      title: 'Семейная ипотека от 2,99%',
      descr: 'Купите квартиру в ипотеку по специальной программе для семей с детьми',
      link: '#',
      imageUrl: bannerBg,
   },
   {
      title: 'Семейная ипотека от 5555',
      descr: 'Купите квартиру в ипотеку по специальной программе для семей с детьми',
      link: '#',
      imageUrl: 'https://static.mts.ru/dpc_upload/contents/608/redmi12_derevyanko_bg.avif',
   },
   {
      title: 'Семейная ипотека от 2,99%',
      descr: 'Купите квартиру в ипотеку по специальной программе для семей с детьми',
      link: '#',
      imageUrl: bannerBg,
   },
];

const Home = () => {
   const [cashbackCards, setCashbackCards] = useState([]);
   const [promoCards, setPromoCards] = useState([]);
   const [recommendedCards, setRecommendedCards] = useState([]);

   useEffect(() => {
      getCashback().then(res => {
         setCashbackCards(res);
      });
      getPromo().then(res => {
         setPromoCards(res);
      });
      getRecommended().then(res => {
         setRecommendedCards(res);
      });
   }, []);

   return (
      <main className="main bg-pageColor pt-6 pb-6">
         <Helmet>
            <title>Главная</title>
            <meta name="description" content="Добро пожаловать на сайт inrut.ru" />
         </Helmet>

         <section>
            <div className="container-desktop">
               <div className={styles.BannerWrapper}>
                  <div className="min-w-0">
                     <BannerMain items={bannersData} />
                  </div>
                  <LogIn />
               </div>
            </div>
         </section>
         {cashbackCards.length > 0 && (
            <section className="mt-8">
               <div className="container-desktop">
                  <Cashback data={cashbackCards} />
               </div>
            </section>
         )}
         {promoCards.length > 0 && (
            <section className="mt-8">
               <div className="container-desktop">
                  <Stocks data={promoCards} />
               </div>
            </section>
         )}
         {recommendedCards.length > 0 && (
            <section className="mt-8">
               <div className="container-desktop">
                  <Recommend data={recommendedCards} />
               </div>
            </section>
         )}
         <section className="mt-8">
            <div className="container-desktop">
               <PurchaseRequests />
            </div>
         </section>
      </main>
   );
};

export default Home;
