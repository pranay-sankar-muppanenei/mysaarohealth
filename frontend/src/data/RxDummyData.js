export const rxData = [
  { uid: "12345", name: "Sophia Clark", phone: "555-123-4567", lastVisit: "2023-11-15", category: "Follow-up" },
  { uid: "67890", name: "Ethan Miller", phone: "555-987-6543", lastVisit: "2023-11-10", category: "Emergency" },
  { uid: "24680", name: "Olivia Davis", phone: "555-246-8012", lastVisit: "2023-11-05", category: "Chronic" },
  { uid: "13579", name: "Liam Wilson", phone: "555-135-7924", lastVisit: "2023-10-30", category: "Follow-up" },
  { uid: "97531", name: "Ava Martinez", phone: "555-975-3146", lastVisit: "2023-10-25", category: "Emergency" },
  { uid: "86420", name: "Noah Anderson", phone: "555-864-2038", lastVisit: "2023-10-20", category: "Chronic" },
  { uid: "75309", name: "Isabella Taylor", phone: "555-753-0980", lastVisit: "2023-10-15", category: "Follow-up" },
  { uid: "36925", name: "Jackson Thomas", phone: "555-369-2582", lastVisit: "2023-10-10", category: "Emergency" },
  { uid: "48260", name: "Mia Moore", phone: "555-482-6014", lastVisit: "2023-10-05", category: "Chronic" },
  { uid: "59147", name: "Aiden Jackson", phone: "555-591-4736", lastVisit: "2023-09-30", category: "Follow-up" },
];

rxData.forEach((patient) => {
  patient.img = `/${patient.name}.png`;
});