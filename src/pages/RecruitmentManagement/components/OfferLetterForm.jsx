import { useState } from 'react';

const OfferLetterForm = ({ candidates, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    candidateId: '',
    jobId: '',
    designation: '',
    department: '',
    reportingTo: '',
    ctc: '',
    currency: 'INR',
    joiningDate: '',
    expiryDate: '',
    additionalBenefits: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const departments = ['Engineering', 'Product', 'Design', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
  const managers = [
    { id: 'MGR001', name: 'Engineering Manager', dept: 'Engineering' },
    { id: 'MGR002', name: 'Product Manager', dept: 'Product' },
    { id: 'MGR003', name: 'Design Lead', dept: 'Design' },
    { id: 'MGR004', name: 'Sales Manager', dept: 'Sales' },
  ];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.candidateId) newErrors.candidateId = 'Candidate is required';
    if (!form.designation.trim()) newErrors.designation = 'Designation is required';
    if (!form.department) newErrors.department = 'Department is required';
    if (!form.ctc) newErrors.ctc = 'CTC is required';
    if (!form.joiningDate) newErrors.joiningDate = 'Joining date is required';
    if (!form.expiryDate) newErrors.expiryDate = 'Offer expiry date is required';
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

    const payload = {
      candidateId: parseInt(form.candidateId),
      candidateName: candidate.name,
      jobId: form.jobId,
      jobTitle: form.designation,
      ...form,
      ctc: parseFloat(form.ctc),
      status: 'Pending',
      createdDate: new Date().toISOString().slice(0, 10),
    };

    onSubmit(payload);
    setForm({
      candidateId: '',
      jobId: '',
      designation: '',
      department: '',
      reportingTo: '',
      ctc: '',
      currency: 'INR',
      joiningDate: '',
      expiryDate: '',
      additionalBenefits: '',
    });
    setMessage({ type: 'success', text: 'Offer letter created successfully' });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Generate Offer Letter</h3>
        <p className="mt-1 text-sm text-slate-500">Craft a polished offer in a guided, premium-looking form.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Candidate Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Candidate *</label>
            <select
              value={form.candidateId}
              onChange={(e) => {
                const candidateId = e.target.value;
                const candidate = candidates.find((c) => c.id === parseInt(candidateId));
                handleChange('candidateId', candidateId);
                if (candidate) {
                  handleChange('jobId', candidate.jobId);
                  handleChange('designation', candidate.jobTitle);
                }
              }}
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
            <label className="mb-1 block text-sm font-medium text-slate-700">Job Title *</label>
            <input
              type="text"
              value={form.designation}
              onChange={(e) => handleChange('designation', e.target.value)}
              className={`w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.designation ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="e.g., Senior React Developer"
            />
            {errors.designation && <p className="text-red-600 text-xs mt-1">{errors.designation}</p>}
          </div>
        </div>

        {/* Department and Manager */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Department *</label>
            <select
              value={form.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className={`w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.department ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && <p className="text-red-600 text-xs mt-1">{errors.department}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Reporting Manager</label>
            <select
              value={form.reportingTo}
              onChange={(e) => handleChange('reportingTo', e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <option value="">Select Manager</option>
              {managers.map((mgr) => (
                <option key={mgr.id} value={mgr.name}>
                  {mgr.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Salary and Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">CTC (Annual) *</label>
            <div className="flex gap-2">
              <select
                value={form.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-24 rounded-xl border border-slate-300 px-2 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              <input
                type="number"
                value={form.ctc}
                onChange={(e) => handleChange('ctc', e.target.value)}
                className={`flex-1 rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                  errors.ctc ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="0"
              />
            </div>
            {errors.ctc && <p className="text-red-600 text-xs mt-1">{errors.ctc}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Joining Date *</label>
            <input
              type="date"
              value={form.joiningDate}
              onChange={(e) => handleChange('joiningDate', e.target.value)}
              className={`w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.joiningDate ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.joiningDate && <p className="text-red-600 text-xs mt-1">{errors.joiningDate}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Offer Expiry *</label>
            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              className={`w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400 ${
                errors.expiryDate ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.expiryDate && <p className="text-red-600 text-xs mt-1">{errors.expiryDate}</p>}
          </div>
        </div>

        {/* Additional Benefits */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Additional Benefits & Terms</label>
          <textarea
            rows={4}
            value={form.additionalBenefits}
            onChange={(e) => handleChange('additionalBenefits', e.target.value)}
            className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-400"
            placeholder="e.g., Health Insurance, Flexible Working, Stock Options, etc."
          />
        </div>

        {/* Message */}
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

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-slate-950 py-2.5 font-semibold text-white transition hover:bg-slate-800"
          >
            Generate Offer Letter
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

export default OfferLetterForm;
