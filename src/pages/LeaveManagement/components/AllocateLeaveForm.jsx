import { useState } from 'react';
import { LEAVE_TYPES, LEAVE_TYPE_LABELS, EMPLOYEES } from '../constants';

const currentYear = new Date().getFullYear();
const YEARS = [currentYear, currentYear + 1];

const EMPTY_FORM = {
  employeeId: EMPLOYEES[0].id,
  leaveType: LEAVE_TYPES[0],
  year: currentYear,
  totalAllocated: '',
};

const AllocateLeaveForm = ({ onAllocate, balances }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState({ text: '', type: '' });

  const change = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setMessage({ text: '', type: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const days = parseInt(form.totalAllocated, 10);
    if (!days || days <= 0) {
      setMessage({ text: 'Please enter a valid number of days.', type: 'error' });
      return;
    }
    const exists = balances.find(
      (b) =>
        b.employeeId === form.employeeId &&
        b.leaveType === form.leaveType &&
        b.year === Number(form.year)
    );
    if (exists) {
      setMessage({ text: 'Leave already allocated for this employee / type / year. Use the table to view or edit.', type: 'error' });
      return;
    }
    const employee = EMPLOYEES.find((emp) => emp.id === form.employeeId);
    onAllocate({
      employeeId: form.employeeId,
      employeeName: employee.name,
      leaveType: form.leaveType,
      year: Number(form.year),
      totalAllocated: days,
      used: 0,
      remaining: days,
    });
    setForm(EMPTY_FORM);
    setMessage({ text: 'Leave balance allocated successfully!', type: 'success' });
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800">Allocate Leave Balance</h3>
      <p className="text-sm text-gray-500 mt-1">Assign leave quota to an employee for a given year.</p>

      <form className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Employee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
          <select
            value={form.employeeId}
            onChange={(e) => change('employeeId', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {EMPLOYEES.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.id})
              </option>
            ))}
          </select>
        </div>

        {/* Leave Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
          <select
            value={form.leaveType}
            onChange={(e) => change('leaveType', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LEAVE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t} — {LEAVE_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select
            value={form.year}
            onChange={(e) => change('year', Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Total Allocated Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Allocated Days</label>
          <input
            type="number"
            min={1}
            max={365}
            value={form.totalAllocated}
            onChange={(e) => change('totalAllocated', e.target.value)}
            placeholder="e.g. 12"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          {message.text && (
            <p
              className={`mb-3 text-sm rounded-lg px-3 py-2.5 border ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}
            >
              {message.text}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Allocate Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default AllocateLeaveForm;
