import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { requestImages } from './services/unsplash-api';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const lastPhotoRef = useRef(null);

  useEffect(() => {
    async function fetchImages() {
      if (!query.length) return;

      try {
        setIsLoading(true);
        const fetchedImages = await requestImages(query, page);
        const totalPages = fetchedImages.total_pages;

        if (!fetchedImages.results.length) {
          setIsLoading(false);
          toast.error(
            'Sorry, there are no images matching your search query. Please, try again!'
          );

          return;
        }

        setImages(images => [...images, ...fetchedImages.results]);
        setShowBtn(totalPages > page);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (!lastPhotoRef.current) return;

    lastPhotoRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [images]);

  const handleSearch = async query => {
    setImages([]);
    setError(false);
    setShowBtn(false);
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = async () => {
    setPage(p => p + 1);
  };

  const openModal = url => {
    setModalUrl(url);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && !error ? (
        <ImageGallery
          images={images}
          openModal={openModal}
          ref={lastPhotoRef}
        />
      ) : (
        error && <ErrorMessage />
      )}
      {images.length > 0 && !isLoading && showBtn && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      <ImageModal
        modalUrl={modalUrl}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
