import TextField from "common/components/forms/CoreInput";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const handleOnSubmit = (values) => {
    console.log("values: ", values);
  };

  const form = useForm();
  const { handleSubmit } = form;

  return (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <FormProvider {...form}>
          <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
            <TextField name="username" />
            <TextField name="password" />
            <button className="form__submit-button">Sign In</button>

            <label htmlFor="persist" className="form__persist">
              {/* <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            /> */}
              Trust This Device
            </label>
          </form>
        </FormProvider>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
};

export default Login;
