import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ children, isOpen }) {
  const cn = bem('ModalLayout');

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn()}>
      <div className={cn('content')}>{children}</div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
};

export default React.memo(ModalLayout);
