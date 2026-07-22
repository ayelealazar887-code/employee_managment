import { CalendarDays, FileText, Loader2, Send, X } from "lucide-react";
import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

function ApplyLeaveModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "SICK",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      await api.post('/leave', data)
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message)
    } finally {
      setLoading(false)
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Apply for Leave</h2>
            <p className="mt-1 text-sm text-slate-500">Submit your leave request for approval</p>
          </div>
          <button type="button" className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-5 p-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <FileText className="h-4 w-4" />
              Leave Type
            </label>
            <select name="type" value={formData.type} onChange={handleChange} required className="w-full">
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CalendarDays className="h-4 w-4" />
                From
              </label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required min={minDate} />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CalendarDays className="h-4 w-4" />
                To
              </label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required min={minDate} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Reason</label>
            <textarea name="reason" value={formData.reason} onChange={handleChange} rows="3" required />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary inline-flex items-center gap-2" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeaveModal;
