import { Navigate, Outlet } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
}

const RequireAuth = ({authorizationStatus}: PrivateRouteProps) => authorizationStatus === AuthorizationStatus.Auth ? <Outlet /> : <Navigate to="auth/login" />;
export default RequireAuth;
