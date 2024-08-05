import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

import styles from './Listing.module.scss';

import { useDispatch } from 'react-redux';
import { setVisiblePlacemarks } from '../../redux/slices/listingSlice';
import fetchScript from '../../helpersComponent/fetchScript';
import { getMapBuildings } from '../../api/getMapBuildings';
import { BASE_URL, YMAPS_API } from '../../constants/api';
import isEmptyArrObj from '../../helpers/isEmptyArrObj';
import axios from 'axios';
import { CharsFlat } from '../../ui/CharsFlat';
import convertSum from '../../helpers/convertSum';
import debounce from 'lodash.debounce';
import { RoutesPath } from '../../constants/RoutesPath';
import { IconFinger, IconMinus, IconPlus, IconTrash } from '../../ui/Icons';
import paintOnMap from '../../helpersComponent/paintOnMap';
import isPointInPolygon from '../../helpersComponent/isPointInPolygon';

const stylesMap = {
   width: '100%',
   height: '100%',
   backgroundColor: '#cfcfcf',
};
let COORDINATES = [];
let drawingsCollection = {};

const colorLineRed = {
   fillColor: '#ff4848',
   strokeColor: '#ff4848',
};

const colorLineBlue = {
   fillColor: '#005bff',
   strokeColor: '#005bff',
};

