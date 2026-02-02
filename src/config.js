// Centralized config helper — read public env variables here
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
const ENV = process.env.REACT_APP_ENV || "development";

export default {
  FRONTEND_URL,
  BACKEND_URL,
  ENV,
};
