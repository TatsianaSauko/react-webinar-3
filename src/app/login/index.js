import { memo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import FormLogin from '../../components/form-login';
import AuthButtons from '../../containers/auth-buttons';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';

function Login() {
  const { t } = useTranslate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await store.actions.user.signIn(login, password);
      navigate(location.state?.from || '/profile');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <PageLayout head={<AuthButtons />}>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <FormLogin
        login={login}
        setLogin={setLogin}
        password={password}
        setPassword={setPassword}
        error={error}
        handleSubmit={handleSubmit}
        t={t}
      />
    </PageLayout>
  );
}

export default memo(Login);
