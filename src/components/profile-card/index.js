import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ data, title, t }) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{title}</h2>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('user.name')}:</div>
        <div className={cn('value')}>{data.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('user.phone')}:</div>
        <div className={cn('value')}>{data.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>email:</div>
        <div className={cn('value')}>{data.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(ProfileCard);
