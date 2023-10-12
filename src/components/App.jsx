import React, { Component } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const API_KEY = '38801861-b7baeaf74cb7f3511b259df46';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleSearchSubmit = query => {
    this.setState({ query, page: 1, images: [] }, this.fetchImages);
  };

  fetchImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    axios
      .get(`${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}&per_page=12`)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
        this.scrollToImages();
      });
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = largeImageURL => {
    this.setState({ selectedImage: largeImageURL, showModal: true });
  };

  handleModalClose = () => {
    this.setState({ selectedImage: '', showModal: false });
  };

  handleKeyDown = e => {
    if (e.code === 'Escape' && this.state.showModal) {
      this.handleModalClose();
    }
  };

  scrollToImages = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className={styles.App}>
        {' '}
        {/* Используйте стили из CSS-модуля */}
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal
            image={{ largeImageURL: selectedImage }}
            onClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}

export default App;
