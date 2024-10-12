import React, { useState } from 'react';
import CommentForm from '../../components/comment-form';
import CommentCard from '../../components/comment-card';
import LoginPrompt from '../../components/login-prompt';

const MAX_DEPTH = 5;

function Comments({ comments, onAddComment, isAuthenticated, currentUserId, currentUserName }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [showMainForm, setShowMainForm] = useState(true);

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

  const renderComments = (commentsList, currentDepth = 0) => {
    return commentsList.map(comment => {
      const marginLeft = currentDepth < MAX_DEPTH && currentDepth !== 0 ? `30px` : '0px';
      const isCurrentUser = comment.author._id === currentUserId;

      return (
        <div key={comment._id} style={{ marginLeft }}>
          <CommentCard
            comment={comment}
            onReply={handleReplyClick}
            isCurrentUser={isCurrentUser}
            currentUserName={currentUserName}
          />
          {comment.children &&
            comment.children.length > 0 &&
            renderComments(comment.children, currentDepth + 1)}
          {replyingTo === comment._id && (
            <div style={{ marginLeft: '30px' }}>
              {isAuthenticated ? (
                <CommentForm
                  title="Добавить ответ"
                  onSubmit={text => handleReplySubmit(text, comment._id)}
                  onCancel={handleCancelReply}
                  placeholder="Введите ваш ответ"
                />
              ) : (
                <LoginPrompt showCancel={true} onCancel={handleCancelReply} />
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {renderComments(comments)}
      {showMainForm &&
        (isAuthenticated ? (
          <CommentForm
            title="Добавить комментарий"
            onSubmit={text => handleReplySubmit(text, null)}
            placeholder="Введите ваш комментарий"
          />
        ) : (
          <LoginPrompt showCancel={false} />
        ))}
    </>
  );
}

export default Comments;
