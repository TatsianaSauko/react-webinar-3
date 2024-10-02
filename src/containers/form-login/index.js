import { cn as bem } from '@bem-react/classname';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function FormLogin() {
  const cn = bem('FormLogin');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await store.actions.user.signIn(login, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className={cn()}>
      <h2>{t('login.title')}</h2>
      <form onSubmit={handleSubmit}>
        <div className={cn('prop')}>
          <label htmlFor="login">{t('login.label')}</label>
          <input
            className={cn('input')}
            type="text"
            id="login"
            value={login}
            onChange={e => setLogin(e.target.value)}
            required
          />
        </div>
        <div className={cn('prop')}>
          <label htmlFor="password">{t('password.label')}</label>
          <input
            className={cn('input')}
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className={cn('error')}>{error}</div>}
        <button type="submit">{t('login.button')}</button>
      </form>
    </div>
  );
}

export default FormLogin;
