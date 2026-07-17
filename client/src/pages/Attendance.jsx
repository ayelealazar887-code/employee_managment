import React, { useCallback, useEffect, useState } from "react";
import { dummyAttendanceData } from "../assets/assets";
import Loading from "../components/Loading";
import CheckInButton from "../components/attendance/CheckInButton";
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceHistory from "../components/attendance/AttendanceHistory";

function Attendance() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    setHistory(dummyAttendanceData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString(),
  );

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">Track your work hours and daily check-in</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="card p-6 shadow-sm">
          {isDeleted ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Attendance Locked</h2>
              <p className="text-sm text-slate-600">
                You can no longer clock in or out because your employee records have been marked as deleted.
              </p>
            </div>
          ) : (
            <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
          )}
        </div>

        <AttendanceStats history={history} />
      </div>

      <AttendanceHistory history={history} />
    </div>
  );
}

export default Attendance;
