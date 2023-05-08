import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth-hook";
import { api } from "../services/api-service";

export default function noAuthPageWrapper(Page) {
  return (props) => {
    const { isLoadingAuth, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        api.get("/health").catch(() => {
          alert("Sorry, Server fault");
        });
      } else {
        navigate("/");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoadingAuth, isAuthenticated]);

    return <Page {...props} />;
  };
}
