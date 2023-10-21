import validator from "validator"; // Import the validator library

function validateEmail(email: string) {
  return validator.isEmail(email);
}

export default validateEmail;
