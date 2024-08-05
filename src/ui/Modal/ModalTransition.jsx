import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

import { CSSTransition } from 'react-transition-group';

function ModalTransition({ children, condition, set, options }) {
   const modalRef = useRef();
   
   useEffect(() => {
      const close = e => {
         if (e.keyCode === 27) set(false);
      };
      window.addEventListener('keydown', close);
      return () => window.removeEventListener('keydown', close);
   }, [set]);

   return createPortal(
      <CSSTransition nodeRef={modalRef} in={condition} classNames="_open-modal" timeout={150} unmountOnExit>
         <div onClick={() => set(false)} className={`modal-overlay ${(options && options.overlayClassNames) || ''}`}>
            <div onClick={e => e.stopPropagation()} className={`modal ${(options && options.modalClassNames) || ''}`}>
               <button onClick={() => set(false)} className="modal-close">
                  <svg height="200" viewBox="0 0 200 200" width="200">
                     <title />
                     <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
                  </svg>
                  <div>
                     <span></span>
                  </div>
               </button>
               <div>{children}</div>
            </div>
         </div>
      </CSSTransition>,
      document.getElementById('overlay-wrapper')
   );
}

export default ModalTransition;
