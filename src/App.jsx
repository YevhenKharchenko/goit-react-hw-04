import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import { fetchImages } from '../unsplash-api';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement(document.getElementById('root'));

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const handleSearch = async query => {
    try {
      setError(false);
      setImages([]);
      setQuery(query);
      setIsLoading(true);
      const fetchedImages = await fetchImages(query, 1);
      const totalPages = fetchedImages.total_pages;

      if (!fetchedImages.results.length) {
        setIsLoading(false);
        alert('Sorry, there are no such images!');
        return;
      }

      setImages(fetchedImages.results);
      setShowBtn(totalPages > page);
      setPage(2);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setError(false);
      setIsLoading(true);
      const moreFetchedImages = await fetchImages(query, page);
      const totalPages = moreFetchedImages.total_pages;
      setShowBtn(totalPages > page);
      setPage(p => p + 1);
      setImages([...images, ...moreFetchedImages.results]);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = url => {
    setModalUrl(url);
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && !error ? (
        <ImageGallery images={images} openModal={openModal} />
      ) : (
        error && <ErrorMessage />
      )}
      {images.length > 0 && !isLoading && showBtn && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      <ReactModal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ImageModal modalUrl={modalUrl} />
      </ReactModal>
    </>
  );
}

export default App;
