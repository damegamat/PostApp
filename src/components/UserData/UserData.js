import React, { useEffect, useState } from "react";
import UserTable from "./UserTable/UserTable";
import UserInfo from "./UserTable/UserInfo";
import CreatePosts from "./Post/CreatePosts";
import Post from "./Post/Post";
import { Provider } from "react-redux";
import store from "../Store";
import { Route, Switch } from "react-router-dom";
import Home from "../Page/Home";
import ErrorPage from "../Page/ErrorPage";

// FOR USERS
// clean users Api
const APIc = "https://gorest.co.in/public-api/users";

// API json
const API =
  "https://gorest.co.in/public-api/users?page=999?_format=json&access-token=";
// API key
const APIkey = "dQsrYXjvuPaQ-3Y7bkrqKr_9Zj8VANg6B-3g";

// FOR POST
const APIp = `https://gorest.co.in/public-api/posts?page=999?_format=json&access-token=`;

// FOR USER POSTS

let APIup;

const UserData = () => {
  let [users, setUsers] = useState([]);
  let [user, setUser] = useState([]);
  let [modalUserInfo, setUserInfo] = useState({ active: false, userInfo: "" });
  let [posts, setPosts] = useState([]);
  let [userViewPost, setUserViewPost] = useState([]);

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
          setUsers(data.result);
        });
    };

    const fetchDataPost = async () => {
      await fetch(`${APIp}${APIkey}`)
        .then(res => {
          if (res.ok) {
            return res;
          }
          throw Error(alert("Something goes wrong "));
        })
        .then(res => res.json())
        .then(data => {
          const dataLength = data.result.length;
          const number = 2;

          const shortData = data.result.splice(dataLength - number, dataLength);
          setPosts(shortData);
        });
    };
    const fetchDataUserPost = async () => {
      fetch(`${APIup}${APIkey}`)
        .then(res => {
          if (res.ok) {
            return res;
          }
          throw Error(alert("Something goes wrong "));
        })
        .then(res => res.json())
        .then(data => {
          setUserViewPost(data.result);
        });
    };

    fetchDataPost();
    fetchDataUser();
    fetchDataUserPost();
  }, [APIup]);

  //   ACTIVE MODAL

  const modalUser = (type, userInfo = {}) => {
    setUserInfo({
      active: !modalUserInfo.active,
      type,
      userInfo
    });
  };
  //  VIEW USER INFO IN API AND TABLE

  const viewUser = id => {
    const item = id;
    let user = users.filter(user => user.id === item);
    setUser(user);

    // FOR USER POSTS

    APIup = `https://gorest.co.in/public-api/posts?user_id=${id}&_format=json&access-token=`;
  };

  //  CHANGE USER INFO IN API AND TABLE

  const changeUser = formData => {
    let id = modalUserInfo.userInfo.id;
    users = users.filter(user => user.id !== id);
    setUsers(users);
    setTimeout(() => modalUser(), 500);
    const data = formData;
    data.status = "active";

    return fetch(`${APIc}/${id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIkey}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        let usersList = [...users];
        let user = data.result;
        usersList.push(user);
        setUsers((users = usersList));
      });
  };

  // CREATE USER IN API AND TABLE
  const createUser = formData => {
    const data = formData;
    data.status = "active";
    return fetch(`${APIc}`, {
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
        if (data["_meta"]["success"]) {
          let usersList = [...users];
          let user = data.result;
          usersList.push(user);

          return setUsers((users = usersList));
        }
        throw Error(
          alert(`Remember to choose sex and enter the e-mail domain (e.g com)`)
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  // DELETE USER FROM API AND TABLE
  const deleteUser = id => {
    const item = id;

    users = users.filter(user => user.id !== id);
    setUsers(users);

    fetch(`${APIc}/${item}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIkey}`
      }
    }).then(response => response.json());
  };

  // CREATE POST

  const createPost = formData => {
    const APIcp = "https://gorest.co.in/public-api/posts";
    const data = formData;
    console.log(formData);
    return fetch(`${APIcp}`, {
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
        if (data["_meta"]["success"]) {
          let postsList = [...posts];
          let post = data.result;
          postsList.push(post);
          return setPosts((posts = postsList));
        }
        throw Error(alert(`Remember to enter title and body`));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const post = posts.map(item => (
    <Post key={item.id} post={item} APIkey={APIkey} />
  ));
  return (
    <>
      <Provider store={store}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/users"
            exact
            component={() => (
              <>
                <UserTable
                  userInfo={modalUserInfo.userInfo}
                  type={modalUserInfo.type}
                  active={modalUserInfo.active}
                  modalUser={modalUser}
                  createUser={createUser}
                  deleteUser={deleteUser}
                  changeUser={changeUser}
                  viewUser={viewUser}
                  users={users}
                />

                <UserInfo
                  user={user}
                  createPost={createPost}
                  userPost={userViewPost}
                />
              </>
            )}
          />
          <Route
            path="/posts"
            exact
            render={() => (
              <>
                <CreatePosts users={users} createPost={createPost} />
                {post}
              </>
            )}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Provider>
    </>
  );
};

export default UserData;
