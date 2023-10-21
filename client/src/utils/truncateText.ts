export const truncateText = (
  text: string,
  maxWords: number,
  maxLength: number
): string => {
  if (text.length <= maxLength) {
    return text;
  }

  // Split text into words and remove empty entries
  const words = text.split(" ").filter((word) => word);

  // If the text is too long, reduce it to maxWords number of words
  if (words.length > maxWords) {
    words.splice(maxWords);
  }

  const truncatedText = words.join(" ");

  // If the truncated text is still too long, further reduce its length
  if (truncatedText.length > maxLength) {
    return truncatedText.substring(0, maxLength) + "...";
  }

  return truncatedText;
};
