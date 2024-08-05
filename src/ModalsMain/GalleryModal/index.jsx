import React from 'react';
import styles from './GalleryModal.module.scss';
import Modal from '../../ui/Modal';
import Tabs from '../../ui/Tabs';
import GalleryPhoto from '../../components/GalleryPhoto';

const GalleryModal = ({ condition, set, data, sidebar }) => {
   const dataTabs = data.map(item => {
      return {
         name: item.name,
         body: <GalleryPhoto data={item} containerClassName="!h-[550px]" />,
      };
   });

   return (
      <Modal options={{ overlayClassNames: '_full', modalContentClassNames: styles.GalleryModalContent }} set={set} condition={condition}>
         <div className="container-desktop !max-w-[1400px]">
            {
               <Tabs data={dataTabs} navClassName="col-span-full" containerClassName="grid mmd1:grid-cols-[1fr_25%] gap-x-5" contentClassName="min-w-0">
                  <div className="mt-6">{sidebar}</div>
               </Tabs>
            }
         </div>
      </Modal>
   );
};

export const GalleryModalDefault = ({ condition, set, children }) => {
   return (
      <Modal options={{ overlayClassNames: '_full', modalContentClassNames: styles.GalleryModalContent }} set={set} condition={condition}>
         <div className="container !max-w-[1400px]">{children}</div>
      </Modal>
   );
};

export default GalleryModal;
