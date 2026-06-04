import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../redux/features/auth/authAction';

const Protected = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token') && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  if (localStorage.getItem('token')) {
    if (loading) {
      return <div className="loading-spinner">Loading...</div>; 
    }
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Protected;
