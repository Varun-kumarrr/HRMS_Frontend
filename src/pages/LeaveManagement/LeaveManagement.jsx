import { useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import { LEAVE_TABS, INITIAL_LEAVE_BALANCES, INITIAL_LEAVE_REQUESTS } from './constants';
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

  const [form, setForm] = useState({ type: 'Casual', from: '', to: '', reason: '', days: 0 });
  const [message, setMessage] = useState('');

  const calculateDays = (from, to) => {
    if (!from || !to) return 0;
    const a = new Date(from);
    const b = new Date(to);
    const diff = Math.round((b - a) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const onFormChange = (key, value) => {
    const next = { ...form, [key]: value };
    next.days = calculateDays(next.from, next.to);
    setForm(next);
    setMessage('');
  };

  const submitLeave = (e) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.reason.trim()) {
      setMessage('Please fill all fields');
      return;
    }
    if (form.days <= 0) {
      setMessage('Please choose valid date range');
      return;
    }
    if (form.days > (balances[form.type] || 0)) {
      setMessage('Insufficient leave balance');
      return;
    }

    const newReq = {
      id: Date.now(),
      employee: 'Current Employee',
      type: form.type,
      from: form.from,
      to: form.to,
      days: form.days,
      reason: form.reason,
      status: 'Pending',
    };

    setRequests((p) => [newReq, ...p]);
    setForm({ type: 'Casual', from: '', to: '', reason: '', days: 0 });
    setMessage('Leave request submitted');
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
          <ApplyLeaveForm form={form} onChange={onFormChange} onSubmit={submitLeave} balances={balances} message={message} />
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
