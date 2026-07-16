import { Building2, CalendarDays, FileText, Users } from "lucide-react";
import React from "react";

function AdminDashboard({ data }) {
  const stats = [
    {
      icon: Users,
      value: data?.totalEmployees ?? 0,
      label: "Total Employees",
      description: "Active workforce",
    },
    {
      icon: Building2,
      value: data?.totalDepartments ?? 0,
      label: "Departments",
      description: "Organization units",
    },
    {
      icon: CalendarDays,
      value: data?.todayAttendance ?? 0,
      label: "Today's Attendance",
      description: "Checked in today",
    },
    {
      icon: FileText,
      value: data?.pendingLeaves ?? 0,
      label: "Pending Leaves",
      description: "Awaiting approval",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-linear-to-br from-orange-50 via-white to-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600">Admin Overview</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Welcome back, Admin — here is your organization overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div key={index} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.description}</p>
                </div>
                <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                  <Icon size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
