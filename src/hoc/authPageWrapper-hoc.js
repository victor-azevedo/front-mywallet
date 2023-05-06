import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth-hook";

export default function authPageWrapper(Page) {
  return (props) => {
    const { isLoadingAuth, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoadingAuth && !isAuthenticated) {
        navigate("/sign-in");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingAuth, isAuthenticated]);

    return isAuthenticated && <Page {...props} />;
  };
}
