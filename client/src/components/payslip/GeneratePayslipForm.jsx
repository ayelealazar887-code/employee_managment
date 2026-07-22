import { Loader2Icon, Plus, X } from "lucide-react";
import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

function GeneratePayslipForm({ employees, onSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries())
    try {
      await api.post('payslips',data)
      setIsOpen(false)
      onSuccess()
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message)
    }finally{
      setLoading(false)
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        className="btn-primary inline-flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="h-4 w-4" />
        Generate Payslip
      </button>
    );
  }

  return (
    <div className="card animate-fade-in overflow-visible p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Generate Monthly Payslip</h3>
          <p className="mt-1 text-sm text-slate-500">Create a payslip for a selected employee.</p>
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Employee</label>
          <select name="employeeId" required className="w-full pr-10 appearance-none" defaultValue="">
            <option value="" disabled>
              Select an employee
            </option>
            {employees.map((employee) => (
              <option value={employee.id} key={employee.id}>
                {employee.firstName} {employee.lastName} ({employee.position})
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Month</label>
            <select name="month" required className="w-full pr-10 appearance-none">
              {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                <option value={month} key={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Year</label>
            <input type="number" name="year" defaultValue={new Date().getFullYear()} className="w-full" />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Basic Salary</label>
          <input type="number" name="basicSalary" required placeholder="5000" className="w-full" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Allowances</label>
            <input type="number" name="allowances" required defaultValue="0" className="w-full" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Deductions</label>
            <input type="number" name="deductions" required defaultValue="0" className="w-full" />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" className="btn-secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2">
            {loading && <Loader2Icon className="h-4 w-4 animate-spin" />}
            Generate
          </button>
        </div>
      </form>
    </div>
  );
}

export default GeneratePayslipForm;
