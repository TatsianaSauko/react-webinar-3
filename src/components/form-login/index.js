import { cn as bem } from '@bem-react/classname';
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function FormLogin({ login, setLogin, password, setPassword, error, handleSubmit, t }) {
  const cn = bem('FormLogin');

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

FormLogin.propTypes = {
  login: PropTypes.string.isRequired,
  setLogin: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

FormLogin.defaultProps = {
  error: '',
};

export default React.memo(FormLogin);
