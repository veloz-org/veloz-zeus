import zod from "zod";

// Declare all your api server schema validations here

// registeration schema
export const registerSchema = zod.object({
  username: zod
    .string({
      required_error: "Username is required",
    })
    .min(3)
    .max(50),
  email: zod
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: zod
    .string({
      required_error: "Password must be at least 6 characters long",
    })
    .refine((data) => data.length >= 6, {
      message: "Password must be at least 6 characters long",
    }),
  // .min(6)
  // .max(20),
});

// create checkout schema
export const createCheckoutSchema = zod.object({
  product_id: zod.number({
    required_error: "Subscription product id is required",
  }),
});
