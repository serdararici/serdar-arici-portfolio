// src/lib/utils.ts veya bileşenin içinde
export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "Present"; // Veya "Devam Ediyor"

  const date = new Date(dateString);
  
  // Geçersiz tarih kontrolü (isNaN kontrolü)
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
};

// Alias kept for clarity: used by project components as requested
export const formatProjectDate = formatDate;

