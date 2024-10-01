export default function formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    // Get the day of the month
    const day = date.getDate();
    
    // Get the month (Months are zero-indexed, so add 1)
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    
    // Get the year
    const year = date.getFullYear();
    
    // Function to get the correct suffix for the day
    function getOrdinalSuffix(n: number): string {
      if (n > 3 && n < 21) return "th"; // For 11th to 19th
      switch (n % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    }
  
    // Format the day with the suffix
    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
    
    // Return the final formatted string
    return `${dayWithSuffix} ${month}, ${year}`;
  }
  
  // Example usage:
  