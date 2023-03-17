/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg';
import { Button } from '../button';
import { Portal } from '../portal';

import styles from './modal.module.scss';

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onCancel: () => void;
  children: JSX.Element | string;
  testId: string;
}

const Modal = ({ title, isOpen, onCancel, children, testId }: ModalProps) =>
  isOpen ? (
    <Portal>
      <div className={styles.overlay} onClick={onCancel} data-test-id='modal-outer'>
        <div className={styles.window} onClick={(e) => e.stopPropagation()} data-test-id={testId}>
          <p className={styles.title} data-test-id='modal-title'>
            {title}
          </p>
          <Button
            onClick={onCancel}
            className={styles.button}
            bordered={false}
            shadowed={false}
            testId='modal-close-button'
          >
            <CloseIcon className={styles.cross} />
          </Button>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;

export { Modal };
