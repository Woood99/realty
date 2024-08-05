import React from 'react';

import styles from './VideoCard.module.scss';

const VideoCard = ({ data }) => {
   return (
      <article>
         <div className={styles.VideoCardImage}>
            <img src="" alt="" />
         </div>
         <h3 className={styles.VideoCardTitle}>title</h3>
      </article>
   );
};

export default VideoCard;
