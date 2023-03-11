import React from 'react';
import { createPortal } from 'react-dom';
import { Content, Backdrop } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');
export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  closeModal = e => {
    if (e.code === 'Escape') {
      this.props.onToggleModal();
    }
  };
  closeModalBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onToggleModal();
    }
  };
  render() {
    return createPortal(
      <Backdrop onClick={this.closeModalBackdropClick}>
        <Content>{this.props.children}</Content>
      </Backdrop>,
      modalRoot
    );
  }
}
