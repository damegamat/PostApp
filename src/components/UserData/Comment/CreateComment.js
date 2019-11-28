import React from "react";
import { reduxForm, Field } from "redux-form";
import { Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./CreateComment.css";

const CreateComment = props => {
  const { handleSubmit, pristine, submitting, createComment } = props;

  return (
    <>
      <form className="Create-comment" onSubmit={handleSubmit(createComment)}>
        <h4 className="Create-comment__title">COMMENT</h4>

        <div>
          <Field name="name" component={Input} type="text" placeholder="Name" />
        </div>

        <div className="Create-comment__email">
          <Field
            name="email"
            component={Input}
            type="email"
            placeholder="Email"
          />
        </div>

        <div>
          <label>TEXT</label>
          <div>
            <Field name="body" component="textarea" />
          </div>
        </div>

        <div className="Create-comment__btn">
          <Button type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  // a unique identifier for this form
})(CreateComment);
