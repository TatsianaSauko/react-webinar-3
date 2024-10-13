import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatDate } from '../../utils/format-date';
import './style.css';

function CommentCard({ comment, onReply, isCurrentUser, currentUserName }) {
  const cn = bem('CommentCard');
  const formattedText = comment.text.replace(/(\S{70})(?=\S)/g, '$1\n');

  return (
    <div className={cn()}>
      <div className={cn('prop')}>
        <div className={isCurrentUser ? cn('name', 'authorized') : cn('name')}>
          {comment?.author?.profile?.name ? comment.author.profile.name : currentUserName}
        </div>
        <div className={cn('date')}>{formatDate(comment.dateUpdate)}</div>
      </div>
      <div className={cn('text')}>{formattedText}</div>
      <button className={cn('button')} onClick={() => onReply(comment._id)}>
        Ответить
      </button>
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  onReply: PropTypes.func.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  currentUserName: PropTypes.string,
};

export default React.memo(CommentCard);
