import { JOB_STATUS_COLORS } from '../constants';

const JobPostingList = ({ postings, onEdit, onClose, onDelete }) => {
  if (postings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-12 text-center shadow-sm">
        <p className="text-lg font-medium text-slate-600">No job postings found. Create your first posting.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {postings.map((posting) => (
        <div
          key={posting.id}
          className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-slate-900">{posting.title}</h3>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    JOB_STATUS_COLORS[posting.status]
                  }`}
                >
                  {posting.status}
                </span>
              </div>
              <p className="mb-4 text-sm text-slate-600">{posting.description}</p>

              <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">{posting.department}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{posting.location}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">{posting.employmentType}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-5">
                <div>
                  <p className="text-slate-500">Department</p>
                  <p className="font-medium text-slate-900">{posting.department}</p>
                </div>
                <div>
                  <p className="text-slate-500">Location</p>
                  <p className="font-medium text-slate-900">{posting.location}</p>
                </div>
                <div>
                  <p className="text-slate-500">Experience</p>
                  <p className="font-medium text-slate-900">{posting.experienceLevel}</p>
                </div>
                <div>
                  <p className="text-slate-500">Salary</p>
                  <p className="font-medium text-slate-900">{posting.salary}</p>
                </div>
                <div>
                  <p className="text-slate-500">Applicants</p>
                  <p className="font-medium text-slate-900">{posting.applicants} applied</p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Responsibilities</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {posting.responsibilities.map((item) => (
                      <span key={item} className="rounded-full bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Requirements</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {posting.requirements.map((item) => (
                      <span key={item} className="rounded-full bg-white px-3 py-1 text-xs text-slate-700 shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 xl:ml-4 xl:flex-col">
              <button
                onClick={() => onEdit(posting)}
                className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
              >
                Edit
              </button>
              {posting.status === 'Published' && (
                <button
                  onClick={() => onClose(posting.id)}
                  className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
                >
                  Close
                </button>
              )}
              <button
                onClick={() => onDelete(posting.id)}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobPostingList;
