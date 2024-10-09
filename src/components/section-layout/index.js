import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SectionLayout({ commentsCount, children }) {
  const cn = bem('SectionLayout');
  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Комментарии ({commentsCount})</h2>
      {children}
    </div>
  );
}

SectionLayout.propTypes = {
  commentsCount: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default SectionLayout;
