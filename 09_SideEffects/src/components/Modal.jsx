import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Normal way to create Modal with useRef and forwardRef:

// const Modal = forwardRef(function Modal({ children }, ref) {
//   const dialog = useRef();

//   useImperativeHandle(ref, () => {
//     return {
//       open: () => {
//         dialog.current.showModal();
//       },
//       close: () => {
//         dialog.current.close();
//       },
//     };
//   });

//   return createPortal(
//     <dialog className="modal" ref={dialog}>
//       {children}
//     </dialog>,
//     document.getElementById('modal')
//   );
// });

// Now with useEffect:
function Modal({ open, children, onClose }) {
  const dialog = useRef();

  // We need useEffect in here because if not the first time running dialog.current.ShowModal() or dialog.current.close() it is
  // undefined, since we have not return the object yet.
  useEffect(() => {
    if (open) {
      dialog.current.showModal(); //this helps sets the background black and unavaiable for users to click.
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose= {onClose}>
      {open? children : null}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
