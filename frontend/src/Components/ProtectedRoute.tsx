import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
    children : ReactNode
}

const ProtectedRoute = ({children} : ProtectedRouteProps)=> {
  const token = useSelector((state : RootState) => state.token.token);


  if(token) {
    return children;
  }else {
    return <Navigate to="/login"/>;
  }

};

export default ProtectedRoute;