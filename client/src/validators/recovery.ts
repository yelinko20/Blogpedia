import * as z from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Must be a valid email!" })
    .nonempty({ message: "This field is required" }),
});

export const secondFormSchema = z.object({
  otpCode: z
    .string()
    .nonempty("This field is required!")
    .min(6, { message: "Too short" })
    .max(6, { message: "Too long" }),
});

export const thirdFormSchema = z.object({
  newPassword: z
    .string()
    .nonempty("This field is required!")
    .min(8, { message: "Too short" }),
});
