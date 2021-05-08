/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import styles from './Modal.module.css';

type TModal = {
  children: JSX.Element;
  fade?: boolean;
  defaultOpened?: boolean;
};

export interface IModal {
  open: () => void;
  close: () => void;
}

export function Modal(
  props: TModal,
  ref: React.Ref<IModal>
): React.ReactPortal | null {
  const { children, fade = false, defaultOpened = false } = props;
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className={clsx([styles.modal, { [styles.modalFade]: fade }])}>
        <div className={styles.modalOverlay} onClick={close} />
        <span
          role="button"
          className={styles.modalClose}
          aria-label="close"
          onClick={close}
        >
          x
        </span>
        <div className={styles.modalBody}>{children}</div>
      </div>
    ) : null,
    document.body
  );
}

export default forwardRef(Modal);
