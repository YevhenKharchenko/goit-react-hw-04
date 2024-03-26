import css from './ImageCard.module.css';
import { useState } from 'react';

const ImageCard = ({ url, description, author, likes }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={css.imageCard}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <img src={url} alt={description} width={360} height={200} />
      <div className={css.descriptionWrapper}>
        <p className={css.author}>Author: {author}</p>
        <p className={css.likes}>Likes: {likes}</p>
        {isHovered && description && <p>Description: {description}</p>}
      </div>
    </div>
  );
};

export default ImageCard;
