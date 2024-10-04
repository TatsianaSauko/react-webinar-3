import { memo, useEffect } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import ProfileCard from '../../components/profile-card';
import AuthButtons from '../../containers/auth-buttons';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/use-auth';

function Profile() {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    data: {
      name: state.user.name || '',
      email: state.user.email || '',
      phone: state.user.phone || '',
    },
    waiting: state.user.waiting,
  }));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const { t } = useTranslate();

  return (
    <PageLayout head={<AuthButtons />}>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard data={select.data} title={t('profile.title')} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
