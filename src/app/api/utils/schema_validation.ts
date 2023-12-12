import zod from "zod";

// Declare all your api server schema validations here

// registeration schema
export const registerSchema = zod.object({
  username: zod.string().min(3).max(50),
  email: zod.string().email(),
  password: zod.string().min(6).max(20),
});
