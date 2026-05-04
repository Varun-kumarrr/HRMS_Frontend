export const PAYROLL_TABS = [
  "Overview",
  "Salary Structure",
  "Payroll Run",
  "Payslips",
  "Loans & Advances",
  "Form 16",
];

export const INITIAL_ALLOWANCES = [
  { id: 1, label: "HRA", amount: 12000 },
  { id: 2, label: "Conveyance", amount: 2500 },
];

export const INITIAL_DEDUCTIONS = [
  { id: 1, label: "PF", amount: 1800 },
  { id: 2, label: "Professional Tax", amount: 200 },
];

export const INITIAL_PAYROLL_EMPLOYEES = [
  {
    id: 1,
    employee: "Rahul Kumar",
    department: "Engineering",
    role: "Developer",
    baseSalary: 45000,
    daysPresent: 22,
    lopDays: 0,
    overtimePay: 1200,
    status: "Ready",
  },
  {
    id: 2,
    employee: "Priya Singh",
    department: "HR",
    role: "HR Executive",
    baseSalary: 38000,
    daysPresent: 21,
    lopDays: 1,
    overtimePay: 0,
    status: "Ready",
  },
  {
    id: 3,
    employee: "Amit Sharma",
    department: "Operations",
    role: "Manager",
    baseSalary: 62000,
    daysPresent: 23,
    lopDays: 0,
    overtimePay: 2200,
    status: "Ready",
  },
  {
    id: 4,
    employee: "Neha Verma",
    department: "Design",
    role: "Designer",
    baseSalary: 42000,
    daysPresent: 20,
    lopDays: 2,
    overtimePay: 600,
    status: "Pending Review",
  },
];

export const INITIAL_LOAN_REQUESTS = [
  {
    id: 1,
    employee: "Rahul Kumar",
    amount: 25000,
    tenure: 6,
    status: "Approved",
    purpose: "Bike repair",
  },
  {
    id: 2,
    employee: "Priya Singh",
    amount: 12000,
    tenure: 4,
    status: "Pending",
    purpose: "Medical expense",
  },
];

export const INITIAL_FORM16_RECORDS = [
  { id: 1, fiscalYear: "2024-25", status: "Ready", generatedOn: "2026-04-15" },
  { id: 2, fiscalYear: "2023-24", status: "Downloaded", generatedOn: "2025-04-15" },
];
