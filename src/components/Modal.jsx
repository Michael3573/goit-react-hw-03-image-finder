import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    // Добавляем обработчик нажатия клавиши ESC при монтировании
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    // Удаляем обработчик нажатия клавиши ESC при размонтировании
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
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={image.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
