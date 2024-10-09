import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginPrompt({ showCancel, onCancel }) {
  const cn = bem('LoginPrompt');
  const location = useLocation();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to="/login" state={{ back: location.pathname }}>
        Войдите
      </Link>
      <div>, чтобы иметь возможность {showCancel ? 'ответить' : 'комментировать'}</div>
      {showCancel && (
        <button className={cn('cancel')} onClick={onCancel}>
          Отмена
        </button>
      )}
    </div>
  );
}

export default LoginPrompt;
