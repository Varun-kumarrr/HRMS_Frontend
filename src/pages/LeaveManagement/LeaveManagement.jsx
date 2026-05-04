import { useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import { LEAVE_TABS, INITIAL_LEAVE_BALANCES, INITIAL_LEAVE_REQUESTS, LEAVE_TYPES, CURRENT_EMPLOYEE_ID } from './constants';
import LeaveHeader from './components/LeaveHeader';
import LeaveTabs from './components/LeaveTabs';
import LeaveBalance from './components/LeaveBalance';
import ApplyLeaveForm from './components/ApplyLeaveForm';
import ApprovalQueue from './components/ApprovalQueue';
import LeaveHistory from './components/LeaveHistory';

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [balances, setBalances] = useState(INITIAL_LEAVE_BALANCES);
  const [requests, setRequests] = useState(INITIAL_LEAVE_REQUESTS);

  const currentEmployeeId = CURRENT_EMPLOYEE_ID;
  const currentYear = new Date().getFullYear();
  
  const [form, setForm] = useState({ 
    leaveType: LEAVE_TYPES[0], 
    startDate: '', 
    endDate: '', 
    reason: '', 
    totalDays: 0 
  });
  const [message, setMessage] = useState(null);

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const a = new Date(startDate);
    const b = new Date(endDate);
    if (a > b) return 0;
    const diff = Math.round((b - a) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const onFormChange = (key, value) => {
    const next = { ...form, [key]: value };
    if (key === 'startDate' || key === 'endDate') {
      next.totalDays = calculateDays(next.startDate, next.endDate);
    }
    setForm(next);
    setMessage(null);
  };

  const submitLeave = (e) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate || !form.reason.trim()) {
      setMessage({ type: 'error', text: 'Please fill all fields' });
      return;
    }
    if (form.totalDays <= 0) {
      setMessage({ type: 'error', text: 'Please choose valid date range' });
      return;
    }
    
    const balanceRecord = balances.find(
      b => b.employeeId === currentEmployeeId && 
           b.leaveType === form.leaveType && 
           b.year === currentYear
    );
    
    if (!balanceRecord) {
      setMessage({ type: 'error', text: 'Leave type not allocated' });
      return;
    }

    if (form.totalDays > balanceRecord.remaining) {
      setMessage({ type: 'error', text: 'Insufficient leave balance' });
      return;
    }

    const newReq = {
      id: Date.now(),
      employeeId: currentEmployeeId,
      employee: 'Current Employee',
      leaveType: form.leaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      totalDays: form.totalDays,
      reason: form.reason,
      status: 'Pending',
    };

    setRequests((p) => [newReq, ...p]);
    setBalances(p => p.map(b => 
      b.employeeId === currentEmployeeId && 
      b.leaveType === form.leaveType && 
      b.year === currentYear 
        ? { ...b, remaining: b.remaining - form.totalDays, used: b.used + form.totalDays }
        : b
    ));
    setForm({ leaveType: LEAVE_TYPES[0], startDate: '', endDate: '', reason: '', totalDays: 0 });
    setMessage({ type: 'success', text: 'Leave request submitted' });
    setActiveTab('Approvals');
  };

  const updateRequestStatus = (id, status) => {
    setRequests((p) => p.map(r => r.id===id ? { ...r, status } : r));
    if (status === 'Approved') {
      const req = requests.find(r => r.id === id);
      if (req) setBalances((b) => ({ ...b, [req.type]: (b[req.type] || 0) - req.days }));
    }
  };

  const overviewStats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter(r => r.status==='Pending').length;
    const approved = requests.filter(r => r.status==='Approved').length;
    return { total, pending, approved };
  }, [requests]);

  return (
    <Layout>
      <div className="space-y-6">
        <LeaveHeader />
        <LeaveTabs tabs={LEAVE_TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border"> 
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold">{overviewStats.total}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border"> 
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{overviewStats.pending}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border"> 
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-green-600">{overviewStats.approved}</p>
            </div>
          </div>
        )}

        {activeTab === 'Apply Leave' && (
          <ApplyLeaveForm 
            form={form} 
            onChange={onFormChange} 
            onSubmit={submitLeave} 
            balances={balances}
            currentEmployeeId={currentEmployeeId}
            message={message} 
          />
        )}

        {activeTab === 'Approvals' && (
          <ApprovalQueue requests={requests.filter(r=>r.status!=='Approved' && r.status!=='Rejected')} onUpdateStatus={updateRequestStatus} />
        )}

        {activeTab === 'History' && (
          <LeaveHistory requests={requests} />
        )}

        {activeTab === 'Balance' && (
          <LeaveBalance balances={balances} />
        )}
      </div>
    </Layout>
  );
};

export default LeaveManagement;
