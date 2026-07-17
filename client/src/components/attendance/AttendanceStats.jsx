import { AlertCircleIcon, CalendarIcon, ClockIcon } from "lucide-react";
import React from "react";

function AttendanceStats({ history }) {
  const totalPresent = history.filter(
    (h) => h.status === "PRESENT" || h.status === "LATE",
  ).length;

  const totalLate = history.filter((h) => h.status === "LATE").length;

  const stats = [
    { label: "Days Present", value: totalPresent, icon: CalendarIcon },
    { label: "Late Arrivals", value: totalLate, icon: AlertCircleIcon },
    { label: "Avg. Work Hrs", value: "8.5 Hrs", icon: ClockIcon },
  ];

  return (
    <div className="card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Attendance Overview</h2>
        <p className="text-sm text-slate-500 mt-1">Your attendance summary over the selected period.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{s.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AttendanceStats;
