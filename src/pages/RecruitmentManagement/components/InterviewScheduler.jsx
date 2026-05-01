import { useState } from 'react';
import { INTERVIEW_TYPES } from '../constants';

const InterviewScheduler = ({ candidates, onSchedule, onCancel }) => {
  const [form, setForm] = useState({
    candidateId: '',
    interviewType: 'Technical',
    scheduledDate: '',
    scheduledTime: '10:00',
    interviewerId: '',
    duration: 60,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const interviewers = [
    { id: 'HR001', name: 'Neha Sharma' },
    { id: 'MGR001', name: 'Rajesh Kumar' },
    { id: 'MGR002', name: 'Priya Singh' },
  ];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.candidateId) newErrors.candidateId = 'Candidate is required';
    if (!form.scheduledDate) newErrors.scheduledDate = 'Date is required';
    if (!form.interviewerId) newErrors.interviewerId = 'Interviewer is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setMessage({ type: 'error', text: 'Please fill all required fields' });
      return;
    }

    const candidate = candidates.find((c) => c.id === parseInt(form.candidateId));
    const interviewer = interviewers.find((i) => i.id === form.interviewerId);

    const payload = {
      ...form,
      candidateId: parseInt(form.candidateId),
      interviewerId: form.interviewerId,
      interviewerName: interviewer.name,
      candidateName: candidate.name,
      jobTitle: candidate.jobTitle,
      status: 'Scheduled',
      feedback: null,
      rating: 0,
    };

    onSchedule(payload);
    setForm({
      candidateId: '',
      interviewType: 'Technical',
      scheduledDate: '',
      scheduledTime: '10:00',
      interviewerId: '',
      duration: 60,
    });
    setMessage({ type: 'success', text: 'Interview scheduled successfully' });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Schedule Interview</h3>
        <p className="mt-1 text-sm text-slate-500">Pick a candidate, interviewer, and slot to create a clean schedule entry.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Candidate *</label>
            <select
              value={form.candidateId}
              onChange={(e) => handleChange('candidateId', e.target.value)}
              className={`w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.candidateId ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Select Candidate</option>
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.jobTitle}
                </option>
              ))}
            </select>
            {errors.candidateId && <p className="text-red-600 text-xs mt-1">{errors.candidateId}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Interview Type</label>
            <select
              value={form.interviewType}
              onChange={(e) => handleChange('interviewType', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              {INTERVIEW_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Date *</label>
            <input
              type="date"
              value={form.scheduledDate}
              onChange={(e) => handleChange('scheduledDate', e.target.value)}
              className={`w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.scheduledDate ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.scheduledDate && <p className="text-red-600 text-xs mt-1">{errors.scheduledDate}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Time</label>
            <input
              type="time"
              value={form.scheduledTime}
              onChange={(e) => handleChange('scheduledTime', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Interviewer *</label>
            <select
              value={form.interviewerId}
              onChange={(e) => handleChange('interviewerId', e.target.value)}
              className={`w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.interviewerId ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Select Interviewer</option>
              {interviewers.map((int) => (
                <option key={int.id} value={int.id}>
                  {int.name}
                </option>
              ))}
            </select>
            {errors.interviewerId && <p className="text-red-600 text-xs mt-1">{errors.interviewerId}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Duration (minutes)</label>
            <input
              type="number"
              value={form.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400"
              min="15"
              step="15"
            />
          </div>
        </div>

        {message && (
          <p
            className={`rounded-xl border px-3 py-2.5 text-sm ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-slate-950 py-2.5 font-semibold text-white transition hover:bg-slate-800"
          >
            Schedule Interview
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-300 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewScheduler;
