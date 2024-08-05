import React from 'react';
import { useLocation } from 'react-router-dom';

import Modal from '../../ui/Modal';

import styles from './ShareModal.module.scss';
import { IconTelegram, IconVk, IconWhatsApp } from '../../ui/Icons';

const ShareModal = ({ condition, set, children }) => {
   const location = useLocation();
   const fullUrl = window.location.origin + location.pathname + location.search + location.hash;

   const whatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullUrl)}`;
   const tgUrl = `https://telegram.me/share/url?url=${encodeURIComponent(fullUrl)}&text=Inrut`;
   const vkUrl = `https://vk.com/share.php?url=${encodeURIComponent(fullUrl)}`;

   return (
      <Modal
         options={{ overlayClassNames: '_right', modalClassNames: styles.root, modalContentClassNames: 'mmd1:!px-12' }}
         set={set}
         condition={condition}>
         {children ? <div className={styles.children}>{children}</div> : ''}
         <h2 className="title-3 modal-title-gap">Поделиться объявлением</h2>
         <a href={whatsAppUrl} className={styles.shareAppItem}>
            <IconWhatsApp />
            WhatsApp
         </a>
         <a href={tgUrl} className={styles.shareAppItem}>
            <IconTelegram />
            Telegram
         </a>
         <a href={vkUrl} className={styles.shareAppItem}>
            <IconVk />
            Вконтакте
         </a>
      </Modal>
   );
};

export default ShareModal;
