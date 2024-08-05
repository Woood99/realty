import React from 'react';

import styles from './ThumbPhoto.module.scss';

const ThumbPhoto = ({ children }) => {
   return <div className={styles.ThumbPhoto}>{children}</div>;
};

export default ThumbPhoto;
