import React, { useState } from "react";
import { DEPARTMENTS } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios";

function EmployeeForm({ initailData, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const isEditMode = !!initailData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget)
    if(isEditMode){
      const pwd = formData.get("password")
      if(!pwd) formData.delete("password")
    }
    
    try {
      const url = isEditMode ? `/employees/${initailData.id}` :
      "/employees"

      const method = isEditMode ? "put" : "post";
      await api[method](url, formData)
      onSuccess ? onSuccess() : Navigate("/employees")
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setTimeout(() => {
      setLoading(false);
      onSuccess?.();
    }, 600);
    }
     
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Personal Information
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">First Name</label>
            <input type="text" name="firstName" required defaultValue={initailData?.firstName} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Last Name</label>
            <input type="text" name="lastName" required defaultValue={initailData?.lastName} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
            <input name="phone" required defaultValue={initailData?.phone} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Join Date</label>
            <input
              type="date"
              name="joinDate"
              required
              defaultValue={
                initailData?.joinDate
                  ? new Date(initailData.joinDate).toISOString().split("T")[0]
                  : ""
              }
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Bio (Optional)</label>
            <textarea
              name="bio"
              defaultValue={initailData?.bio}
              rows={3}
              placeholder="Brief description"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Employment Details
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Department</label>
            <select name="department" defaultValue={initailData?.department || ""}>
              <option value="">Select Department</option>
              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Position</label>
            <input name="position" required defaultValue={initailData?.position} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Basic Salary</label>
            <input
              name="basicSalary"
              type="number"
              required
              min="0"
              step="0.01"
              defaultValue={initailData?.basicSalary || 0}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Allowances</label>
            <input
              type="number"
              name="allowances"
              required
              min="0"
              step="0.01"
              defaultValue={initailData?.allowances || 0}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Deductions</label>
            <input
              type="number"
              name="deductions"
              required
              defaultValue={initailData?.deductions || 0}
            />
          </div>
          {isEditMode && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
              <select name="employmentStatus" defaultValue={initailData?.employmentStatus}>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Account Setup
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Work Email</label>
            <input type="email" name="email" required defaultValue={initailData?.email} />
          </div>
          {!isEditMode ? (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Temporary Password</label>
              <input type="password" name="password" required />
            </div>
          ): (
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Change Password (Optional)</label>
              <input type="password" name="password" placeholder="Leave blank to keep current" />
            </div>
          )}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">System Role</label>
            <select name="role" defaultValue={initailData?.user?.role || "EMPLOYEE"}>
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary inline-flex items-center justify-center gap-2" disabled={loading}>
          {loading && <Loader2Icon className="h-4 w-4 animate-spin" />}
          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
