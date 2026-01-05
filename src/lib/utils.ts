/**
 * Formats a date string into a readable 'Month Year' format.
 * Includes safety checks for null values and invalid dates.
 * @param dateString - ISO date string or null
 * @returns Formatted date or "Present"
 */
export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "Present"; 

  const date = new Date(dateString);
  
  // Check for invalid date objects
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', // Use 'short' for Dec, 'long' for December
  });
};

export const formatProjectDate = formatDate;