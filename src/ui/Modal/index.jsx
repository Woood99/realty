import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.scss';
import { IconClose } from '../Icons';
import disableScroll from '../../helpers/disableScroll';
import enableScroll from '../../helpers/enableScroll';

function Modal({ children, condition, set, options, style, closeBtn = true, ModalHeader, ModalFooter }) {
   const modalRef = useRef();
   useEffect(() => {
      const close = e => {
         if (e.keyCode === 27) set(false);
      };
      window.addEventListener('keydown', close);
      return () => window.removeEventListener('keydown', close);
   }, [set]);

   useEffect(() => {
      if (condition) {
         disableScroll();
      } else {
         enableScroll();
      }
   }, [condition]);

   return createPortal(
      <CSSTransition nodeRef={modalRef} in={condition} classNames="_open-modal" timeout={150} unmountOnExit>
         <div onClick={() => set(false)} style={style} className={`modal-overlay ${(options && options.overlayClassNames) || ''}`}>
            <div onClick={e => e.stopPropagation()} className={`modal ${(options && options.modalClassNames) || ''}`}>
               {closeBtn && (
                  <button onClick={() => set(false)} className="modal-close">
                     <IconClose width={25} height={25} className="fill-blue" />
                     <div>
                        <span></span>
                     </div>
                  </button>
               )}
               {ModalHeader ? <ModalHeader /> : ''}
               <div className={`modal-content scrollbarPrimary ${(options && options.modalContentClassNames) || ''}`}>{children}</div>
               {ModalFooter ? <ModalFooter /> : ''}
            </div>
         </div>
      </CSSTransition>,
      document.getElementById('overlay-wrapper')
   );
}

export default Modal;
