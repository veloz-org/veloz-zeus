// environmental variables
const env = {
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://veloz-zeus.tryveloz.com",
  LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
  LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
  MAIL_FROM: process.env.MAIL_FROM!,
};

export default env;
