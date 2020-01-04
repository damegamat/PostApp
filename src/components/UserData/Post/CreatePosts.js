import React from "react";
import { reduxForm, Field } from "redux-form";
import { Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import "./CreatePosts.css";

const CreatePosts = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    users,
    createPost,
    userOne
  } = props;
  let user;
  let activeUsers = users;
  if (activeUsers ? activeUsers : (activeUsers = userOne)) {
    user = activeUsers.map(item => (
      <option key={item.id} value={item.id}>
        {item.first_name}
        {item.last_name}
      </option>
    ));
  }
  return (
    <>
      <form className="Create-posts" onSubmit={handleSubmit(createPost)}>
        <h2 className="Create-posts__title">Create Post</h2>
        {users ? (
          <div>
            <label>User</label>
            <div>
              <Field
                className="Create-posts__user"
                name="user_id"
                component="select"
              >
                <option />
                {user}
              </Field>
            </div>
          </div>
        ) : null}

        <div>
          <label>Title</label>
          <div>
            <Field
              name="title"
              component={Input}
              type="text"
              placeholder="Title"
            />
          </div>
        </div>

        <div>
          <label>Body</label>
          <div>
            <Field name="body" component="textarea" />
          </div>
        </div>

        <div>
          <Button type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

// export default reduxForm({
//   form: "createPosts" // a unique identifier for this form
// })(CreatePosts);

const mapStateToProps = (state, { userOne, users }) => {
  let userActualID;
  console.log(userOne[0]["id"]);
  if (users) {
    userActualID = null;
  } else {
    userActualID = userOne[0]["id"];
  }

  return {
    initialValues: {
      user_id: userActualID
    }
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "createPosts", // a unique identifier for this form
    enableReinitialize: true
  })(CreatePosts)
);
