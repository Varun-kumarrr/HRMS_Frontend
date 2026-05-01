// Recruitment Management Constants

export const RECRUITMENT_TABS = ['Overview', 'Job Postings', 'Candidates', 'Interviews', 'Offers'];

export const JOB_STATUS = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  CLOSED: 'Closed',
  ARCHIVED: 'Archived',
};

export const JOB_STATUS_COLORS = {
  Draft: 'bg-gray-100 text-gray-700 border-gray-300',
  Published: 'bg-green-100 text-green-700 border-green-300',
  Closed: 'bg-orange-100 text-orange-700 border-orange-300',
  Archived: 'bg-gray-200 text-gray-600 border-gray-400',
};

export const CANDIDATE_STATUS = {
  APPLIED: 'Applied',
  SHORTLISTED: 'Shortlisted',
  INTERVIEW_SCHEDULED: 'Interview Scheduled',
  INTERVIEWED: 'Interviewed',
  OFFER_EXTENDED: 'Offer Extended',
  OFFER_ACCEPTED: 'Offer Accepted',
  HIRED: 'Hired',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
};

export const CANDIDATE_STATUS_COLORS = {
  Applied: 'bg-blue-100 text-blue-700 border-blue-300',
  Shortlisted: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  'Interview Scheduled': 'bg-purple-100 text-purple-700 border-purple-300',
  Interviewed: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'Offer Extended': 'bg-green-100 text-green-700 border-green-300',
  'Offer Accepted': 'bg-emerald-100 text-emerald-700 border-emerald-300',
  Hired: 'bg-green-200 text-green-800 border-green-400',
  Rejected: 'bg-red-100 text-red-700 border-red-300',
  Withdrawn: 'bg-gray-100 text-gray-600 border-gray-300',
};

export const INTERVIEW_TYPES = ['Phone Screen', 'Technical', 'HR Round', 'Management Round', 'Final Round'];

export const EXPERIENCE_LEVELS = ['Fresher', 'Junior (0-2y)', 'Mid (2-5y)', 'Senior (5-8y)', 'Lead (8+y)'];

export const EMPLOYMENT_TYPES = ['Full-time', 'Contract', 'Part-time', 'Internship'];

export const DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Sales',
  'Marketing',
  'HR',
  'Finance',
  'Operations',
];

export const INITIAL_JOB_POSTINGS = [
  {
    id: 1,
    title: 'Senior React Developer',
    department: 'Engineering',
    location: 'Bangalore',
    employmentType: 'Full-time',
    experienceLevel: 'Senior (5-8y)',
    description: 'Looking for experienced React developer with 5+ years experience',
    responsibilities: ['Build responsive web applications', 'Lead frontend architecture'],
    requirements: ['React', 'TypeScript', 'Node.js', 'CSS/Tailwind'],
    salary: '15-20 LPA',
    status: 'Published',
    postedDate: '2026-04-01',
    applicants: 12,
    createdAt: '2026-04-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'Mumbai',
    employmentType: 'Full-time',
    experienceLevel: 'Mid (2-5y)',
    description: 'Seeking experienced product manager to drive product strategy',
    responsibilities: ['Define product roadmap', 'Manage cross-functional teams'],
    requirements: ['Product strategy', 'Analytics', 'User research'],
    salary: '12-16 LPA',
    status: 'Published',
    postedDate: '2026-04-05',
    applicants: 8,
    createdAt: '2026-04-05T09:30:00Z',
  },
];

export const INITIAL_CANDIDATES = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@gmail.com',
    phone: '+91 98765 43210',
    jobId: 1,
    jobTitle: 'Senior React Developer',
    status: 'Shortlisted',
    appliedDate: '2026-04-10',
    resumeUrl: '#',
    linkedinUrl: 'https://linkedin.com/in/rajesh',
    experience: '6',
    currentCompany: 'Tech Corp',
    ratings: { technical: 4, communication: 3, culture_fit: 4 },
  },
  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya@gmail.com',
    phone: '+91 97654 32109',
    jobId: 1,
    jobTitle: 'Senior React Developer',
    status: 'Interview Scheduled',
    appliedDate: '2026-04-08',
    resumeUrl: '#',
    linkedinUrl: 'https://linkedin.com/in/priya',
    experience: '5',
    currentCompany: 'Innovation Labs',
    ratings: { technical: 0, communication: 0, culture_fit: 0 },
  },
  {
    id: 3,
    name: 'Amit Verma',
    email: 'amit@gmail.com',
    phone: '+91 96543 21098',
    jobId: 2,
    jobTitle: 'Product Manager',
    status: 'Applied',
    appliedDate: '2026-04-12',
    resumeUrl: '#',
    linkedinUrl: 'https://linkedin.com/in/amit',
    experience: '3',
    currentCompany: 'StartUp Hub',
    ratings: { technical: 0, communication: 0, culture_fit: 0 },
  },
];

export const INITIAL_INTERVIEWS = [
  {
    id: 1,
    candidateId: 2,
    candidateName: 'Priya Singh',
    jobId: 1,
    jobTitle: 'Senior React Developer',
    interviewType: 'Technical',
    scheduledDate: '2026-04-20',
    scheduledTime: '14:00',
    interviewerId: 'HR001',
    interviewerName: 'Neha Sharma',
    status: 'Scheduled',
    feedback: null,
    rating: 0,
    duration: 60,
  },
  {
    id: 2,
    candidateId: 1,
    candidateName: 'Rajesh Kumar',
    jobId: 1,
    jobTitle: 'Senior React Developer',
    interviewType: 'HR Round',
    scheduledDate: '2026-04-22',
    scheduledTime: '10:30',
    interviewerId: 'HR001',
    interviewerName: 'Neha Sharma',
    status: 'Completed',
    feedback: 'Strong candidate, good fit for team',
    rating: 4,
    duration: 45,
  },
];

export const INITIAL_OFFERS = [
  {
    id: 1,
    candidateId: 1,
    candidateName: 'Rajesh Kumar',
    jobId: 1,
    jobTitle: 'Senior React Developer',
    status: 'Pending',
    ctc: 1800000,
    currency: 'INR',
    joiningDate: '2026-05-15',
    designation: 'Senior React Developer',
    department: 'Engineering',
    reportingTo: 'Engineering Manager',
    createdDate: '2026-04-18',
    expiryDate: '2026-04-25',
    documentUrl: null,
  },
];
