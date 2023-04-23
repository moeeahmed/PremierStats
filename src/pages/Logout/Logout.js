import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { logoutSuccess } from "../../store/reducer";

const Logout = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      dispatch(logoutSuccess());
      navigate(state.pathname);
    };

    logout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
