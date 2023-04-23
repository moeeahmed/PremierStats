import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

import { modalActions } from "../../store/reducer";

import classes from "./Modal.module.css";

const Backdrop = () => {
  return <div className={classes["backdrop"]} />;
};

const ModalOverlay = (props) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(modalActions.toggle(false));
  };

  return (
    <div className={classes["modal"]}>
      <div onClick={onClickHandler} className={classes["close"]}>
        <i className="fa-solid fa-xmark" />
      </div>
      <div className={classes["content"]}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>"{props.children}"</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
