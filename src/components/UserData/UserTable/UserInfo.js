import React from "react";
import CreatePosts from "../Post/CreatePosts";
import "./UserInfo.css";

const UserInfo = props => {
  const { user, createPost, userPost } = props;

  const post = userPost.map((item, i) => (
    <div key={item.id}>
      <div>Post#{i + 1}</div>
      <div>{item.title}</div>
      <div>{item.body}</div>
    </div>
  ));

  const info = (
    <div>
      {props.user.map((item, index) => {
        return (
          <div key={index}>
            <p>First Name</p>
            <p>{item.first_name}</p>
            <p>Last Name</p>
            <p>{item.last_name}</p>
            <p>Email</p>
            <p>{item.email}</p>
            <p>Phone</p>
            <p>{item.phone}</p>
            <p>Adress</p>
            <p>{item.address}</p>
          </div>
        );
      })}
    </div>
  );
  return (
    <div>
      {info}
      {user.length > 0 ? (
        <CreatePosts userOne={user} createPost={createPost} />
      ) : null}
      {post}
    </div>
  );
};

export default UserInfo;
