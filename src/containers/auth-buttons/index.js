import React from 'react';
import useTranslate from '../../hooks/use-translate';
import { Link, useNavigate } from 'react-router-dom';
import SideLayout from '../../components/side-layout';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

const AuthButtons = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();
  const isAuthenticated = localStorage.getItem('authToken');
  const select = useSelector(state => ({
    name: state.user.name,
  }));

  const handleLoginLogout = async () => {
    if (isAuthenticated) {
      try {
        await store.actions.user.signOut();
        navigate('/');
      } catch (e) {
        console.error('Sign out failed', e);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <SideLayout padding="combined" side="end">
      {isAuthenticated ? <Link to="/profile">{select.name}</Link> : <></>}
      <button onClick={handleLoginLogout}>
        {isAuthenticated ? t('logout.button') : t('login.title')}
      </button>
    </SideLayout>
  );
};

export default AuthButtons;
