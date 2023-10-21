import { prisma } from "../lib/prisma";

// Function to generate a unique username based on the user's name
export default async function generateUsername(name: string) {
  // Remove spaces and convert to lowercase
  const formattedName = name.replace(/\s/g, "").toLowerCase();

  let username = formattedName;

  let randomInt = Math.floor(Math.random() * 1000);
  username = `@${formattedName}${randomInt}`;

  let existingUsername = await prisma.profile.findUnique({
    where: {
      username,
    },
  });

  let suffix = 1;
  while (existingUsername) {
    username = `${existingUsername.username}_0${suffix}`;
    suffix++;
  }

  return username;
}
