import moment from "moment";

function FormatTime(publishedAt?: string) {
  if (!publishedAt) {
    return ""; // Handle the case where publishedAt is not provided.
  }

  const currentDate = moment(); // Current date and time
  const publishTime = moment(publishedAt);

  // Calculate the difference in days between currentDate and publishTime
  const daysDifference = currentDate.diff(publishTime, "days");

  if (daysDifference === 0) {
    // If published today, format as "hh:mma" (e.g., 11:00AM) with "today at"
    return `Today at ${publishTime.format("hh:mma")}`;
  } else if (daysDifference === 1) {
    // If published yesterday, format as "hh:mma" (e.g., 11:00AM) with "yesterday at"
    return `Yesterday at ${publishTime.format("hh:mma")}`;
  } else if (daysDifference <= 7) {
    // If published within the last week, format as "ddd hh:mma" (e.g., Sun 11:00AM)
    return publishTime.format("ddd hh:mma");
  } else {
    // For dates older than a week, format as "ll hh:mma" (e.g., Oct 1, 2023 11:00AM)
    return publishTime.format("ll hh:mma");
  }
}

export default FormatTime;
