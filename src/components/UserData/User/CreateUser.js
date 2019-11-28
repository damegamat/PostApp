import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Input, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./CreateUser.css";

const CreateUser = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    type,
    active,
    changeUser,
    createUser,
    modalUser
  } = props;

  let modalType;
  if (type === "change") {
    modalType = changeUser;
  } else {
    modalType = createUser;
  }
  return (
    <div className={`User-modal  ${active ? "active" : ""}`}>
      <Button className="User-modal__close" onClick={() => modalUser("")}>
        X
      </Button>
      <form className="User-modal__form" onSubmit={handleSubmit(modalType)}>
        <h2>CHANGE USER DATA</h2>
        <div>
          <label>First Name</label>
          <div>
            <Field
              name="first_name"
              component={Input}
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>

        <div>
          <label>Last Name</label>
          <div>
            <Field
              name="last_name"
              component={Input}
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div>
          <label>Sex</label>
          <div>
            <label>
              <Field
                name="gender"
                component="input"
                type="radio"
                value="male"
              />
              Male
            </label>
            <label>
              <Field
                name="gender"
                component="input"
                type="radio"
                value="female"
              />
              Female
            </label>
          </div>
        </div>

        <div>
          <label>Email</label>
          <div>
            <Field
              name="email"
              component={Input}
              type="email"
              placeholder="Email"
            />
          </div>
        </div>

        <div>
          <label>Phone</label>
          <div>
            <Field
              name="phone"
              component={Input}
              type="phone"
              placeholder="Phone"
            />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <Field name="address" component="textarea" />
          </div>
        </div>

        <div>
          <Button type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </Button>
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state, { userInfo }) => ({
  initialValues: {
    first_name: `${userInfo.first_name ? userInfo.first_name : ""}`,
    last_name: userInfo.last_name,
    email: userInfo.email,
    phone: userInfo.phone,
    gender: userInfo.gender,
    address: userInfo.address
  }
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "createUser", // a unique identifier for this form
    enableReinitialize: true
  })(CreateUser)
);
