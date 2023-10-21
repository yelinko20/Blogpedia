function maskEmail(email: string, numAsterisks: number) {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    // The email does not contain an '@' symbol, so return the original email
    return email;
  }

  const localPart = email.substring(0, atIndex);
  const domainPart = email.substring(atIndex);

  const maskedLocalPart =
    localPart.substring(0, numAsterisks) +
    "*".repeat(localPart.length - numAsterisks);

  return maskedLocalPart + domainPart;
}

export default maskEmail;
