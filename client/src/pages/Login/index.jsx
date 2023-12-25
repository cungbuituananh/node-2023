import { Form } from "antd";
import FormInput from "common/components/forms/FormInput";
import { useCreateUserMutation } from "features/redux/services/authService";
import { Link } from "react-router-dom";

const Login = ({ isLogin = true }) => {
  const [createUser, { error, isLoading }] = useCreateUserMutation();
  const handleLogin = async (values) => {};

  const handleRegister = async (values) => {
    await createUser(values);
  };

  return (
    <section className="public">
      <header>
        <h1>{isLogin ? `Login` : `Register user`}</h1>
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
          onFinish={isLogin ? handleLogin : handleRegister}
          // onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <FormInput name="username" require label="Username" />
          {!isLogin && <FormInput name="email" require label="Email" />}

          <FormInput
            name="password"
            require
            label="Password"
            typeInput="password"
          />
          <button
            className="form__submit-button"
            type="submit"
            disabled={isLoading}
          >
            {isLogin ? `Sign In` : `Sign Up`}
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
        {" | "}
        <Link to={isLogin ? `/register` : `/login`}>
          {isLogin ? `Register` : `Login`}
        </Link>
      </footer>
    </section>
  );
};

export default Login;
