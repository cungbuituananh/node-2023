import { Button, Checkbox, Form } from "antd";
import FormInput from "common/components/forms/FormInput";
import {
  useLoginMutation,
  useRegisterUserMutation,
} from "features/services/authService";
import { Link } from "react-router-dom";

const Login = ({ isLogin = true }) => {
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  const [login, { isLoading: isLoadingLogin, isError: isErrorLogin }] =
    useLoginMutation();

  const handleSubmit = async (values) => {
    try {
      isLogin ? await login(values) : await registerUser(values);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <section className="public">
      <>
        <header>
          <h1>{isLogin ? "Employee Login" : "Employee Signup"}</h1>
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
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <FormInput labelName="Username" name="username" require />
            {!isLogin && <FormInput labelName="Email" name="email" />}

            <FormInput
              labelName="Password"
              name="password"
              require
              typeInput="password"
            />
            {/* {isLogin && (
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  span: 24,
                }}
              >
                <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
              </Form.Item>
            )} */}

            <Form.Item
              wrapperCol={{
                // offset: 8,
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </main>
        <footer>
          <Link to="/">Back to Home</Link>
          {" | "}
          <Link to={!isLogin ? "/login" : "/register"}>
            {!isLogin ? `Login` : `Register`}
          </Link>
        </footer>
      </>
    </section>
  );
};

export default Login;
