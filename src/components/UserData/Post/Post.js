import React, { useEffect, useState } from "react";
import CreateComment from "../Comment/CreateComment";
import Comment from "../Comment/Comment";
import "./Post.css";

const Post = ({ post, APIkey }) => {
  // API FOR GET USER WITH ID
  const API = `https://gorest.co.in/public-api/users/${post.user_id}?_format=json&access-token=`;
  // API FOR GET COMMENT WITH ID

  const APIc = `https://gorest.co.in/public-api/comments?post_id=${post.id}&_format=json&access-token=`;

  let [userPost, setUserPost] = useState([]);
  let [comments, setComments] = useState([]);

  // GET USER

  useEffect(() => {
    const fetchDataUser = async () => {
      await fetch(`${API}${APIkey}`)
        .then(res => {
          if (res.ok) {
            return res;
          }
          throw Error(alert("Something goes wrong "));
        })
        .then(res => res.json())
        .then(data => {
          setUserPost(data.result);
        });
    };

    const fetchDataComment = async () => {
      await fetch(`${APIc}${APIkey}`)
        .then(res => {
          if (res.ok) {
            return res;
          }
          throw Error(alert("Something goes wrong "));
        })
        .then(res => res.json())
        .then(data => {
          if (data["_meta"]["success"]) {
            let comment = data.result;

            return setComments(comment);
          } else return;
        });
    };

    fetchDataComment();

    fetchDataUser();
  }, []);

  //    CREATE COMMENT

  const createComment = formData => {
    const id = post.id;
    const API = "https://gorest.co.in/public-api/comments";
    const data = formData;
    data["post_id"] = id;

    return fetch(`${API}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIkey}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data["_meta"]["success"]) {
          let commentsList = [...comments];
          let comment = data.result;
          commentsList.push(comment);

          return setComments((comments = commentsList));
        }
        throw Error(
          alert(
            `Remember to enter the e-mail domain (e.g com), your name and body  `
          )
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
  const comment = comments.map(item => (
    <Comment key={item.id} comment={item} />
  ));

  return (
    <div>
      <div className="Post">
        <h3 className="Post__user">
          Post #{post.id} by
          {userPost.first_name}
          {userPost.last_name}
          {userPost.email}
        </h3>
        <div className="Post__wrapper">
          <div className="Post__title">{post.title}</div>
          <div>{post.body}</div>
        </div>
      </div>
      {comments.length > 0 ? comment : null}

      <CreateComment createComment={createComment} form={post.id} />
    </div>
  );
};

export default Post;
