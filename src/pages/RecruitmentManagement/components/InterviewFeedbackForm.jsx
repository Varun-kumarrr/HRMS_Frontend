import { useState } from 'react';

const InterviewFeedbackForm = ({ interview, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    rating: interview?.rating || 0,
    feedback: interview?.feedback || '',
    technicalSkills: interview?.technicalSkills || 0,
    communication: interview?.communication || 0,
    cultureFit: interview?.cultureFit || 0,
    recommendation: interview?.recommendation || 'Pending',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.feedback.trim()) {
      setMessage({ type: 'error', text: 'Please provide feedback' });
      return;
    }

    onSubmit({
      ...interview,
      ...form,
      status: 'Completed',
    });
    setMessage({ type: 'success', text: 'Feedback submitted' });
  };

  const renderStarRating = (value, onChange) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-2xl transition ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Interview Feedback</h3>
      <p className="text-sm text-gray-600 mb-6">
        {interview?.candidateName} - {interview?.jobTitle} ({interview?.interviewType})
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Overall Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
          {renderStarRating(form.rating, (value) => handleChange('rating', value))}
        </div>

        {/* Detailed Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
            {renderStarRating(form.technicalSkills, (value) => handleChange('technicalSkills', value))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Communication</label>
            {renderStarRating(form.communication, (value) => handleChange('communication', value))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Culture Fit</label>
            {renderStarRating(form.cultureFit, (value) => handleChange('cultureFit', value))}
          </div>
        </div>

        {/* Recommendation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recommendation</label>
          <select
            value={form.recommendation}
            onChange={(e) => handleChange('recommendation', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending Decision</option>
            <option value="Strong Yes">Strong Yes - Move to Next Round</option>
            <option value="Yes">Yes - Move to Next Round</option>
            <option value="Maybe">Maybe - Depends on Other Interviews</option>
            <option value="No">No - Do Not Proceed</option>
            <option value="Strong No">Strong No - Reject</option>
          </select>
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Feedback</label>
          <textarea
            rows={6}
            value={form.feedback}
            onChange={(e) => handleChange('feedback', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Provide detailed feedback on the interview..."
          />
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
            Submit Feedback
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

export default InterviewFeedbackForm;
