import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ modalStyle, children, show, onClose, backdropStyle }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(styles.visible);
    } else {
      modalRef.current.classList.remove(styles.visible);
    }
  }, [show]);

  // window.onclick = function (event) {
  //   if(event.target.value !== "div.modal-inner-area.text-center")
  //   console.log("qqq",event)
  //   onClose()
  // };


  
  return (
    <React.Fragment>
      <div
        ref={modalRef}
        style={backdropStyle}
        className={`${styles.modal__wrap}`}
        onClick={onClose}
        // onClick ={handleClick}
      >
        <div style={modalStyle} className={`${styles.modal} flex flex-col`} onClick={(e)=>e.stopPropagation()}>
          <button onClick={onClose} className="ml-auto py-0 px-2" style={{border: "none", background: '#e5e5e5', zIndex: 1}}>
            <i class="fa-solid fa-xmark bold" style={{color: "#444", fontSize: "14px"}}></i>
          </button>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
