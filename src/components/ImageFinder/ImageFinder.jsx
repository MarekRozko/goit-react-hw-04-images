import { useState, useEffect, useCallback } from 'react';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import { getSearchImages } from 'components/Fetch/ImagesApi';
import Loader from 'components/Loader/Loader';
import ModalDetails from 'components/Modal/ModalDetails';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ImageFinder = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalDetails, setModalDetails] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getSearchImages(search, page);
        const { hits, totalHits } = data;
        setTotalHits(totalHits);
        if (hits.length <= 0) {
        toast.warn('Sorry, there is no image with this name, try to find something else!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      if (page === 1) {
        toast.success(`Congratulations! We found ${totalHits} images.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
        setItems(prevState => [...prevState, ...hits]);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [search, page, setLoading, setItems, setError, setTotalHits]);

  const imagesSearch = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const showModalImage = useCallback(data => {
    setModalDetails(data);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalDetails(null);
  }, []);
    
    return (
      <>
        <Searchbar onSubmit={imagesSearch} />
        <ImageGallery items={items} showModalImage={showModalImage}  />
        {error && <p>{error.massage}</p>}
        {loading && <Loader />}
        {items.length > 0 && items.length < totalHits && (
        <Button loadMore={loadMore}>Load more</Button>
            )}
        {showModal && (
        <Modal closeModal={closeModal}><ModalDetails {... modalDetails}  /></Modal>)}    
        <ToastContainer/>
      </>
    );
  }


export default ImageFinder;