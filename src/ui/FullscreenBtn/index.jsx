import React from 'react';

import styles from './FullscreenBtn.module.scss';
import { IconFullscreen } from '../Icons';

const FullscreenBtn = props => {
   return (
      <div {...props} className={`${styles.FullscreenBtnRoot} gallery-el-modal`}>
         <IconFullscreen />
      </div>
   );
};

export default FullscreenBtn;
