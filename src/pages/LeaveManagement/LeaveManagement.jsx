import { useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import {
  ROLE_TABS,
  ROLES,
  INITIAL_LEAVE_BALANCES,
  INITIAL_LEAVE_REQUESTS,
  STATUS,
  CURRENT_EMPLOYEE_ID,
  HOLIDAYS,
  EMPLOYEES,
} from './constants';
import LeaveHeader from './components/LeaveHeader';
import LeaveTabs from './components/LeaveTabs';
import LeaveBalance from './components/LeaveBalance';
import ApplyLeaveForm from './components/ApplyLeaveForm';
import ApprovalQueue from './components/ApprovalQueue';
import LeaveHistory from './components/LeaveHistory';
import AllocateLeaveForm from './components/AllocateLeaveForm';
import HolidayCalendar from './components/HolidayCalendar';

const currentEmployee = EMPLOYEES.find((e) => e.id === CURRENT_EMPLOYEE_ID);

// Compute working days between two dates, excluding weekends and public holidays
const holidaySet = new Set(HOLIDAYS.map((h) => h.date));
const countWorkingDays = (start, end) => {
  if (!start || !end) return 0;
  let count = 0;
  const cur = new Date(start + 'T00:00:00');
  const last = new Date(end + 'T00:00:00');
  if (last < cur) return 0;
  while (cur <= last) {
    const dow = cur.getDay();
    const ds = cur.toISOString().slice(0, 10);
    if (dow !== 0 && dow !== 6 && !holidaySet.has(ds)) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
};

const EMPTY_FORM = {
  leaveType: 'CL',
  startDate: '',
  endDate: '',
  totalDays: 0,
  reason: '',
};

const LeaveManagement = () => {
  const [role, setRole] = useState(ROLES.HR);
  const [activeTab, setActiveTab] = useState('Overview');
  const [balances, setBalances] = useState(INITIAL_LEAVE_BALANCES);
  const [requests, setRequests] = useState(INITIAL_LEAVE_REQUESTS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [applyMessage, setApplyMessage] = useState(null);

  // Switch role: reset to first tab
  const handleRoleChange = (r) => {
    setRole(r);
    setActiveTab(ROLE_TABS[r][0]);
  };

  // Overview stats
  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter((r) => r.status === STATUS.PENDING).length,
    managerApproved: requests.filter((r) => r.status === STATUS.MANAGER_APPROVED).length,
    hrApproved: requests.filter((r) => r.status === STATUS.HR_APPROVED).length,
    rejected: requests.filter((r) => r.status === STATUS.REJECTED).length,
  }), [requests]);

  // Apply Leave form changes
  const onFormChange = (key, value) => {
    setApplyMessage(null);
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === 'startDate' || key === 'endDate') {
        next.totalDays = countWorkingDays(
          key === 'startDate' ? value : f.startDate,
          key === 'endDate' ? value : f.endDate
        );
      }
      return next;
    });
  };

  const submitLeave = (e) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate) {
      setApplyMessage({ text: 'Please select start and end dates.', type: 'error' });
      return;
    }
    if (form.totalDays <= 0) {
      setApplyMessage({ text: 'Please choose a valid date range (no working days selected).', type: 'error' });
      return;
    }
    if (!form.reason.trim()) {
      setApplyMessage({ text: 'Please provide a reason.', type: 'error' });
      return;
    }
    const year = new Date(form.startDate).getFullYear();
    const balanceRecord = balances.find(
      (b) =>
        b.employeeId === CURRENT_EMPLOYEE_ID &&
        b.leaveType === form.leaveType &&
        b.year === year
    );
    if (!balanceRecord) {
      setApplyMessage({ text: `No leave balance allocated for ${form.leaveType} in ${year}.`, type: 'error' });
      return;
    }
    if (form.totalDays > balanceRecord.remaining) {
      setApplyMessage({
        text: `Insufficient balance. Requested ${form.totalDays} days but only ${balanceRecord.remaining} days remaining.`,
        type: 'error',
      });
      return;
    }
    const newReq = {
      id: Date.now(),
      employeeId: CURRENT_EMPLOYEE_ID,
      employeeName: currentEmployee ? currentEmployee.name : CURRENT_EMPLOYEE_ID,
      leaveType: form.leaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      totalDays: form.totalDays,
      reason: form.reason,
      status: STATUS.PENDING,
    };
    setRequests((prev) => [newReq, ...prev]);
    setForm(EMPTY_FORM);
    setApplyMessage({ text: 'Leave request submitted successfully! Awaiting manager approval.', type: 'success' });
  };

  // Approval flow: PENDING → MANAGER_APPROVED → HR_APPROVED / REJECTED
  // Deduction ONLY on HR_APPROVED
  const updateRequestStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (newStatus === STATUS.HR_APPROVED) {
      const req = requests.find((r) => r.id === id);
      if (req) {
        setBalances((prev) =>
          prev.map((b) =>
            b.employeeId === req.employeeId &&
            b.leaveType === req.leaveType &&
            b.year === new Date(req.startDate).getFullYear()
              ? {
                  ...b,
                  used: b.used + req.totalDays,
                  remaining: b.totalAllocated - (b.used + req.totalDays),
                }
              : b
          )
        );
      }
    }
  };

  // HR: add new leave balance allocation
  const allocateLeave = (record) => {
    setBalances((prev) => [
      ...prev,
      { id: Date.now(), ...record },
    ]);
  };

  const tabs = ROLE_TABS[role];
  const employeeFilter = role === ROLES.EMPLOYEE ? CURRENT_EMPLOYEE_ID : null;

  return (
    <Layout>
      <div className="space-y-5">
        <LeaveHeader role={role} onRoleChange={handleRoleChange} stats={stats} />
        <LeaveTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ── Overview ── */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Requests', value: stats.total, color: 'text-gray-800', bg: 'bg-gray-50' },
              { label: 'Pending',        value: stats.pending,         color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Manager Approved', value: stats.managerApproved, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'HR Approved',    value: stats.hrApproved,      color: 'text-green-600', bg: 'bg-green-50' },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-2xl border border-gray-100 p-5 shadow-sm`}>
                <p className="text-sm text-gray-500">{label}</p>
                <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Allocate Leave (HR only) ── */}
        {activeTab === 'Allocate Leave' && (
          <>
            <AllocateLeaveForm onAllocate={allocateLeave} balances={balances} />
            <LeaveBalance balances={balances} />
          </>
        )}

        {/* ── Apply Leave ── */}
        {activeTab === 'Apply Leave' && (
          <ApplyLeaveForm
            form={form}
            onChange={onFormChange}
            onSubmit={submitLeave}
            balances={balances}
            currentEmployeeId={CURRENT_EMPLOYEE_ID}
            message={applyMessage}
          />
        )}

        {/* ── Approval Queue ── */}
        {activeTab === 'Approval Queue' && (
          <ApprovalQueue
            requests={requests}
            onUpdateStatus={updateRequestStatus}
            role={role}
          />
        )}

        {/* ── Leave Balance ── */}
        {activeTab === 'Leave Balance' && (
          <LeaveBalance balances={balances} employeeFilter={employeeFilter} />
        )}

        {/* ── History ── */}
        {activeTab === 'History' && (
          <LeaveHistory requests={requests} employeeFilter={employeeFilter} />
        )}

        {/* ── Holiday Calendar ── */}
        {activeTab === 'Holiday Calendar' && <HolidayCalendar />}
      </div>
    </Layout>
  );
};

export default LeaveManagement;
