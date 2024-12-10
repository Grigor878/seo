import axios from "axios";

// const baseURL =
//   process.env.NODE_ENV === "development"
//     ? process.env.REACT_APP_BASE_API_DEV || process.env.REACT_APP_BASE_API_DEV2
//     : process.env.REACT_APP_BASE_API_RELEASE;

// const instance = axios.create({
//   baseURL,
// });

const getBaseURL = () => {
  if (process.env.NODE_ENV === "development") {
    return (
      process.env.REACT_APP_BASE_API_DEV || process.env.REACT_APP_BASE_API_DEV2
    );
  } else {
    return process.env.REACT_APP_BASE_API_RELEASE;
  }
};

const instance = axios.create({
  baseURL: getBaseURL(),
});

export default instance;
