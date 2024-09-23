import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';

export default function Modal({ children, open, className=''}) {
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
};