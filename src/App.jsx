import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { fetchImages } from '../unsplash-api';
import { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async query => {
    setQuery(query);
    setIsLoading(true);
    const fetchedImages = await fetchImages(query, 1);
    setImages(fetchedImages.results);
    setPage(2);
    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    const moreFetchedImages = await fetchImages(query, page);
    setPage(p => p + 1);
    setImages([...images, ...moreFetchedImages.results]);
    setIsLoading(false);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery images={images} />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
    </>
  );
}

export default App;
