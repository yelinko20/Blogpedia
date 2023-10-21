import * as z from "zod";

export const postValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least one characters long" })
    .max(125, { message: "Title must be less than 128 characters long" }),
  authorId: z.string(),
  published: z.boolean(),
  content: z.any(),
  tags: z.string().array().nonempty({ message: "needed at least one tag" }),
});
