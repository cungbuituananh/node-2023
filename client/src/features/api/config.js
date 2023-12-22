import axios from "axios";

const axiosInstance = axios.create();

// Handle every request
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("config: ", config);

    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// Handle response
axiosInstance.interceptors.response.use(
  async function (response) {
    return handleResponse(response);
  },
  async function (err) {
    return handleError(err);
  }
);

const handleResponse = (response) => {
  console.log("response: ", response);
};

const handleError = (error) => {
  console.log("response: ", error);
};

export class API {
  axiosApi = axiosInstance;

  constructor(axiosApi) {
    if (axiosApi) {
      this.axiosApi = axiosApi;
    }
    this.get = this.get.bind(this);
    this.post = this.post.bind(this);
  }

  get = (url, params, config) => {
    const queryString = params
      ? Object.keys(params).map((key) => `${key}=${params[key]}`)
      : "";

    return this.axiosApi.get(`${url}?${queryString}`, config);
  };

  post = (url, payload, config) => {
    return this.axiosApi.post(url, payload, config);
  };
}
