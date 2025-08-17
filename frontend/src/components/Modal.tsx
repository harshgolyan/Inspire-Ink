import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

interface ModalProps {
    isOpen : boolean,
    onClose : () => void,
    children : React.ReactNode
}
const Modal = ({ isOpen, onClose, children } : ModalProps) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-50 z-10">
            <div className={`bg-primary rounded-lg p-5 w-[90vw] md:w-[50vw] relative modal-enter`}>
                <button className="absolute top-6 right-6 text-white bg-red-700 font-semibold text-lg p-2 rounded-lg" onClick={onClose}>
                    Close
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('root') as HTMLElement
    );
};

export default Modal;
