import React from "react";
import "./Comment.css";
const Comment = ({ comment }) => {
  return (
    <div className="Comment">
      <h4>Comment by {comment.name}</h4>
      <div className="Comment__body">{comment.body}</div>
    </div>
  );
};

export default Comment;
