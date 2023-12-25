import { Form } from "antd";
import FormInput from "common/components/forms/FormInput";
import { Link } from "react-router-dom";

const Login = () => {
  const handleOnSubmit = (values) => {
    console.log("values: ", values);
  };

  return (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <Form
          name="basic"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleOnSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <FormInput name="username" require label="Username" />
          <FormInput
            name="password"
            require
            label="Password"
            typeInput="password"
          />
          <button className="form__submit-button" type="submit">
            Sign In
          </button>

          {/* <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              // onChange={handleToggle}
              // checked={persist}
            />
            Trust This Device
          </label> */}
        </Form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
};

export default Login;
