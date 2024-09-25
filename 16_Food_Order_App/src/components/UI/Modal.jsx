import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';

export default function Modal({ children, open, onClose, className = '' }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        }
        // This is ok or the cleanup function too.
        // else{
        //     dialog.current.close();
        // }
        return () => {
            modal.close();
        }
    }, [open]);

    return createPortal(
        // onClose in Modal is required to avoid issues when closing with the "ESC" key. Because visually it will close,
        // but the value of the open prop -> open={userProgressCtx.progress === 'checkout'}, would remain either
        // checkout or cart in this case and never change.
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById("modal")
    );
};