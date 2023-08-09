import { Outlet } from 'react-router-dom';
import Logo from '../logo/logo';
import User from '../user/user';
import Sign from '../sign/sign';
import { AuthorizationStatus } from '../../const';

type LayoutProps = {
    authorizationStatus: AuthorizationStatus;
}

function Layout({authorizationStatus}: LayoutProps): JSX.Element {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            {authorizationStatus === AuthorizationStatus.Auth ? <User /> : <Sign />}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
