import React from 'react';

import { Gallary } from './ImageGallery.styled';

export class ImageGallery extends React.Component {
  render() {
   
    return (
      <>
        <Gallary>{this.props.children}</Gallary>
      </>
    );
  }
}
