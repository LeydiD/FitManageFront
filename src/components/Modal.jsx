import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Modal = ({ id, title, body, show, onClose }) => {
  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document" style={{ verticalAlign:"center" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{ fontWeight: "bolder" }}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              style={{ backgroundColor: "rgb(224, 28, 28)" }}
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
