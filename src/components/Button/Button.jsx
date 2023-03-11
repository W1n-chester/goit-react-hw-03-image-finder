import { Button } from './Button.styled';

export const LoadMoreBtn = ({ onLoadMoreBtnClick }) => {
  return (
    <Button type="button" onClick={onLoadMoreBtnClick}>
      Load more
    </Button>
  );
};
