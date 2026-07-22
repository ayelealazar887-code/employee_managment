import React, { useEffect, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { format } from "date-fns";
import api from "../../api/axios";
import toast from "react-hot-toast";

function LeaveHistory({ leaves, isAdmin, onUpdate }) {
  const [processing, setProcessing] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(leaves || []);
  }, [leaves]);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);
    try {
      await api.patch(`/leave/${id}`, {status})
      onUpdate();
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message)
    } finally {
      setProcessing(null)
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "badge-success";
      case "REJECTED":
        return "badge-danger";
      default:
        return "badge-warning";
    }
  };

  return (
    <div className="card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Leave Requests</h3>
        <p className="mt-1 text-sm text-slate-500">
          {isAdmin
            ? "Review pending requests and update their status."
            : "Track the progress of your leave submissions."}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table-modern w-full">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Type</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Status</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="px-6 py-4 text-center text-sm text-slate-500">
                  No leave applications found
                </td>
              </tr>
            ) : (
              history.map((leave) => {
                const statusClass = getStatusBadgeClass(leave.status);
                return (
                  <tr key={leave.id || leave._id}>
                    {isAdmin && (
                      <td>
                        <div className="font-medium text-slate-800">
                          {leave.employee?.firstName || ""} {leave.employee?.lastName || ""}
                        </div>
                        <div className="text-xs text-slate-500">{leave.employee?.email || ""}</div>
                      </td>
                    )}
                    <td>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {leave.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap">
                      {format(new Date(leave.startDate), "MMM dd")} - {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>
                    <td>
                      <p className="max-w-xs text-sm text-slate-700">{leave.reason}</p>
                    </td>
                    <td>
                      <span className={`badge ${statusClass}`}>{leave.status}</span>
                    </td>
                    {isAdmin && (
                      <td>
                        {leave.status === "PENDING" ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
                              onClick={() => handleStatusUpdate(leave.id, "APPROVED")}
                            >
                              {processing === leave.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            </button>
                            <button
                              type="button"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-rose-700 transition hover:bg-rose-100"
                              onClick={() => handleStatusUpdate(leave.id, "REJECTED")}
                            >
                              {processing === leave.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-500">No action needed</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveHistory;
