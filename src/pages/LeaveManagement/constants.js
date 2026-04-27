export const LEAVE_TABS = [
  "Overview",
  "Apply Leave",
  "Approvals",
  "History",
  "Balance",
];

export const INITIAL_LEAVE_BALANCES = {
  "Casual": 6,
  "Sick": 8,
  "Earned": 12,
};

export const INITIAL_LEAVE_REQUESTS = [
  {
    id: 1,
    employee: "Rahul Kumar",
    type: "Casual",
    from: "2026-04-10",
    to: "2026-04-11",
    days: 2,
    reason: "Personal work",
    status: "Approved",
  },
  {
    id: 2,
    employee: "Priya Singh",
    type: "Sick",
    from: "2026-04-18",
    to: "2026-04-18",
    days: 1,
    reason: "Fever",
    status: "Pending",
  },
];
