import * as z from "zod";

export const loginFormValidator = z.object({
  email: z
    .string()
    .nonempty("This is required!")
    .email({ message: "Must be a valid email!" }),
  password: z
    .string()
    .nonempty("This is required!")
    .min(8, { message: "Too Short" }),
});

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*()_])[A-Za-z\d@#$%^&+=!*()_]{8,}$/;

export const registerFormValidator = z.object({
  name: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(50, "Username must not exceed 50 characters")
    .nonempty("This field is required!"),
  email: z
    .string()
    .nonempty("This field is required!")
    .email({ message: "Must be a valid email!" }),
  password: z
    .string()
    .nonempty("This field is required!")
    .min(6, { message: "Password must be at least 8 characters long" })
    .regex(strongPasswordRegex, {
      message:
        "Password must be strong (at least 1 uppercase, 1 lowercase, 1 digit, 1 special character)",
    }),
});
