import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ children, onClose, isOpen }) {
  const cn = bem('ModalLayout');

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <button onClick={onClose} className="Button-close">
          Закрыть
        </button>
        {children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default React.memo(ModalLayout);
