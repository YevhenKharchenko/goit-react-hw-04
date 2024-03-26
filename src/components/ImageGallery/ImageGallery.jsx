import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.list}>
      {images.map(el => {
        return (
          <li
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
};

export default ImageGallery;
