import { useMemo, useState } from "react";
import Layout from "../../components/Layout";
import {
  ATTENDANCE_LOGS,
  INITIAL_MANUAL_REQUESTS,
  SHIFT_TEMPLATE,
  TIME_TRACKING_TABS,
} from "./constants";
import TimeTrackingHeader from "./components/TimeTrackingHeader";
import TimeTrackingTabs from "./components/TimeTrackingTabs";
import OverviewTab from "./components/OverviewTab";
import PunchGeofenceTab from "./components/PunchGeofenceTab";
import ManualRequestsTab from "./components/ManualRequestsTab";
import ShiftManagementTab from "./components/ShiftManagementTab";
import ReportsTab from "./components/ReportsTab";

const TimeTracking = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [todayInTime, setTodayInTime] = useState("");
  const [todayOutTime, setTodayOutTime] = useState("");
  const [workLocation, setWorkLocation] = useState("Head Office");
  const [withinGeoFence, setWithinGeoFence] = useState(true);
  const [requests, setRequests] = useState(INITIAL_MANUAL_REQUESTS);
  const [requestForm, setRequestForm] = useState({
    date: "",
    type: "Missed Punch-In",
    reason: "",
  });
  const [requestMessage, setRequestMessage] = useState("");

  const [reportStatus, setReportStatus] = useState("All");
  const [reportShift, setReportShift] = useState("All");

  const nowTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const pendingApprovals = requests.filter((item) => item.status === "Pending").length;

  const overviewStats = useMemo(() => {
    const presentCount = ATTENDANCE_LOGS.filter((item) => item.status === "Present").length;
    const lateCount = ATTENDANCE_LOGS.filter((item) => item.status === "Late").length;
    const absentCount = ATTENDANCE_LOGS.filter((item) => item.status === "Absent").length;

    return {
      presentCount,
      lateCount,
      absentCount,
      pendingApprovals,
    };
  }, [pendingApprovals]);

  const filteredReports = useMemo(() => {
    return ATTENDANCE_LOGS.filter((item) => {
      const statusMatch = reportStatus === "All" || item.status === reportStatus;
      const shiftMatch = reportShift === "All" || item.shift === reportShift;
      return statusMatch && shiftMatch;
    });
  }, [reportShift, reportStatus]);

  const handlePunch = () => {
    if (isPunchedIn) {
      setTodayOutTime(nowTime);
      setIsPunchedIn(false);
      return;
    }

    setTodayInTime(nowTime);
    setTodayOutTime("");
    setIsPunchedIn(true);
  };

  const submitManualRequest = (e) => {
    e.preventDefault();

    if (!requestForm.date || !requestForm.reason.trim()) {
      setRequestMessage("Please enter request date and reason.");
      return;
    }

    const newItem = {
      id: Date.now(),
      date: requestForm.date,
      type: requestForm.type,
      reason: requestForm.reason,
      employee: "Current Employee",
      status: "Pending",
    };

    setRequests((prev) => [newItem, ...prev]);
    setRequestForm({
      date: "",
      type: "Missed Punch-In",
      reason: "",
    });
    setRequestMessage("Manual attendance request submitted for approval.");
  };

  const updateRequestForm = (key, value) => {
    setRequestForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateRequestStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const exportReportCsv = () => {
    const header = "Employee,Date,Shift,In Time,Out Time,Overtime,Status\n";
    const rows = filteredReports
      .map(
        (item) =>
          `${item.employee},${item.date},${item.shift},${item.inTime},${item.outTime},${item.overtime},${item.status}`
      )
      .join("\n");

    const csvData = `${header}${rows}`;
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "attendance-report.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <TimeTrackingHeader />
        <TimeTrackingTabs
          tabs={TIME_TRACKING_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "Overview" && <OverviewTab stats={overviewStats} />}

        {activeTab === "Punch & Geofence" && (
          <PunchGeofenceTab
            isPunchedIn={isPunchedIn}
            todayInTime={todayInTime}
            todayOutTime={todayOutTime}
            workLocation={workLocation}
            withinGeoFence={withinGeoFence}
            onPunch={handlePunch}
            onWorkLocationChange={setWorkLocation}
            onToggleGeoFence={() => setWithinGeoFence((prev) => !prev)}
          />
        )}

        {activeTab === "Manual Requests" && (
          <ManualRequestsTab
            requestForm={requestForm}
            requestMessage={requestMessage}
            requests={requests}
            onDateChange={(value) => updateRequestForm("date", value)}
            onTypeChange={(value) => updateRequestForm("type", value)}
            onReasonChange={(value) => updateRequestForm("reason", value)}
            onSubmit={submitManualRequest}
            onUpdateStatus={updateRequestStatus}
          />
        )}

        {activeTab === "Shift Management" && <ShiftManagementTab shifts={SHIFT_TEMPLATE} />}

        {activeTab === "Reports" && (
          <ReportsTab
            reportStatus={reportStatus}
            reportShift={reportShift}
            reports={filteredReports}
            onStatusChange={setReportStatus}
            onShiftChange={setReportShift}
            onExport={exportReportCsv}
          />
        )}
      </div>
    </Layout>
  );
};

export default TimeTracking;
