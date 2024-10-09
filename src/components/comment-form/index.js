import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentForm({ title, onSubmit, onCancel, placeholder }) {
  const [text, setText] = useState('');
  const cn = bem('CommentForm');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>{title}</div>
      <textarea
        className={cn('textarea')}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
      />
      <div className={cn('prop')}>
        <button className={cn('button')} onClick={handleSubmit}>
          Отправить
        </button>
        {onCancel && <button onClick={onCancel}>Отмена</button>}
      </div>
    </div>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  placeholder: PropTypes.string,
};

export default CommentForm;
