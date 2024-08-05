import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import ListingForm from './ListingForm';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import TypeList from './TypeList';
import TypeMap from './TypeMap';
import getCardsBuildings from '../../api/getCardsBuildings';
import { lastTrigger, setCurrentPage, startIsLoading } from '../../redux/slices/listingSlice';
import debounce from 'lodash.debounce';

const Listing = () => {
   const dispatch = useDispatch();
   const listingSelector = useSelector(state => state.listing);
   const [cards, setCards] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [total, setTotal] = useState(0);

   const [fetching, setFetching] = useState(false);

   const listingMapCardsRef = useRef(null);
   const { width, isDesktop } = useSelector(state => state.windowSize);

   const options = {
      cards,
      setCards,
      total,
      setTotal,
      isLoading,
      setIsLoading,
      listingMapCardsRef,
      width,
   };

   useEffect(() => {
      if (listingSelector.startIsLoading) {
         dispatch(startIsLoading());
         return;
      }
      if (fetching) return;
      dispatch(lastTrigger('filter'));

      setIsLoading(true);
      getCardsBuildings({ ...listingSelector.resultFilters, page: 1 }).then(res => {
         options.setCards(res.cards);
         options.setTotal(res.total);
         dispatch(setCurrentPage(1));
         setIsLoading(false);
      });
   }, [listingSelector.resultFilters]);

   useEffect(() => {
      setIsLoading(true);
   }, [listingSelector.type]);

   useEffect(() => {
      if (!fetching) return;

      dispatch(lastTrigger('pagination'));

      setIsLoading(true);
      getCardsBuildings({ ...listingSelector.resultFilters, page: listingSelector.page + 1 }).then(res => {
         options.setCards([...cards, ...res.cards]);
         options.setTotal(res.total);
         dispatch(setCurrentPage(listingSelector.page + 1));
         setFetching(false);
         setIsLoading(false);
      });
   }, [fetching]);

   useEffect(() => {
      if (listingSelector.type === 'list') {
         document.addEventListener('scroll', scrollHandlerList);

         return () => {
            document.removeEventListener('scroll', scrollHandlerList);
         };
      }
      if (listingSelector.type === 'map') {
         if (listingMapCardsRef.current) {
            listingMapCardsRef.current.addEventListener('scroll', scrollHandlerMap);
         }
         return () => {
            if (listingMapCardsRef.current) {
               listingMapCardsRef.current.removeEventListener('scroll', scrollHandlerMap);
            }
         };
      }
   }, [listingSelector.type]);

   const scrollHandlerList = useCallback(
      debounce(e => {
         if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 700) {
            setFetching(true);
         }
      }, 100),
      []
   );

   const scrollHandlerMap = useCallback(
      debounce(e => {
         if (listingMapCardsRef.current.scrollHeight - (listingMapCardsRef.current.scrollTop + window.innerHeight) < 700) {
            setFetching(true);
         }
      }, 100),
      []
   );

   return (
      <>
         <Helmet>
            <title>Купить квартиру в новостройке</title>
            <meta name="description" content="Добро пожаловать на сайт inrut.ru" />
         </Helmet>
         <div className="site-container">
            <Header>{!isDesktop ? <ListingForm options={options} /> : ''}</Header>
            <main className="main main-headerForm">
               {isDesktop ? (
                  <>
                     <ListingForm options={options} />
                     {listingSelector.type === 'list' ? (
                        <div className="mt-5">
                           <h2 className="title-2 container mb-5">Купить квартиру в Новостройке</h2>
                           <div className="bg-pageColor py-4">
                              <TypeList options={options} />
                           </div>
                        </div>
                     ) : (
                        <div className="bg-pageColor py-4">
                           <TypeMap options={options} />
                        </div>
                     )}
                  </>
               ) : (
                  <>
                     {listingSelector.type === 'list' ? (
                        <div className="mt-5">
                           <h2 className="title-2 container mb-5">Купить квартиру в Новостройке</h2>
                           <TypeMap options={options} />
                        </div>
                     ) : (
                        123
                        // <div className="bg-pageColor py-4">
                        //    <TypeMap options={options} />
                        // </div>
                     )}
                  </>
               )}
            </main>
         </div>
      </>
   );
};

export default Listing;
