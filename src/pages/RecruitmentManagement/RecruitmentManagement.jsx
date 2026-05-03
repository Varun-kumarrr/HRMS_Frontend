import { useState } from 'react';
import Layout from '../../components/Layout';
import {
  RECRUITMENT_TABS,
  INITIAL_JOB_POSTINGS,
  INITIAL_CANDIDATES,
  INITIAL_INTERVIEWS,
  INITIAL_OFFERS,
} from './constants';
import RecruitmentHeader from './components/RecruitmentHeader';
import RecruitmentTabs from './components/RecruitmentTabs';
import JobPostingForm from './components/JobPostingForm';
import JobPostingList from './components/JobPostingList';
import CandidatePipelineBoard from './components/CandidatePipelineBoard';
import InterviewScheduler from './components/InterviewScheduler';
import InterviewFeedbackForm from './components/InterviewFeedbackForm';
import OfferLetterForm from './components/OfferLetterForm';

const RecruitmentManagement = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [postings, setPostings] = useState(INITIAL_JOB_POSTINGS);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [interviews, setInterviews] = useState(INITIAL_INTERVIEWS);
  const [offers, setOffers] = useState(INITIAL_OFFERS);

  // UI States
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [showInterviewScheduler, setShowInterviewScheduler] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Job Posting Handlers
  const handleCreateJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Math.max(...postings.map((p) => p.id), 0) + 1,
      applicants: 0,
      createdAt: new Date().toISOString(),
    };
    setPostings([newJob, ...postings]);
    setShowJobForm(false);
  };

  const handleUpdateJob = (jobData) => {
    setPostings(postings.map((p) => (p.id === editingJob.id ? { ...p, ...jobData } : p)));
    setEditingJob(null);
    setShowJobForm(false);
  };

  const handleCloseJob = (jobId) => {
    setPostings(postings.map((p) => (p.id === jobId ? { ...p, status: 'Closed' } : p)));
  };

  const handleDeleteJob = (jobId) => {
    setPostings(postings.filter((p) => p.id !== jobId));
  };

  // Candidate Handlers
  const handleUpdateCandidateStatus = (candidateId, newStatus) => {
    setCandidates(candidates.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c)));
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  // Interview Handlers
  const handleScheduleInterview = (interviewData) => {
    const newInterview = {
      ...interviewData,
      id: Math.max(...interviews.map((i) => i.id), 0) + 1,
    };
    setInterviews([newInterview, ...interviews]);
    setShowInterviewScheduler(false);
  };

  const handleSubmitFeedback = (feedbackData) => {
    setInterviews(interviews.map((i) => (i.id === feedbackData.id ? feedbackData : i)));
    const candidate = candidates.find((c) => c.id === feedbackData.candidateId);
    if (candidate) {
      setCandidates(
        candidates.map((c) =>
          c.id === feedbackData.candidateId
            ? {
                ...c,
                ratings: {
                  technical: feedbackData.technicalSkills,
                  communication: feedbackData.communication,
                  culture_fit: feedbackData.cultureFit,
                },
              }
            : c
        )
      );
    }
    setShowFeedbackForm(false);
    setEditingInterview(null);
  };

  // Offer Handlers
  const handleCreateOffer = (offerData) => {
    const newOffer = {
      ...offerData,
      id: Math.max(...offers.map((o) => o.id), 0) + 1,
    };
    setOffers([newOffer, ...offers]);
    setCandidates(
      candidates.map((c) =>
        c.id === offerData.candidateId ? { ...c, status: 'Offer Extended' } : c
      )
    );
    setShowOfferForm(false);
  };

  // Overview Stats
  const stats = {
    totalPostings: postings.length,
    publishedPostings: postings.filter((p) => p.status === 'Published').length,
    totalApplications: candidates.length,
    shortlistedCandidates: candidates.filter((c) => c.status === 'Shortlisted').length,
    offersGenerated: offers.length,
  };

  const scheduledInterviews = interviews.filter((interview) => interview.status === 'Scheduled').length;
  const hiredCandidates = candidates.filter((candidate) => candidate.status === 'Hired').length;
  const conversionRate = stats.totalApplications
    ? Math.round((stats.shortlistedCandidates / stats.totalApplications) * 100)
    : 0;

  const overviewCards = [
    {
      label: 'Open roles',
      value: stats.publishedPostings,
      hint: `${stats.totalPostings - stats.publishedPostings} closed`,
      tone: 'from-sky-500 to-cyan-500',
    },
    {
      label: 'Applications',
      value: stats.totalApplications,
      hint: `${conversionRate}% shortlisted`,
      tone: 'from-violet-500 to-fuchsia-500',
    },
    {
      label: 'Interviews',
      value: scheduledInterviews,
      hint: `${interviews.length} total in pipeline`,
      tone: 'from-amber-500 to-orange-500',
    },
    {
      label: 'Offers',
      value: stats.offersGenerated,
      hint: `${hiredCandidates} hires`,
      tone: 'from-emerald-500 to-teal-500',
    },
  ];

  const pipelineStages = [
    { label: 'Applied', count: candidates.filter((candidate) => candidate.status === 'Applied').length },
    { label: 'Shortlisted', count: stats.shortlistedCandidates },
    { label: 'Interview', count: scheduledInterviews },
    { label: 'Offer', count: candidates.filter((candidate) => candidate.status === 'Offer Extended').length },
    { label: 'Hired', count: hiredCandidates },
  ];

  return (
    <Layout>
      <div className="relative space-y-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(168,85,247,0.18),_transparent_28%),linear-gradient(180deg,_rgba(15,23,42,0.06),_transparent_100%)]" />
        <RecruitmentHeader
          stats={stats}
          conversionRate={conversionRate}
          scheduledInterviews={scheduledInterviews}
          hiredCandidates={hiredCandidates}
        />
        <div className="rounded-2xl border border-slate-200/80 bg-white/85 p-2 shadow-sm backdrop-blur">
          <RecruitmentTabs tabs={RECRUITMENT_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Overview Tab */}
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {overviewCards.map((card) => (
                <div
                  key={card.label}
                  className="group rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${card.tone}`} />
                  <p className="mt-4 text-sm font-medium text-slate-500">{card.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-4xl font-black tracking-tight text-slate-900">{card.value}</p>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      Live
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{card.hint}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/80">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Hiring Funnel</span>
                  <span>Dynamic pipeline visibility</span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {pipelineStages.map((stage) => (
                    <div key={stage.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-300">{stage.label}</p>
                      <p className="mt-3 text-3xl font-black">{stage.count}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400"
                    style={{ width: `${Math.max(35, conversionRate)}%` }}
                  />
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  Move talent from application to offer with fewer clicks, clearer status signals, and a cleaner
                  visual hierarchy.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick snapshot</p>
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-600">Shortlist rate</span>
                    <span className="text-sm font-semibold text-slate-900">{conversionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-600">Interview queue</span>
                    <span className="text-sm font-semibold text-slate-900">{scheduledInterviews} scheduled</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-600">Offer readiness</span>
                    <span className="text-sm font-semibold text-slate-900">{stats.offersGenerated} offers</span>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-sky-50 to-violet-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Ready-to-act view</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Use the tabs to jump between posts, candidates, interviews, and offers without losing context.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Job Postings Tab */}
        {activeTab === 'Job Postings' && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Active Job Postings</h3>
                <p className="text-sm text-slate-500">Create, publish, and close roles with a more polished action surface.</p>
              </div>
              <button
                onClick={() => {
                  setEditingJob(null);
                  setShowJobForm(!showJobForm);
                }}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {showJobForm ? 'Cancel' : '+ New Job Posting'}
              </button>
            </div>

            {showJobForm ? (
              <JobPostingForm
                job={editingJob}
                isEdit={!!editingJob}
                onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
                onCancel={() => {
                  setShowJobForm(false);
                  setEditingJob(null);
                }}
              />
            ) : (
              <JobPostingList
                postings={postings}
                onEdit={(job) => {
                  setEditingJob(job);
                  setShowJobForm(true);
                }}
                onClose={handleCloseJob}
                onDelete={handleDeleteJob}
              />
            )}
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === 'Candidates' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Candidate Pipeline</h3>
              <p className="mt-1 text-sm text-slate-500">
                Visual status flow with stronger emphasis on candidate context and next actions.
              </p>
            </div>
            <CandidatePipelineBoard
              candidates={candidates}
              onUpdateStatus={handleUpdateCandidateStatus}
              onViewDetails={handleViewCandidate}
            />

            {selectedCandidate && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedCandidate.name}</h3>
                    <p className="text-gray-600">{selectedCandidate.jobTitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCandidate(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{selectedCandidate.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-medium">{selectedCandidate.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Experience</p>
                    <p className="font-medium">{selectedCandidate.experience} years</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Current Company</p>
                    <p className="font-medium">{selectedCandidate.currentCompany}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Applied Date</p>
                    <p className="font-medium">{selectedCandidate.appliedDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-medium text-blue-600">{selectedCandidate.status}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Interviews Tab */}
        {activeTab === 'Interviews' && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Interview Management</h3>
                <p className="text-sm text-slate-500">Schedule panels and feedback in a cleaner, more guided flow.</p>
              </div>
              <button
                onClick={() => setShowInterviewScheduler(!showInterviewScheduler)}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {showInterviewScheduler ? 'Cancel' : '+ Schedule Interview'}
              </button>
            </div>

            {showInterviewScheduler ? (
              <InterviewScheduler
                candidates={candidates.filter(
                  (c) => c.status === 'Shortlisted' || c.status === 'Interview Scheduled'
                )}
                onSchedule={handleScheduleInterview}
                onCancel={() => setShowInterviewScheduler(false)}
              />
            ) : null}

            {showFeedbackForm && editingInterview ? (
              <InterviewFeedbackForm
                interview={editingInterview}
                onSubmit={handleSubmitFeedback}
                onCancel={() => {
                  setShowFeedbackForm(false);
                  setEditingInterview(null);
                }}
              />
            ) : null}

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Scheduled Interviews</h4>
              {interviews.length === 0 ? (
                <p className="text-gray-500">No interviews scheduled yet.</p>
              ) : (
                interviews.map((interview) => (
                  <div key={interview.id} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">{interview.candidateName}</h5>
                        <p className="text-sm text-gray-600">
                          {interview.interviewType} • {interview.scheduledDate} at {interview.scheduledTime}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">Interviewer: {interview.interviewerName}</p>
                      </div>
                      <div className="flex gap-2">
                        {interview.status === 'Completed' ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Completed
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            Scheduled
                          </span>
                        )}
                        {interview.status === 'Scheduled' && (
                          <button
                            onClick={() => {
                              setEditingInterview(interview);
                              setShowFeedbackForm(true);
                            }}
                            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-xs font-medium"
                          >
                            Add Feedback
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'Offers' && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Offer Management</h3>
                <p className="text-sm text-slate-500">Generate, review, and distribute offers with a premium feel.</p>
              </div>
              <button
                onClick={() => setShowOfferForm(!showOfferForm)}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {showOfferForm ? 'Cancel' : '+ Create Offer'}
              </button>
            </div>

            {showOfferForm ? (
              <OfferLetterForm
                candidates={candidates}
                onSubmit={handleCreateOffer}
                onCancel={() => setShowOfferForm(false)}
              />
            ) : (
              <div className="space-y-3">
                {offers.length === 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">No offer letters created yet.</p>
                  </div>
                ) : (
                  offers.map((offer) => (
                    <div key={offer.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{offer.candidateName}</h5>
                          <p className="text-sm text-gray-600">{offer.jobTitle}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                            <div>
                              <p className="text-gray-500">CTC</p>
                              <p className="font-medium">{offer.currency} {offer.ctc.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Joining Date</p>
                              <p className="font-medium">{offer.joiningDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Expiry</p>
                              <p className="font-medium">{offer.expiryDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Department</p>
                              <p className="font-medium">{offer.department}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <span
                            className={`px-3 py-1 rounded text-xs font-medium text-center ${
                              offer.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {offer.status}
                          </span>
                          <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-xs font-medium">
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RecruitmentManagement;
