export const LEAVE_TYPES = ["CL", "EL", "LWP", "RH"];

export const LEAVE_TYPE_LABELS = {
  CL: "Casual Leave",
  EL: "Earned Leave",
  LWP: "Leave Without Pay",
  RH: "Restricted Holiday",
};

export const LEAVE_STATUS = {
  PENDING: "PENDING",
  MANAGER_APPROVED: "MANAGER_APPROVED",
  HR_APPROVED: "HR_APPROVED",
  REJECTED: "REJECTED",
};

export const STATUS_STYLES = {
  PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
  MANAGER_APPROVED: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  HR_APPROVED: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  REJECTED: "bg-rose-100 text-rose-700 border border-rose-200",
};

export const EMPLOYEES = [
  { id: "EMP001", name: "Ananya Sharma", managerId: "MGR001" },
  { id: "EMP002", name: "Rohan Verma", managerId: "MGR001" },
  { id: "EMP003", name: "Meera Nair", managerId: "MGR002" },
  { id: "MGR001", name: "Vikram Sethi", managerId: "HR001" },
  { id: "MGR002", name: "Neha Bansal", managerId: "HR001" },
];

export const HOLIDAYS = [
  { date: "2026-01-26", name: "Republic Day" },
  { date: "2026-03-14", name: "Holi" },
  { date: "2026-08-15", name: "Independence Day" },
  { date: "2026-10-02", name: "Gandhi Jayanti" },
  { date: "2026-12-25", name: "Christmas" },
];

export const INITIAL_BALANCES = [
  { employeeId: "EMP001", leaveType: "CL", year: 2026, totalAllocated: 10, used: 2, remaining: 8 },
  { employeeId: "EMP001", leaveType: "EL", year: 2026, totalAllocated: 15, used: 4, remaining: 11 },
  { employeeId: "EMP002", leaveType: "CL", year: 2026, totalAllocated: 10, used: 1, remaining: 9 },
  { employeeId: "EMP003", leaveType: "RH", year: 2026, totalAllocated: 4, used: 0, remaining: 4 },
];

export const INITIAL_REQUESTS = [
  {
    id: "LR-1001",
    employeeId: "EMP001",
    leaveType: "CL",
    startDate: "2026-04-18",
    endDate: "2026-04-19",
    totalDays: 2,
    status: "MANAGER_APPROVED",
    reason: "Family function",
    year: 2026,
    managerId: "MGR001",
  },
  {
    id: "LR-1002",
    employeeId: "EMP002",
    leaveType: "EL",
    startDate: "2026-05-02",
    endDate: "2026-05-04",
    totalDays: 2,
    status: "PENDING",
    reason: "Travel",
    year: 2026,
    managerId: "MGR001",
  },
];
