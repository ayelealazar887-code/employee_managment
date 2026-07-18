import React, { useCallback, useEffect, useState } from "react";
import { dummyLeaveData } from "../assets/assets";
import Loading from "../components/Loading";
import { PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon } from "lucide-react";
import LeaveHistory from "../components/leave/LeaveHistory";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";

function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted] = useState(false);

  const isAdmin = false;

  const fetchLeaves = useCallback(() => {
    setLeaves(dummyLeaveData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  if (loading) return <Loading />;

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED");
  const sickCount = approvedLeaves.filter((l) => l.type === "SICK").length;
  const casualCount = approvedLeaves.filter((l) => l.type === "CASUAL").length;
  const annualCount = approvedLeaves.filter((l) => l.type === "ANNUAL").length;

  const leaveStats = [
    { label: "Sick Leave", value: sickCount, icon: ThermometerIcon },
    { label: "Casual Leave", value: casualCount, icon: UmbrellaIcon },
    { label: "Annual Leave", value: annualCount, icon: PalmtreeIcon },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="page-header mb-0">
          <h1 className="page-title">Leave Management</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Manage leave applications and approvals"
              : "Your leave history and requests"}
          </p>
        </div>

        {!isAdmin && !isDeleted && (
          <button
            type="button"
            className="btn-primary inline-flex items-center gap-2 self-start"
            onClick={() => setShowModal(true)}
          >
            <PlusIcon className="h-4 w-4" />
            Apply for Leave
          </button>
        )}
      </div>

      {!isAdmin && (
        <div className="grid gap-4 md:grid-cols-3">
          {leaveStats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="card p-5 shadow-sm">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-500">{s.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {s.value} <span className="text-sm font-medium text-slate-500">taken</span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />
      <ApplyLeaveModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchLeaves}
      />
    </div>
  );
}

export default Leave;
