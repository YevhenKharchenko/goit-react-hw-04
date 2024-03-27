import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { forwardRef } from 'react';

const ImageGallery = forwardRef(({ images, openModal }, ref) => {
  return (
    <ul className={css.list}>
      {images.map((el, idx) => {
        const isLastImage = idx === images.length - 1;
        return (
          <li
            ref={isLastImage ? ref : null}
            className={css.listItem}
            key={el.id}
            onClick={() => {
              openModal(el.urls.regular);
            }}
          >
            <ImageCard
              url={el.urls.small}
              description={el.description}
              author={el.user.name}
              likes={el.likes}
            />
          </li>
        );
      })}
    </ul>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
