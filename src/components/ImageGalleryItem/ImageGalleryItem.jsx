import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles['ImageGalleryItem-image']}
        src={image.webformatURL}
        alt=""
        onClick={() => onClick(image.largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
