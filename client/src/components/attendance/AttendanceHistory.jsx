import React from "react";
import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets";
import { format } from "date-fns";

function AttendanceHistory({ history }) {
  return (
    <div className="card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="table-modern w-full">
          <thead>
            <tr> 
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Working Hours</th>
              <th>Day Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-slate-500">
                  No records found
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record);
                return (
                  <tr key={record._id || record.id}>
                    <td>{format(new Date(record.date), "MMM dd, yyyy")}</td>
                    <td>{record.checkIn ? format(new Date(record.checkIn), "hh:mm a") : "-"}</td>
                    <td>{record.checkOut ? format(new Date(record.checkOut), "hh:mm a") : "-"}</td>
                    <td>{getWorkingHoursDisplay(record)}</td>
                    <td>
                      {dayType.label !== "-" ? (
                        <span className={`badge ${dayType.className || "bg-slate-100 text-slate-600"}`}>
                          {dayType.label}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <span className="text-sm font-medium text-slate-700">{record.status}</span>
                    </td>
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

export default AttendanceHistory;
