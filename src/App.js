import SearchBar from './Components/SearchBar';
import { useState, useEffect } from 'react';
import ImageGallery from './Components/ImageGallery';
import Modal from './Modal';
import Container from './Components/Container';
import Button from './Components/Button';
import MyLoader from './Components/Loader/Loader';
import Api from './Services/Api';

export default function App() {
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    fetchhits();
  }, [searchQuery]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setHits([]);
  };

  const handleImageClick = ({ target }) => {
    if (target.nodeName !== 'IMG') {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    setUrl(url);
    setTag(tag);
    setIsLoading(false);
    toggleModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchhits = () => {
    setIsLoading(true);
    const options = { searchQuery, currentPage };

    Api.findImage(options)
      .then(responseHits => {
        setHits(prevHits => [...prevHits, ...responseHits]);
        setCurrentPage(prevCurrentpage => prevCurrentpage + 1);
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => setError({ error }))
      .finally(() => setIsLoading(false));
  };

  return (
    <Container>
      <SearchBar onSubmit={onChangeQuery} />
      <ImageGallery hits={hits} onClick={handleImageClick} />
      {isLoading && <MyLoader />}
      {hits.length > 0 && !isLoading && <Button onClick={fetchhits} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={url} alt={tag} />
        </Modal>
      )}
    </Container>
  );
}


