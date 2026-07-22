import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

function CheckInButton({ todayRecord, onAction }) {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);
    try {
      await api.post("/attendance")
      onAction()
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message)
    }finally{
      setLoading(false)
    }
  };

  if (todayRecord?.checkOut) {
    return (
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">Work Day Completed</h3>
        <p className="text-sm text-slate-500">Great job! See you tomorrow.</p>
      </div>
    );
  }

  const isCheckedIn = !!todayRecord?.checkIn && !todayRecord?.checkOut;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-slate-900">
          {isCheckedIn ? "Ready to clock out?" : "Start your work day"}
        </h3>
        <p className="text-sm text-slate-500">
          {isCheckedIn ? "End your shift when you're done." : "Tap below to clock in for today."}
        </p>
      </div>

      <button
        onClick={handleAttendance}
        disabled={loading}
        className="btn-primary inline-flex items-center gap-3 px-5 py-4"
      >
        {loading ? (
          <Loader2Icon className="h-5 w-5 animate-spin" />
        ) : isCheckedIn ? (
          <LogOutIcon className="h-5 w-5" />
        ) : (
          <LogInIcon className="h-5 w-5" />
        )}

        <span>{loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}</span>
      </button>
    </div>
  );
}

export default CheckInButton;
