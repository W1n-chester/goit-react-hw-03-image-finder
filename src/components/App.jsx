import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GalleryItem } from './GalleryItem/GalleryItem';
import { fetchGalleryImages } from 'services/requestAPI';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export class App extends React.Component {
  state = {
    status: Status.IDLE,
    request: '',
    imagesData: [],
    page: 1,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevState.request;
    const nextRequest = this.state.request;
    const page = this.state.page;

    if (prevRequest !== nextRequest) {
      this.setState(() => ({
        imagesData: [],
        page: 1,
        status: Status.PENDING,
      }));
      // ЗАПРОС НА СЕРВЕР
      fetchGalleryImages(page, nextRequest)
        .then(data => {
          this.setState({
            imagesData: data.hits,
            page: this.state.page + 1,
            status: Status.RESOLVED,
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }
  // componentDidUpdate(prevProps, prevState) {
  //   const request = this.state.request;
  //   const page = this.state.page;
  // }

  // ЗАПРОС
  AddRequest = request => {
    this.setState({ request });
  };
// ДОЗАГРУЗКА СТРАНИЦ
  loadMoreBtnClick = () => {
    const nextRequest = this.state.request;
    const page = this.state.page;

    this.setState(() => ({
      status: Status.PENDING,
    }));

    fetchGalleryImages(page, nextRequest)
      .then(data => {
        this.setState({
          imagesData: [...this.state.imagesData, ...data.hits],
          page: this.state.page + 1,
          status: Status.RESOLVED,
        });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  // РЕНДЕР
  render() {
    const { status, imagesData } = this.state;
    return (
      <>
        <Searchbar onAddRequest={this.AddRequest} />
        <body>
          <ImageGallery>
            {imagesData.map(({ id, webformatURL, largeImageURL }) => {
              return (
                <GalleryItem
                  key={id}
                  url={webformatURL}
                  largeImageURL={largeImageURL}
                />
              );
            })}
          </ImageGallery>
          {status === 'resolved' && (
            <LoadMoreBtn onLoadMoreBtnClick={this.loadMoreBtnClick} />
          )}
          {status === 'pending' && <Loader />}
        </body>
      </>
    );
  }
}