function ListingMap() {
   const dispatch = useDispatch();

   const [isLoaded, setIsLoaded] = useState(false);
   const [responseData, setResponseData] = useState({});
   const [map, setMap] = useState(null);
   const [visibleBuildingId, setVisibleBuildingId] = useState([]);

   const [currentTooltip, setCurrentTooltip] = useState(null);
   let isOpenTooltip = false;

   let isPaint = false;
   const [paintMore, setPaintMore] = useState(false);

   const paintBtnRef = useRef(null);
   let placemarks = [];

   useEffect(() => {
      fetchData(currentTooltip);
   }, [currentTooltip]);

   const fetchData = useCallback(
      debounce(state => {
         if (!state) return;

         getDataCard(state.id).then(res => {
            renderReactComponent(state.hint, res);
         });
      }, 450),
      []
   );

   const updateBuildingPolygon = placemarks => {
      const newPlacemarks = [];

      placemarks.forEach(item => {
         if (isPointInPolygon(item.mark.geometry._coordinates, COORDINATES.flat(1))) {
            newPlacemarks.push(item);
         }
      });

      setVisibleBuildingId(newPlacemarks.map(item => item.id));
   };

   function renderReactComponent(container, data) {
      ReactDOM.createRoot(container).render(<CustomBalloonContent data={data} />);
   }

   const CustomBalloonContent = ({ data }) => {
      return (
         <div className={styles.TooltipCardRoot}>
            <div className={styles.TooltipCardImage}>
               <img src={data.image} width="170" height="145" alt={data.title} />
            </div>
            <div className="flex-grow">
               <h3 className={`${styles.TooltipCardTitle} title-4`}>{data.title}</h3>
               <div className="flex flex-col gap-2">
                  {data.apartments.map((item, index) => (
                     <CharsFlat key={index}>
                        <span>{item.room === 0 ? 'Студии' : `${item.room}-комн`}</span>
                        <span>от {convertSum(item.price)} ₽</span>
                     </CharsFlat>
                  ))}
               </div>
            </div>
         </div>
      );
   };

   const mapRef = useRef(null);

   const getDataCard = async id => {
      const res = await axios(`${BASE_URL}/api/data-map-building/${id}`);
      return res.data;
   };

   const getBuildingDebounce = useCallback(
      debounce(state => {
         if (COORDINATES.length > 0) return;
         getBuildingId(state.myMap, state.placemarks);
      }, 750),
      []
   );

   const getBuildingId = (myMap, placemarks) => {
      const bounds = myMap.getBounds();
      const buildingId = [];
      placemarks.forEach(function (placemark) {
         const id = placemark.mark.properties.get('id');
         const placemarkCoords = placemark.mark.geometry.getCoordinates();
         if (ymaps.util.bounds.contains(bounds, placemarkCoords)) {
            buildingId.push(id);
         }
      });

      setVisibleBuildingId(buildingId);
   };

   useEffect(() => {
      fetchScript(YMAPS_API).then(() => setIsLoaded(true));
   }, []);

   useEffect(() => {
      const fetchMapBuildings = async () => {
         try {
            const response = await getMapBuildings();
            setResponseData(response);
         } catch (error) {
            console.log(error);
         }
      };

      fetchMapBuildings();
   }, []);

   const createMap = () => {
      try {
         ymaps.ready(initMap);
      } catch (error) {
         console.log('error is', error);
      }
   };

   function initMap() {
      paintOnMap();
      ymaps.ready(['ext.paintOnMap']).then(function () {
         const myMap = new ymaps.Map('customMap', {
            center: responseData.coordinates,
            zoom: 12,
            controls: [],
         });

         placemarks = responseData.placemarks.map(item => {
            const mark = new ymaps.Placemark(
               [item.coordinates[0], item.coordinates[1]],
               {
                  id: item.id,
                  minPrice: item.minPrice,
               },
               {
                  iconLayout: ymaps.templateLayoutFactory.createClass(`<div class=${styles.MapCircle} data-placemark-id="${item.id}"></div>`),
                  iconShape: {
                     type: 'Rectangle',
                     coordinates: [
                        [0, 0],
                        [15, 15],
                     ],
                  },
               }
            );
            mark.events.add('mouseenter', e => {
               mapRef.current.querySelectorAll('[data-balloon]').forEach(item => {
                  item.remove();
               });

               isOpenTooltip = true;
               let hint = document.createElement('a');
               hint.setAttribute('href', `${RoutesPath.building}${item.id}`);
               hint.style.position = 'absolute';
               hint.style.paddingTop = '20px';
               hint.style.paddingBottom = '20px';

               hint.setAttribute('data-balloon', item.id);

               mapRef.current.appendChild(hint);

               const overlay = mark.getOverlaySync();
               const domElement = overlay.getElement();

               const elRect = domElement.getBoundingClientRect();
               const mapRect = mapRef.current.getBoundingClientRect();

               let distanceToViewportBottom = window.innerHeight - (elRect.top - document.documentElement.scrollTop + domElement.offsetHeight);
               let distanceToViewportLeft = window.innerWidth - (elRect.left - document.documentElement.scrollLeft + domElement.offsetWidth);

               let top = elRect.top - mapRect.top;
               let left = elRect.left - mapRect.left;

               if (distanceToViewportBottom < 400) {
                  top -= 210;
               }

               if (distanceToViewportLeft < 400) {
                  left -= 420;
               }

               hint.style.top = `${top}px`;
               hint.style.left = `${left}px`;

               setCurrentTooltip({ ...item, hint });

               setTimeout(() => {
                  hint.classList.add('show');
               }, 0.1);
            });
            return {
               id: item.id,
               mark,
            };
         });

         function loadMarkersInViewport() {
            const bounds = myMap.getBounds();
            const southWest = bounds[0];
            const northEast = bounds[1];

            const visibleMarkers = placemarks.filter(item => {
               const coordinates = item.mark.geometry.getCoordinates();

               const lat = coordinates[0];
               const lng = coordinates[1];
               return lat >= southWest[0] && lat <= northEast[0] && lng >= southWest[1] && lng <= northEast[1];
            });

            myMap.geoObjects.each(function (geoObject) {
               if (geoObject instanceof ymaps.Placemark) {
                  myMap.geoObjects.remove(geoObject);
               }
            });

            visibleMarkers.forEach(item => {
               myMap.geoObjects.add(item.mark);
               myMap.events.add('mousemove', e => {
                  if (isOpenTooltip) {
                     isOpenTooltip = false;
                     const target = e.get('target');

                     if (target !== item.mark) {
                        mapRef.current.querySelectorAll('[data-balloon]').forEach(item => {
                           item.remove();
                        });
                     }
                  }
               });
            });
         }

         setMap(myMap);
         loadMarkersInViewport();
         getBuildingId(myMap, placemarks);

         myMap.events.add('boundschange', event => {
            loadMarkersInViewport();
            getBuildingDebounce({ myMap, placemarks });
         });

         let paintProcess;

         const stylesLine = { strokeColor: '#005bff', strokeOpacity: 0.8, strokeWidth: 5, fillColor: '#005bff', fillOpacity: 0.5 };

         drawingsCollection = new ymaps.GeoObjectCollection();

         myMap.geoObjects.add(drawingsCollection);

         paintBtnRef.current.addEventListener('click', () => {
            isPaint = !isPaint;
            if (isPaint) {
               if (paintBtnRef.current) paintBtnRef.current.classList.add('ymap-action-active');
            } else {
               if (paintBtnRef.current) paintBtnRef.current.classList.remove('ymap-action-active');
            }
         });

         myMap.events.add('mousedown', function (e) {
            if (isPaint) {
               paintProcess = ymaps.ext.paintOnMap(myMap, e, { style: stylesLine });
            }
         });

         myMap.events.add('mouseup', function (e) {
            if (paintProcess) {
               isPaint = false;

               let coordinates = paintProcess.finishPaintingAt(e);
               COORDINATES.push(coordinates);
               paintProcess = null;

               let geoObject = new ymaps.Polygon([coordinates], {}, stylesLine);

               geoObject.myCoordinates = coordinates;

               geoObject.events
                  .add('mouseenter', e => e.get('target').options.set(colorLineRed))
                  .add('mouseleave', e => e.get('target').options.set(colorLineBlue))
                  .add('click', async e => {
                     let target = e.get('target');
                     COORDINATES = COORDINATES.filter(el => el !== target.myCoordinates);
                     drawingsCollection.remove(target);
                     updateBuildingPolygon(placemarks);

                     if (!drawingsCollection.getLength()) {
                        setPaintMore(false);
                     }
                  });
               drawingsCollection.add(geoObject);
               setPaintMore(true);
               updateBuildingPolygon(placemarks);
            } else {
               isPaint = false;
            }
         });
      });
   }

   useEffect(() => {
      dispatch(setVisiblePlacemarks(visibleBuildingId));
   }, [visibleBuildingId]);

   useEffect(() => {
      if (isLoaded && !isEmptyArrObj(responseData) && !map) {
         createMap();
      }
   }, [isLoaded, map, responseData]);

   const handleZoomIn = () => {
      map.setZoom(map.getZoom() + 1, { duration: 200 });
   };

   const handleZoomOut = () => {
      map.setZoom(map.getZoom() - 1, { duration: 200 });
   };

   const paintBtnClearHandler = () => {
      COORDINATES = [];
      isPaint = false;
      drawingsCollection.removeAll();
      updateBuildingPolygon(placemarks);
      setPaintMore(false);
   };

   return (
      <div className="relative w-full h-full">
         <div ref={mapRef} id="customMap" className="remove-copyrights-pane" style={stylesMap}></div>
         {isLoaded && (
            <>
               <div className="ymap-actions top-4 right-4 ymap-actions-group !w-auto items-end">
                  {paintMore ? (
                     <>
                        <button className="ymap-action ymap-action-btn ymap-action-plus !w-auto font-medium gap-1 px-3">
                           <IconPlus width={15} height={15} />
                           <span>Ещё</span>
                        </button>
                        <button
                           onClick={paintBtnClearHandler}
                           className="ymap-action ymap-action-btn ymap-action-plus !w-auto font-medium gap-1 px-3">
                           <IconTrash width={15} height={15} />
                        </button>
                     </>
                  ) : (
                     <button ref={paintBtnRef} className="ymap-action ymap-action-btn ymap-action-plus">
                        <IconFinger />
                     </button>
                  )}
               </div>
               <div className="ymap-actions ymap-actions-top-right-center ymap-actions-group ymap-actions-group-join">
                  <button onClick={handleZoomIn} className="ymap-action">
                     <IconPlus />
                  </button>
                  <button onClick={handleZoomOut} className="ymap-action">
                     <IconMinus />
                  </button>
               </div>
            </>
         )}
      </div>
   );
}

export default ListingMap;
