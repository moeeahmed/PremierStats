import React from "react";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes["footer"]}>
      <p className={classes["footer__copyright"]}>&copy; Mohammed Ahamed.</p>
    </footer>
  );
};

export default Footer;
