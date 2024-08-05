import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './Tooltip.module.scss';
import { IconClose } from '../Icons';

const Tooltip = ({ variant = 'text', text, Element, position = 'top', children, gap = 5, event = 'move', className = '', close = true }) => {
   const [isVisible, setIsVisible] = useState(false);
   const tooltipRef = useRef(null);
   const targetRef = useRef(null);

   const currentClassName = () => {
      if (variant === 'text') {
         return styles.TooltipText;
      }
      if (variant === 'element') {
         return styles.TooltipElement;
      }
      return '';
   };

   useEffect(() => {
      if (isVisible && tooltipRef.current && targetRef.current) {
         const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

         const tooltip = tooltipRef.current.getBoundingClientRect();
         const target = targetRef.current.getBoundingClientRect();
         let top = 0;
         let left = 0;

         switch (position) {
            case 'top':
               top = target.top + scrollTop - tooltip.height - gap;
               left = target.left + (target.width - tooltip.width) / 2;
               break;
            case 'bottom':
               top = target.top + scrollTop + target.height + gap;
               left = target.left + (target.width - tooltip.width) / 2;
               break;
            default:
               break;
         }

         tooltipRef.current.style.top = `${top}px`;
         tooltipRef.current.style.left = `${left}px`;
      }
   }, [isVisible, position]);

   const Wrapper = () => {
      if (window.innerWidth <= 1222 && event === 'move') return;
      return createPortal(
         <>
            {isVisible && (
               <div ref={tooltipRef} className={currentClassName()}>
                  {close && event === 'click' ? (
                     <button className="absolute top-4 right-4">
                        <IconClose width={20} height={20} className="fill-blue" />
                     </button>
                  ) : (
                     ''
                  )}
                  {variant === 'text' ? text : <Element />}
               </div>
            )}
         </>,
         document.getElementById('overlay-wrapper')
      );
   };

   return (
      <>
         {event === 'click' ? (
            <div ref={targetRef} onClick={() => setIsVisible(prev => !prev)} className={className}>
               {children}
               <Wrapper />
            </div>
         ) : (
            <div ref={targetRef} onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className={className}>
               {children}
               <Wrapper />
            </div>
         )}
      </>
   );
};

export default Tooltip;
