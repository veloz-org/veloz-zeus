// environmental variables
const env = {
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/api"
      : "https://api.velozweb.dev",
  LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
};

export default env;
