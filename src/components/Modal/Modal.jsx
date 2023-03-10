import { useEffect, useCallback} from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import styles from "./modal.module.css";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ children, closeModal }) => {
  const close = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );
    
    useEffect(() => {
        document.addEventListener("keydown", close);

        return () => document.removeEventListener("keydown", close);
    }, [close]);

    return createPortal(
            <div className={styles.overlay} onClick={close}>
                <div className={styles.modal}>{children}</div>
            </div>,
            modalRoot
        )
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};