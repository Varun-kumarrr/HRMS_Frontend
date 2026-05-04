import { useState } from 'react';
import {
  DEPARTMENTS,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  JOB_STATUS,
} from '../constants';

const JobPostingForm = ({ job, onSubmit, onCancel, isEdit }) => {
  const [form, setForm] = useState(
    job || {
      title: '',
      department: '',
      location: '',
      employmentType: 'Full-time',
      experienceLevel: 'Mid (2-5y)',
      description: '',
      responsibilities: [],
      requirements: [],
      salary: '',
      status: 'Draft',
    }
  );

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleArrayChange = (field, index, value) => {
    const arr = [...form[field]];
    arr[index] = value;
    setForm((prev) => ({ ...prev, [field]: arr }));
  };

  const handleAddItem = (field) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const handleRemoveItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Job title is required';
    if (!form.department) newErrors.department = 'Department is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (form.responsibilities.filter((r) => r.trim()).length === 0) {
      newErrors.responsibilities = 'Add at least one responsibility';
    }
    if (form.requirements.filter((r) => r.trim()).length === 0) {
      newErrors.requirements = 'Add at least one requirement';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setMessage({ type: 'error', text: 'Please fix the errors above' });
      return;
    }

    const payload = {
      ...form,
      responsibilities: form.responsibilities.filter((r) => r.trim()),
      requirements: form.requirements.filter((r) => r.trim()),
      postedDate: form.postedDate || new Date().toISOString().slice(0, 10),
    };

    onSubmit(payload);
    setMessage({ type: 'success', text: `Job posting ${isEdit ? 'updated' : 'created'}` });
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {isEdit ? 'Edit Job Posting' : 'Create New Job Posting'}
      </h3>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title and Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Senior React Developer"
            />
            {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
            <select
              value={form.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.department ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && <p className="text-red-600 text-xs mt-1">{errors.department}</p>}
          </div>
        </div>

        {/* Location and Employment Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Bangalore"
            />
            {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
            <select
              value={form.employmentType}
              onChange={(e) => handleChange('employmentType', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {EMPLOYMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Experience Level and Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <select
              value={form.experienceLevel}
              onChange={(e) => handleChange('experienceLevel', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
            <input
              type="text"
              value={form.salary}
              onChange={(e) => handleChange('salary', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 15-20 LPA"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className={`w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe the job role and responsibilities..."
          />
          {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Responsibilities */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Responsibilities *</label>
            <button
              type="button"
              onClick={() => handleAddItem('responsibilities')}
              className="text-blue-600 hover:text-blue-700 text-xs font-medium"
            >
              + Add
            </button>
          </div>
          {form.responsibilities.map((resp, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={resp}
                onChange={(e) => handleArrayChange('responsibilities', idx, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Build responsive web applications"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem('responsibilities', idx)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          {errors.responsibilities && <p className="text-red-600 text-xs">{errors.responsibilities}</p>}
        </div>

        {/* Requirements */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Requirements *</label>
            <button
              type="button"
              onClick={() => handleAddItem('requirements')}
              className="text-blue-600 hover:text-blue-700 text-xs font-medium"
            >
              + Add
            </button>
          </div>
          {form.requirements.map((req, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleArrayChange('requirements', idx, e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., React, TypeScript, Node.js"
              />
              <button
                type="button"
                onClick={() => handleRemoveItem('requirements', idx)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          {errors.requirements && <p className="text-red-600 text-xs">{errors.requirements}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.values(JOB_STATUS).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`text-sm rounded-lg px-3 py-2.5 border ${
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
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isEdit ? 'Update Posting' : 'Create Posting'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;
