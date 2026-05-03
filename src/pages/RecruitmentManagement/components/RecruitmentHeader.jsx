const RecruitmentHeader = ({ stats, conversionRate, scheduledInterviews, hiredCandidates }) => {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/10 md:p-8">
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/80">
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Recruitment Studio</span>
        <span>Pipeline-first hiring workspace</span>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1.35fr_0.85fr] lg:items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">Recruitment Management</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Manage job postings, track candidates, schedule interviews, and create offers with a more premium,
            dynamic command center.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">{stats.totalPostings} roles</span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">
              {stats.totalApplications} applications
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-100">
              {conversionRate}% shortlist rate
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Shortlisted</p>
            <p className="mt-2 text-3xl font-black text-white">{stats.shortlistedCandidates}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Interviews</p>
            <p className="mt-2 text-3xl font-black text-white">{scheduledInterviews}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Offers</p>
            <p className="mt-2 text-3xl font-black text-white">{hiredCandidates}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentHeader;
