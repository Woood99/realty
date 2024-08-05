import React from 'react';

import Modal from '../../ui/Modal';

import styles from './SelectAccLogModal.module.scss';
import Button from '../../uiForm/Button';

const SelectAccLogModal = ({ condition, set }) => {
   return (
      <Modal options={{ overlayClassNames: '_right', modalClassNames: styles.root }} set={set} condition={condition}>
         <h2 className="title-2 modal-title-gap text-center">Войти в аккаунт</h2>
         <Button variant="secondary" size="Big" Selector="a" href="#">Войти по номеру телефона</Button>
      </Modal>
   );
};

export default SelectAccLogModal;
