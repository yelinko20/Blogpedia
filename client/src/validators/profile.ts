import * as z from "zod";
export const profileModalValidator = z.object({
  name: z.string().nonempty("Username is required"),
  image: z.string().optional(),
  bio: z
    .string()
    .min(1, { message: "Bio is too short" })
    .max(100, { message: "Bio is too long" })
    .nonempty({ message: "Bio is required" }),
});
