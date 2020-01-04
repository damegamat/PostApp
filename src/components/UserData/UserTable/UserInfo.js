import React from "react";
import CreatePosts from "../Post/CreatePosts";
import "./UserInfo.css";

const UserInfo = props => {
  const { user, createPost, userPost } = props;

  const post = userPost.map((item, i) => (
    <div className="User_post__content" key={item.id}>
      <h4 className="User_post__number">Post#{i + 1}</h4>
      <div className="User_post__title">{item.title}</div>
      <div className="User_post__body">{item.body}</div>
    </div>
  ));

  const info = props.user.map((item, index) => {
    return (
      <div className="User_information" key={index}>
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
  });

  return (
    <div className=" User_content">
      {info}
      <div className="User_post-create">
        {user.length > 0 ? (
          <CreatePosts userOne={user} createPost={createPost} />
        ) : null}
      </div>
      <div className="User_post">{post}</div>
    </div>
  );
};

export default UserInfo;
