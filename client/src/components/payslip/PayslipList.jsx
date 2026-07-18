import React from "react";
import { format } from "date-fns";
import { Download } from "lucide-react";

function PayslipList({ payslips, isAdmin }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "PENDING":
        return "badge-warning";
      case "PAID":
        return "badge-success";
      default:
        return "badge-success";
    }
  };

  return (
    <div className="card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Payslip History</h3>
        <p className="mt-1 text-sm text-slate-500">
          {isAdmin ? "Review and download issued payslips." : "View your salary records and download slips."}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table-modern w-full">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Period</th>
              <th>Basic Salary</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="px-6 py-4 text-center text-sm text-slate-500">
                  No payslips found
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => {
                const status = payslip.status || "ISSUED";
                const statusClass = getStatusBadgeClass(status);
                return (
                  <tr key={payslip.id || payslip._id}>
                    {isAdmin && (
                      <td>
                        <div className="font-medium text-slate-800">
                          {payslip.employee?.firstName || ""} {payslip.employee?.lastName || ""}
                        </div>
                        <div className="text-xs text-slate-500">{payslip.employee?.email || ""}</div>
                      </td>
                    )}
                    <td className="whitespace-nowrap">
                      {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
                    </td>
                    <td className="whitespace-nowrap font-medium text-slate-800">
                      ${payslip.basicSalary?.toLocaleString() || "0"}
                    </td>
                    <td className="whitespace-nowrap font-medium text-slate-800">
                      ${payslip.netSalary?.toLocaleString() || "0"}
                    </td>
                    <td>
                      <span className={`badge ${statusClass}`}>{status}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        onClick={() => window.open(`/print/payslips/${payslip.id || payslip._id}`)}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
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

export default PayslipList;
