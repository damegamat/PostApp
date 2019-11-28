import React from "react";
import User from "../User/User";
import CreateUser from "../User/CreateUser";
import { Button } from "semantic-ui-react";
import "./UserTable.css";
const UserTable = ({
  changeUser,
  createUser,
  deleteUser,
  viewUser,
  modalUser,
  users,
  type,
  active,
  userInfo
}) => {
  const showUsers = users.map(item => (
    <User
      key={item.id}
      data={item}
      delete={deleteUser}
      modalUser={modalUser}
      view={viewUser}
    />
  ));

  return (
    <div className="UserTable">
      <CreateUser
        userInfo={userInfo}
        type={type}
        active={active}
        id={userInfo.id}
        modalUser={modalUser}
        createUser={createUser}
        changeUser={changeUser}
      />
      <Button onClick={() => modalUser("create")}>Create User</Button>
      <div className="UserTable__wrapper">
        <table className="UserTable__table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Surname</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{showUsers}</tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
