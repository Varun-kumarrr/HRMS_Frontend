// Leave type codes as per backend spec
export const LEAVE_TYPES = ['CL', 'EL', 'LWP', 'RH'];

export const LEAVE_TYPE_LABELS = {
  CL: 'Casual Leave',
  EL: 'Earned Leave',
  LWP: 'Leave Without Pay',
  RH: 'Restricted Holiday',
};

// Approval status flow: PENDING → MANAGER_APPROVED → HR_APPROVED / REJECTED
export const STATUS = {
  PENDING: 'PENDING',
  MANAGER_APPROVED: 'MANAGER_APPROVED',
  HR_APPROVED: 'HR_APPROVED',
  REJECTED: 'REJECTED',
};

export const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  MANAGER_APPROVED: 'bg-blue-100 text-blue-700 border-blue-200',
  HR_APPROVED: 'bg-green-100 text-green-700 border-green-200',
  REJECTED: 'bg-red-100 text-red-700 border-red-200',
};

export const STATUS_LABELS = {
  PENDING: 'Pending',
  MANAGER_APPROVED: 'Manager Approved',
  HR_APPROVED: 'HR Approved',
  REJECTED: 'Rejected',
};

export const ROLES = {
  HR: 'HR / Admin',
  MANAGER: 'Manager',
  EMPLOYEE: 'Employee',
};

// Tabs visible per role
export const ROLE_TABS = {
  [ROLES.HR]: ['Overview', 'Allocate Leave', 'Apply Leave', 'Approval Queue', 'Leave Balance', 'History', 'Holiday Calendar'],
  [ROLES.MANAGER]: ['Overview', 'Approval Queue', 'Leave Balance', 'History'],
  [ROLES.EMPLOYEE]: ['Overview', 'Apply Leave', 'Leave Balance', 'History'],
};

// Mock employees list
export const EMPLOYEES = [
  { id: 'E001', name: 'Rahul Kumar' },
  { id: 'E002', name: 'Priya Singh' },
  { id: 'E003', name: 'Amit Sharma' },
  { id: 'E004', name: 'Neha Gupta' },
];

// Current logged-in employee (mock)
export const CURRENT_EMPLOYEE_ID = 'E001';

// Pre-seeded leave balances: {id, employeeId, employeeName, leaveType, year, totalAllocated, used, remaining}
export const INITIAL_LEAVE_BALANCES = [
  { id: 1, employeeId: 'E001', employeeName: 'Rahul Kumar',  leaveType: 'CL', year: 2026, totalAllocated: 12, used: 2, remaining: 10 },
  { id: 2, employeeId: 'E001', employeeName: 'Rahul Kumar',  leaveType: 'EL', year: 2026, totalAllocated: 15, used: 0, remaining: 15 },
  { id: 3, employeeId: 'E001', employeeName: 'Rahul Kumar',  leaveType: 'RH', year: 2026, totalAllocated: 4,  used: 0, remaining: 4  },
  { id: 4, employeeId: 'E002', employeeName: 'Priya Singh',  leaveType: 'CL', year: 2026, totalAllocated: 12, used: 1, remaining: 11 },
  { id: 5, employeeId: 'E002', employeeName: 'Priya Singh',  leaveType: 'EL', year: 2026, totalAllocated: 15, used: 3, remaining: 12 },
  { id: 6, employeeId: 'E003', employeeName: 'Amit Sharma',  leaveType: 'CL', year: 2026, totalAllocated: 12, used: 0, remaining: 12 },
  { id: 7, employeeId: 'E003', employeeName: 'Amit Sharma',  leaveType: 'LWP', year: 2026, totalAllocated: 6,  used: 0, remaining: 6  },
];

// Pre-seeded leave requests
export const INITIAL_LEAVE_REQUESTS = [
  {
    id: 1,
    employeeId: 'E001',
    employeeName: 'Rahul Kumar',
    leaveType: 'CL',
    startDate: '2026-04-10',
    endDate: '2026-04-11',
    totalDays: 2,
    reason: 'Personal work',
    status: STATUS.HR_APPROVED,
  },
  {
    id: 2,
    employeeId: 'E002',
    employeeName: 'Priya Singh',
    leaveType: 'EL',
    startDate: '2026-04-18',
    endDate: '2026-04-18',
    totalDays: 1,
    reason: 'Family function',
    status: STATUS.PENDING,
  },
  {
    id: 3,
    employeeId: 'E003',
    employeeName: 'Amit Sharma',
    leaveType: 'CL',
    startDate: '2026-04-22',
    endDate: '2026-04-24',
    totalDays: 3,
    reason: 'Vacation',
    status: STATUS.MANAGER_APPROVED,
  },
  {
    id: 4,
    employeeId: 'E001',
    employeeName: 'Rahul Kumar',
    leaveType: 'RH',
    startDate: '2026-05-01',
    endDate: '2026-05-01',
    totalDays: 1,
    reason: 'Restricted holiday',
    status: STATUS.REJECTED,
  },
];

// Indian public holidays (2026)
export const HOLIDAYS = [
  { date: '2026-01-26', name: 'Republic Day' },
  { date: '2026-03-30', name: 'Holi' },
  { date: '2026-04-14', name: 'Dr. Ambedkar Jayanti' },
  { date: '2026-04-25', name: 'Good Friday' },
  { date: '2026-05-01', name: 'Maharashtra Day / Labour Day' },
  { date: '2026-08-15', name: 'Independence Day' },
  { date: '2026-10-02', name: 'Gandhi Jayanti' },
  { date: '2026-10-24', name: 'Dussehra' },
  { date: '2026-11-12', name: 'Diwali' },
  { date: '2026-12-25', name: 'Christmas Day' },
];
