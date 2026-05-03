export const TIME_TRACKING_TABS = [
  "Overview",
  "Punch & Geofence",
  "Manual Requests",
  "Shift Management",
  "Reports",
];

export const INITIAL_MANUAL_REQUESTS = [
  {
    id: 1,
    date: "2026-04-24",
    type: "Missed Punch-In",
    reason: "Client call before office hours",
    employee: "Rahul Kumar",
    status: "Pending",
  },
  {
    id: 2,
    date: "2026-04-23",
    type: "Missed Punch-Out",
    reason: "Network issue during punch out",
    employee: "Priya Singh",
    status: "Approved",
  },
  {
    id: 3,
    date: "2026-04-22",
    type: "Regularization",
    reason: "Worked on weekend for production release",
    employee: "Amit Sharma",
    status: "Pending",
  },
];

export const ATTENDANCE_LOGS = [
  {
    id: 1,
    employee: "Rahul Kumar",
    date: "2026-04-24",
    shift: "General",
    inTime: "09:07",
    outTime: "18:16",
    overtime: "00:39",
    status: "Present",
  },
  {
    id: 2,
    employee: "Priya Singh",
    date: "2026-04-24",
    shift: "General",
    inTime: "09:58",
    outTime: "19:02",
    overtime: "00:04",
    status: "Late",
  },
  {
    id: 3,
    employee: "Amit Sharma",
    date: "2026-04-24",
    shift: "Evening",
    inTime: "13:01",
    outTime: "22:03",
    overtime: "00:02",
    status: "Present",
  },
  {
    id: 4,
    employee: "Neha Verma",
    date: "2026-04-24",
    shift: "General",
    inTime: "--",
    outTime: "--",
    overtime: "00:00",
    status: "Absent",
  },
];

export const SHIFT_TEMPLATE = [
  { day: "Monday", shift: "General", start: "09:00", end: "18:00" },
  { day: "Tuesday", shift: "General", start: "09:00", end: "18:00" },
  { day: "Wednesday", shift: "General", start: "09:00", end: "18:00" },
  { day: "Thursday", shift: "General", start: "09:00", end: "18:00" },
  { day: "Friday", shift: "General", start: "09:00", end: "18:00" },
  { day: "Saturday", shift: "Half Day", start: "10:00", end: "14:00" },
  { day: "Sunday", shift: "Off", start: "--", end: "--" },
];
