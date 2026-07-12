// Demo data for Form category components
// This file contains sample data used for component previews and documentation

const generateAvailableDates = (): Date[] => {
  const dates: Date[] = [];
  const now = new Date();
  // Walk through current and next month, only keeping weekdays (Mon-Fri)
  for (let m = 0; m <= 1; m += 1) {
    for (let d = 1; d <= 28; d += 2) {
      const date = new Date(now.getFullYear(), now.getMonth() + m, d);
      const day = date.getDay();
      if (day !== 0 && day !== 6) {
        dates.push(date);
      }
    }
  }
  return dates;
};

export const demoContactFormData = {
  submitLabel: "Send Message",
  subtitle: "We'd love to hear from you. Fill out the form below.",
  title: "Get in Touch",
};

export const demoIssueReportFormData = {
  attemptedActions: [
    "Restarted the application",
    "Cleared browser cache",
    "Restarted computer",
    "Checked internet connection",
    "Contacted a colleague",
  ],
  categories: {
    Access: ["Account", "Permissions", "Password Reset"],
    Hardware: ["Computer", "Monitor", "Keyboard", "Mouse", "Printer"],
    Network: ["Wi-Fi", "Ethernet", "VPN Access"],
    Software: ["Business App", "Email", "VPN", "Browser", "OS"],
  } as Record<string, string[]>,
  frequencies: [
    { label: "Constant", value: "constant" },
    { label: "Frequent", value: "frequent" },
    { label: "Occasional", value: "occasional" },
    { label: "Happened once", value: "once" },
  ],
  impacts: [
    { label: "Critical - Work stopped", value: "critical" },
    { label: "High - Major feature broken", value: "high" },
    { label: "Medium - Workaround available", value: "medium" },
    { label: "Low - Minor inconvenience", value: "low" },
  ],
  locations: ["New York - HQ", "San Francisco", "London", "Remote"],
  teams: ["Engineering", "Product", "Design", "Marketing", "Operations"],
  title: "Report an Issue",
  urgencies: [
    { label: "Immediate", value: "immediate" },
    { label: "Today", value: "today" },
    { label: "This week", value: "this-week" },
    { label: "No rush", value: "no-rush" },
  ],
};

export const demoDateTimePickerData = {
  availableDates: generateAvailableDates(),
  availableTimeSlots: [
    "9:00am",
    "10:00am",
    "11:30am",
    "1:00pm",
    "2:30pm",
    "4:00pm",
  ],
  timezone: "Eastern Time - US & Canada",
  title: "Select a Date & Time",
};
