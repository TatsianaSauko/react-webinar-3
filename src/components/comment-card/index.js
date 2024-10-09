import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/format-date';
import './style.css';

function CommentCard({ comment, onReply }) {
  const cn = bem('CommentCard');
  return (
    <div className={cn()}>
      <div className={cn('prop')}>
        <div className={cn('name')}>{comment.author.profile.name}</div>
        <div className={cn('date')}>{formatDate(comment.dateUpdate)}</div>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <button className={cn('button')} onClick={() => onReply(comment._id)}>
        Ответить
      </button>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
};

export default memo(CommentCard);
