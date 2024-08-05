import React, { createContext } from 'react';
import { Helmet } from 'react-helmet';

import apartmentData from '../../data/apartment';
import HeaderActions from './HeaderActions';
import BodyAndSidebar from '../../components/BodyAndSidebar';
import ApartmentSidebar from './ApartmentSidebar';
import GalleryDefault from '../../components/GalleryDefault';
import ApartmentInfo from './ApartmentInfo';
import ApartmentPresents from './ApartmentPresents';
import BlockApartmentRenov from '../../components/BlockApartmentRenov';
import BuildingMap from '../Building/BuildingMap';
import BlockPersonalDiscount from '../../components/BlockPersonalDiscount';

export const ApartmentContext = createContext({});

const Apartment = () => {
   return (
      <>
         <Helmet>
            <title>Квартира {apartmentData.title}</title>
            <meta name="description" content="Добро пожаловать на сайт inrut.ru" />
         </Helmet>
         <ApartmentContext.Provider value={apartmentData}>
            <main className="main mt-6">
               <HeaderActions />
               <div className="bg-pageColor pt-4 pb-6 mt-2">
                  <div className="container">
                     <BodyAndSidebar>
                        <div className="flex flex-col gap-3 min-w-0">
                           <section>
                              <GalleryDefault images={apartmentData.images} />
                           </section>
                           <section>
                              <ApartmentInfo />
                           </section>
                           <section>
                              <BlockPersonalDiscount data={{ ...apartmentData.discount, price: apartmentData.price }} />
                           </section>
                           <section>
                              <ApartmentPresents data={apartmentData.presents} />
                           </section>
                           <section>
                              <BlockApartmentRenov data={apartmentData.apartmentRenov} />
                           </section>
                           <section>
                              <BuildingMap coordinates={apartmentData.location} address={apartmentData.address} />
                           </section>
                        </div>
                        <ApartmentSidebar />
                     </BodyAndSidebar>
                  </div>
               </div>
            </main>
         </ApartmentContext.Provider>
      </>
   );
};

export default Apartment;
