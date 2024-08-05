import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setWindowSize } from './redux/slicesHelp/windowSizeSlice';

import MainLayout from './layouts/MainLayout';

import { RoutesPath } from './constants/RoutesPath';

import Home from './pages/Home';
import Listing from './pages/Listing';
import Building from './pages/Building';
import Apartment from './pages/Apartment';
import { useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';

function App() {
   const dispatch = useDispatch();

   const handleResize = useCallback(
      debounce(state => {
         dispatch(setWindowSize({ width: window.innerWidth }));
      }, 200),
      []
   );

   useEffect(() => {
      window.addEventListener('resize', handleResize);

      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <BrowserRouter>
         <Routes>
            <Route path={RoutesPath.home} element={<MainLayout />}>
               <Route path="" element={<Home />} />
               <Route path={`${RoutesPath.building}:id`} element={<Building />} />
               <Route path={`${RoutesPath.apartment}:id`} element={<Apartment />} />
            </Route>
            <Route path={RoutesPath.listing} element={<Listing />} />
            <Route path="*" element={<div>404</div>} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
