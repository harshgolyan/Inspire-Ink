import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-slate-200 bg-opacity-50 z-10">
            <div className="bg-slate-400 rounded-lg p-5 w-[90vw] md:w-[50vw] relative">
                <button className="absolute top-2 right-2 text-white bg-red-800 font-semibold text-lg p-2 rounded-lg" onClick={onClose}>
                    Close
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('root') 
    );
};

export default Modal;
