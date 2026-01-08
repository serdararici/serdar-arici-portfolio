/**
 * Formats a date string into a localized 'Month Year' format.
 * @param dateString - ISO date string or null
 * @param locale - Current active locale ('tr' or 'en')
 * @param presentText - Translated "Present" text from JSON
 * @returns Formatted date
 */
export const formatDate = (
  dateString: string | null | undefined, 
  locale: string = 'en', 
  presentText: string = 'Present'
) => {
  // If no date, return the translated "Present" text
  if (!dateString) return presentText; 

  const date = new Date(dateString);
  
  // Safety check for invalid dates
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
  });
};

export const formatProjectDate = formatDate;