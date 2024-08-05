import React from 'react';

import Modal from '../../ui/Modal';

import styles from './PersonalModal.module.scss';

const PersonalModal = ({ condition, set }) => {
   return (
      <Modal options={{ overlayClassNames: '_right', modalClassNames: styles.root }} set={set} condition={condition}>
         <h2 className="title-2 modal-title-gap">Личный кабинет</h2>
         <div>content...</div>
      </Modal>
   );
};

export default PersonalModal;
