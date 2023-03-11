import { RotatingLines } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';
export const Loader = () => {
  return (
    <Modal>
      <RotatingLines />
    </Modal>
  );
};
