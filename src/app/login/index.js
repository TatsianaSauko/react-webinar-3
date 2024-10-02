import { memo } from 'react';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import FormLogin from '../../containers/form-login';
import AuthButtons from '../../containers/auth-buttons';

function Login() {
  const { t } = useTranslate();

  return (
    <PageLayout head={<AuthButtons />}>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <FormLogin />
    </PageLayout>
  );
}

export default memo(Login);
