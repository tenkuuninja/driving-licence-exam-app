import React from 'react';
import st from './modal.module.css';

interface ModalProps {
  isOpen?: boolean
  children?: JSX.Element
  handleOutsideClick?: () => void
}

const ModalDefault: ModalProps = {
  isOpen: false,
  children: <></>,
  handleOutsideClick: () => {}
}

const Modal = (props: ModalProps = ModalDefault) => {
  const { isOpen, children, handleOutsideClick } = props;
  return (
    <React.Fragment>
      <div className={`${st.mask} ${isOpen ? st.active : ''}`} onClick={handleOutsideClick}></div>
      <div className={`${st.content} ${isOpen ? st.active : ''}`}>
        {children}
      </div>
    </React.Fragment>
  );
}

export default Modal;
