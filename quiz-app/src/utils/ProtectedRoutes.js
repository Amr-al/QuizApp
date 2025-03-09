import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  let token = sessionStorage.getItem('auth');
  useEffect(() => {
    if (!token) {
      navigate('/signin');
    }
  }, [])
  return (
    token ? <>{children}</> : <></>
  );
}
