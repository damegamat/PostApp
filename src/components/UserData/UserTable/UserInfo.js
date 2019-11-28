import React from "react";
const UserInfo = props => {
  return (
    <div>
      {/* <button>back to user list</button> */}
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
    </div>
  );
};

export default UserInfo;
