// import crypto from "crypto";

// export default function generateOTPCode(length = 6) {
//   const buffer = crypto.randomBytes(length);
//   const otpCode = buffer.toString("hex").slice(0, length);
//   return otpCode;
// }

export default function generateOTPCode(length = 6) {
  const characters = "012345678";
  let otpCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otpCode += characters.charAt(randomIndex);
  }

  return otpCode;
}
