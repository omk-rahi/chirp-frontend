import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
const ModalContext = createContext();

const Modal = ({ allowClose = true, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(!allowClose);

  return (
    <ModalContext value={{ isOpen, open, close }}>{children}</ModalContext>
  );
};

const Open = ({ children }) => {
  const { open } = useContext(ModalContext);

  return <div onClick={open}>{children}</div>;
};

const Content = ({ children }) => {
  const { close, isOpen } = useContext(ModalContext);

  if (!isOpen) return;

  return createPortal(
    <div className="fixed inset-0 w-dvw h-dvh flex items-center justify-center">
      <div
        onClick={close}
        className="bg-gray-900/25 w-full h-full z-10 absolute inset-0 bg-op"
      ></div>
      <div className="z-50  w-82 md:w-md rounded-lg shadow-xl p-8 bg-white lg:mx-0">
        {children}
      </div>
    </div>,
    document.body
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a <Modal> provider");
  }
  return context;
};

Modal.Open = Open;
Modal.Content = Content;

export default Modal;
