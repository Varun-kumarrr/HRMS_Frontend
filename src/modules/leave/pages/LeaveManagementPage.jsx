import { useMemo, useState } from "react";
import Layout from "../../../components/Layout";
import { useAuth } from "../../../context/AuthContext";
import { useLeaveManagement } from "../hooks/useLeaveManagement";
import LeaveHeader from "../components/LeaveHeader";
import LeaveTabs from "../components/LeaveTabs";
import SummaryCards from "../components/SummaryCards";
import AllocationForm from "../components/AllocationForm";
import ApplyLeaveForm from "../components/ApplyLeaveForm";
import LeaveBalanceTable from "../components/LeaveBalanceTable";
import LeaveRequestTable from "../components/LeaveRequestTable";
import HolidayCalendar from "../components/HolidayCalendar";

const getTabsByRole = (role) => {
  if (role === "admin" || role === "hr") {
    return ["Overview", "Allocate Leave", "Approval Queue", "Leave Balances", "Holiday Calendar"];
  }
  if (role === "manager") {
    return ["Overview", "Approval Queue", "Leave Balances", "Holiday Calendar"];
  }
  return ["Overview", "Apply Leave", "My Requests", "Leave Balances", "Holiday Calendar"];
};

const LeaveManagementPage = () => {
  const { user } = useAuth();
  const {
    role,
    employeeId,
    selectedYear,
    setSelectedYear,
    loading,
    error,
    notice,
    stats,
    holidays,
    balances,
    requests,
    leaveTypes,
    employees,
    applyLeave,
    allocateLeave,
    takeManagerAction,
    finalizeLeave,
    countLeaveDays,
  } = useLeaveManagement(user);

  const tabs = useMemo(() => getTabsByRole(role), [role]);
  const [activeTab, setActiveTab] = useState("Overview");

  const shownRequests = useMemo(() => {
    if (role === "employee") return requests.filter((request) => request.employeeId === employeeId);
    return requests;
  }, [requests, role, employeeId]);

  const shownBalances = useMemo(() => {
    if (role === "employee") return balances.filter((balance) => balance.employeeId === employeeId);
    return balances;
  }, [balances, role, employeeId]);

  return (
    <Layout>
      <div className="space-y-5 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_38%),radial-gradient(circle_at_top_left,rgba(2,132,199,0.1),transparent_35%)] pb-8">
        <LeaveHeader role={role} selectedYear={selectedYear} onYearChange={setSelectedYear} />
        <LeaveTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading leave data...
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{error}</div>
        ) : null}

        {notice ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">{notice}</div>
        ) : null}

        {activeTab === "Overview" && !loading ? <SummaryCards stats={stats} /> : null}

        {(activeTab === "Allocate Leave" && (role === "admin" || role === "hr")) ? (
          <AllocationForm employees={employees} leaveTypes={leaveTypes} onAllocate={allocateLeave} />
        ) : null}

        {(activeTab === "Apply Leave" && role === "employee") ? (
          <ApplyLeaveForm
            leaveTypes={leaveTypes}
            employeeId={employeeId}
            countLeaveDays={countLeaveDays}
            onApply={(payload) => applyLeave({ ...payload, employeeId })}
          />
        ) : null}

        {(activeTab === "Approval Queue" || activeTab === "My Requests") ? (
          <LeaveRequestTable
            role={role}
            requests={shownRequests}
            employees={employees}
            onManagerAction={takeManagerAction}
            onFinalize={finalizeLeave}
          />
        ) : null}

        {activeTab === "Leave Balances" ? <LeaveBalanceTable balances={shownBalances} employees={employees} /> : null}

        {activeTab === "Holiday Calendar" ? <HolidayCalendar holidays={holidays} /> : null}
      </div>
    </Layout>
  );
};

export default LeaveManagementPage;
