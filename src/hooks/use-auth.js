import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';

function useAuth() {
  const navigate = useNavigate();
  const store = useStore();
  const isAuthenticated = useSelector(state => !!state.user.token);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        navigate('/login');
      } else {
        await store.actions.user.loadProfile();
      }
    };
    checkAuth();
  }, [isAuthenticated, navigate, store.actions.user]);

  return isAuthenticated;
}

export default useAuth;
