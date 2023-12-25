import { Button, Form, message } from "antd";
import FormInput from "common/components/forms/FormInput";
import { setCredentials } from "features/redux/slices/authSlice";
import {
  useLoginMutation,
  useRegisterUserMutation,
} from "features/services/authService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ isLogin = true }) => {
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (values) => {
    try {
      await registerUser(values);
      messageApi.open({
        type: "success",
        content: "Create new user successful",
      });
      navigate("/login");
    } catch (error) {
      console.log("error register: ", error);
      messageApi.open({
        type: "error",
        content: error,
      });
    }
  };

  const handleLogin = async (values) => {
    try {
      const { accessToken } = await login(values).unwrap();
      dispatch(setCredentials({ accessToken }));
      messageApi.open({
        type: "success",
        content: "Login successful",
      });
      navigate("/home");
    } catch (error) {
      if (!error.status) {
        messageApi.open({
          type: "error",
          content: "No Server Response",
        });
      } else if (error.status === 400) {
        messageApi.open({
          type: "error",
          content: "Missing Username or Password",
        });
      } else if (error.status === 401) {
        console.log("error.status: ", error.status);
        messageApi.open({
          type: "error",
          content: "Unauthorized",
        });
      } else {
        messageApi.open({
          type: "error",
          content: error.data?.message,
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <section className="public">
        <header>
          <h1>{isLogin ? "Login" : "Signup"}</h1>
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
      </section>
    </>
  );
};

export default Login;
