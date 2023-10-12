import React, { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <div className={styles.Overlay} onClick={this.handleOverlayClick}>
        <div className={styles.Modal}>
          <img src={image.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
