import { createPortal } from 'react-dom';
import { forwardRef, useRef } from 'react';
import { useEffect } from 'react';

const Modal= forwardRef(function Modal({ children, open, className=''}, ref) {
    const dialog = useRef();

    useEffect(()=>{
        const modal = dialog.current;
        if(open){
            modal.showModal();
        }
        // This is ok or the cleanup function too.
        // else{
        //     dialog.current.close();
        // }
        return ()=>{
            modal.close();
        }
    },[open]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`}> {children} </dialog>,
        document.getElementById("modal")
    );
});

export default Modal;