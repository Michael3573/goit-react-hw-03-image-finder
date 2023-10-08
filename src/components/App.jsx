import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

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
    // Add event listener to close the modal on 'Esc' key press
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // Remove event listener when component unmounts
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
      <div className="App">
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
