import React from "react";
import { Button } from "semantic-ui-react";
const User = props => {
  const { first_name, last_name, email, id } = props.data;
  return (
    <>
      <tr>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{email}</td>
        <td>
          <Button onClick={() => props.view(id)}>View</Button>
          <Button onClick={() => props.delete(id)}> Delete</Button>
          <Button onClick={() => props.modalUser("change", props.data)}>
            Change
          </Button>
        </td>
      </tr>
    </>
  );
};

export default User;
