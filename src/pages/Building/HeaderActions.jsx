import React, { useState } from 'react';

import BackButton from '../../ui/BackButton';
import { BtnActionText } from '../../ui/ActionBtns';
import { IconComparison, IconFavoriteStroke, IconShare } from '../../ui/Icons';
import RowHeader from '../../ui/RowHeader';

import ShareModal from '../../ModalsMain/ShareModal';

const HeaderActions = () => {
   const [isOpenShareModal, setIsOpenShareModal] = useState(false);

   return (
      <div className="container">
         <RowHeader>
            <BackButton />
            <div className="flex items-center gap-2">
               <BtnActionText>
                  <IconFavoriteStroke width={16} height={16} />
                  Добавить ЖК в избранное
               </BtnActionText>
               <BtnActionText>
                  <IconComparison width={16} height={16} />
                  Добавить ЖК к сравнению
               </BtnActionText>
               <BtnActionText onClick={() => setIsOpenShareModal(true)}>
                  <IconShare width={16} height={16} />
                  Поделиться
               </BtnActionText>
            </div>
         </RowHeader>

         <ShareModal condition={isOpenShareModal} set={setIsOpenShareModal}>
            доп. информация...
         </ShareModal>
      </div>
   );
};

export default HeaderActions;
