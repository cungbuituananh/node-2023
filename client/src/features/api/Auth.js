const { API } = require("./config");

const api = new API();

const Auth = {
  login: () => {
    return api.post("/auth/login");
  },
};

export default Auth;
