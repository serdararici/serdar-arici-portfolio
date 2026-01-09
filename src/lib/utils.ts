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
////////////////////////////////////////////////////
/**
 * Returns the correct field based on the current locale.
 * If locale is 'tr' and the localized field exists, it returns it.
 * Otherwise, it falls back to the default English field.
 */
export function getLocalized<T>(obj: T, field: string, locale: string): any {
  if (!obj) return "";
  
  // Check if we are in Turkish mode
  if (locale === 'tr') {
    const trValue = (obj as any)[`${field}_tr`];
    // If we have a Turkish translation, use it!
    if (trValue && (Array.isArray(trValue) ? trValue.length > 0 : trValue.trim() !== "")) {
      return trValue;
    }
  }
  
  // Fallback to default (English) field
  return (obj as any)[field];
}