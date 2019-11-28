import React from "react";
import { reduxForm, Field } from "redux-form";
import { Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./CreatePosts.css";

const CreatePosts = props => {
  const { handleSubmit, pristine, submitting, users, createPost } = props;
  const user = users.map(item => (
    <option key={item.id} value={item.id}>
      {item.first_name}
      {item.last_name}
    </option>
  ));

  return (
    <>
      <form className="Create-posts" onSubmit={handleSubmit(createPost)}>
        <h2 className="Create-posts__title">Create Post</h2>
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

export default reduxForm({
  form: "createPosts" // a unique identifier for this form
})(CreatePosts);
