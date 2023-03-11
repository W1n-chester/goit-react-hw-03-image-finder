import { Item } from './GalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import React from 'react';
export class GalleryItem extends React.Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { url, largeImageURL } = this.props;
    return (
      <>
        <Item onClick={this.toggleModal}>
          <img src={url} alt="" />
        </Item>
        {this.state.showModal && (
          <Modal onToggleModal={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
// ({ url, onToggleModal, largeImageURL, showModa });
