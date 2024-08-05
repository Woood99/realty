import { createContext, useEffect, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';

import buildingData from '../../data/building';

import styles from './Building.module.scss';

import HeaderActions from './HeaderActions';

import BodyAndSidebar from '../../components/BodyAndSidebar';
import BuildingInfo from './BuildingInfo';
import BuildingSidebar from './BuildingSidebar';
import BuildingApartments from './BuildingApartments';
import BlockDescr from '../../components/BlockDescr/BlockDescr';
import BuildingСonstruction from './BuildingСonstruction';
import GalleryThumb from '../../components/GalleryThumb';
import BuildingRibbon from './BuildingRibbon';
import BlockApartmentRenov from '../../components/BlockApartmentRenov';
import BlockEcologyParks from '../../components/BlockEcologyParks';
import BuildingMap from './BuildingMap';
import HeaderFixedNav from '../../components/HeaderFixedNav';
import { useSelector } from 'react-redux';

export const BuildingContext = createContext({});

const Building = () => {
   const { isDesktop } = useSelector(state => state.windowSize);

   return (
      <>
         <Helmet>
            <title>{buildingData.title}</title>
            <meta name="description" content="Добро пожаловать на сайт inrut.ru" />
         </Helmet>
         <BuildingContext.Provider value={buildingData}>
            <main className="main mt-6 md1:mt-2">
               {isDesktop && (
                  <>
                     <HeaderFixedNav />
                     <HeaderActions />
                  </>
               )}
               <div className="bg-pageColor mmd1:pt-4 mmd1:mt-2 pb-6">
                  <div className="container-desktop">
                     <section className="mb-3">
                        <GalleryThumb />
                     </section>
                     <BodyAndSidebar>
                        <section>
                           <BuildingInfo />
                        </section>
                        {isDesktop && <BuildingSidebar />}
                     </BodyAndSidebar>
                  </div>
                  <section className="mt-3" id="section-apartments-id">
                     <div className="container-desktop">
                        <BuildingApartments />
                     </div>
                  </section>
                  <div className="container-desktop">
                     <BodyAndSidebar className="mt-3">
                        <div className="flex flex-col gap-3 min-w-0">
                           <section id="section-ribbon-id">
                              <BuildingRibbon />
                           </section>
                           <section id="section-descr-id">
                              <BlockDescr tags={buildingData.tags} descr={buildingData.description} />
                           </section>
                           <section id="section-apartRenov-id">
                              <BlockApartmentRenov data={buildingData.apartmentRenov} />
                           </section>
                           <section id="section-location-id">
                              <BuildingMap coordinates={buildingData.location} address={buildingData.address} />
                           </section>
                           <section id="section-ecologyParks-id">
                              <BlockEcologyParks data={buildingData.ecologyParks} />
                           </section>
                           <section id="section-constPrgs-id">
                              <BuildingСonstruction />
                           </section>
                        </div>
                        <BuildingSidebar />
                     </BodyAndSidebar>
                  </div>
               </div>
            </main>
         </BuildingContext.Provider>
      </>
   );
};

export default Building;
