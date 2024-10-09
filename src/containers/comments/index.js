import React, { useState } from 'react';
import CommentForm from '../../components/comment-form';
import CommentCard from '../../components/comment-card';
import LoginPrompt from '../../components/login-prompt';

function Comments({ comments, onAddComment, isAuthenticated, parentId }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [showMainForm, setShowMainForm] = useState(true);

  const topLevelComments = comments.filter(comment => comment.parent._id === parentId);

  const handleReplyClick = id => {
    setReplyingTo(id);
    setShowMainForm(false);
  };

  const handleReplySubmit = (text, parentId) => {
    onAddComment(text, parentId);
    setReplyingTo(null);
    setShowMainForm(true);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setShowMainForm(true);
  };

  const renderComments = commentsList => {
    return commentsList.map(comment => (
      <div
        key={comment._id}
        style={{ marginLeft: comment.parent._type === 'comment' ? '30px' : '0px' }}
      >
        <CommentCard comment={comment} onReply={id => handleReplyClick(id)} />
        {replyingTo === comment._id && (
          <>
            {isAuthenticated ? (
              <CommentForm
                title="Добавить ответ"
                onSubmit={text => handleReplySubmit(text, comment._id)}
                onCancel={handleCancelReply}
                placeholder={`Мой ответ для ${comment.author.profile.name}`}
              />
            ) : (
              <LoginPrompt showCancel={true} onCancel={handleCancelReply} />
            )}
          </>
        )}
        <div>{renderComments(comments.filter(c => c.parent._id === comment._id))}</div>
      </div>
    ));
  };

  return (
    <>
      {renderComments(topLevelComments)}
      {showMainForm &&
        (isAuthenticated ? (
          <CommentForm
            title="Добавить комментарий"
            onSubmit={text => handleReplySubmit(text, (parentId = null))}
            placeholder="Введите ваш комментарий"
          />
        ) : (
          <LoginPrompt showCancel={false} />
        ))}
    </>
  );
}

export default Comments;
