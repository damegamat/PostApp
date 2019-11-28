import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

const list = [
  {
    name: "home",
    path: "/",
    exact: true
  },
  {
    name: "users",
    path: "/users"
  },
  {
    name: "posts",
    path: "/posts"
  }
];

const Navigation = () => {
  const menu = list.map(list => (
    <NavLink
      key={list.name}
      className="Site-navigation__item"
      to={list.path}
      exact={list.exact ? list.exact : false}
    >
      {list.name.toUpperCase()}
    </NavLink>
  ));
  return <>{menu}</>;
};

export default Navigation;
