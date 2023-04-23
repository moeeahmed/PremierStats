import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import classes from "./Navbar.module.css";

const NavBar = () => {
  const location = useLocation();
  const menuRef = useRef();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [navToggle, setNavToggle] = useState(false);

  const pages = {
    Home: "/",
    Fixtures: "/fixtures",
  };

  const navToggleHandler = () => {
    setNavToggle((prevState) => !prevState);
  };

  const userNotSignedIn = (
    <div>
      <li className={classes["nav__item"]}>
        <Link
          to="login"
          state={location}
          className={classes["nav__el"]}
          onClick={navToggleHandler}
        >
          Log In
        </Link>
      </li>
      <li className={classes["nav__item"]}>
        <Link
          state={location}
          to="signup"
          className={classes["nav__el"]}
          onClick={navToggleHandler}
        >
          Sign up
        </Link>
      </li>
    </div>
  );

  const userSignedIn = (
    <div>
      <li className={classes["nav__item"]}>
        <Link
          to="account/details"
          className={classes["nav__el"]}
          onClick={navToggleHandler}
        >
          Account
        </Link>
      </li>
      <li className={classes["nav__item"]}>
        <Link
          state={location}
          to="logout"
          className={classes["nav__el"]}
          onClick={navToggleHandler}
        >
          Log out
        </Link>
      </li>
    </div>
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNavToggle(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef]);

  return (
    <nav className={classes["nav"]}>
      <div
        className={classes["nav__toggle"]}
        onClick={navToggleHandler}
        aria-expanded={navToggle}
        aria-label={navToggle ? "close menu" : "menu"}
        type="button"
      >
        <button
          id={classes["nav-toggle"]}
          className={navToggle ? classes["active"] : ""}
        >
          <span id="burger"></span>
        </button>
      </div>
      <ul
        ref={menuRef}
        className={`${classes["wrapper"]} ${
          navToggle ? classes["active"] : ""
        }`}
      >
        <div>
          {Object.entries(pages).map(([page, link]) => {
            return (
              <li key={page} className={classes["nav__item"]}>
                <Link to={link} onClick={navToggleHandler}>
                  {page}
                </Link>
              </li>
            );
          })}
        </div>
        {isAuthenticated ? userSignedIn : userNotSignedIn}
      </ul>
    </nav>
  );
};

export default NavBar;
