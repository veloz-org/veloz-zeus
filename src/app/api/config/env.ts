// environmental variables
const env = {
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://api.velozweb.dev",
  LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
  LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
  CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
};

export default env;
