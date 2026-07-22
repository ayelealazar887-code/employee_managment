import { PencilIcon, Trash2Icon } from "lucide-react";
import React from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

function EmployeeCard({ employee, onDelete, onEdit }) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employees/${employee.id}`)
      onDelete()
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    }
  };

  const initials = `${employee.firstName?.[0] || ""}${employee.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div className="card card-hover flex h-full flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            {initials}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-slate-500">{employee.position}</p>
          </div>
        </div>
        {!employee.isDeleted && (
          <div className="flex gap-2">
            <button
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
              onClick={() => onEdit?.(employee)}
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-rose-600"
              onClick={handleDelete}
            >
              <Trash2Icon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="badge bg-slate-100 text-slate-700">
          {employee.department || "Remote"}
        </span>
        {employee.isDeleted && <span className="badge badge-danger">DELETED</span>}
      </div>

      <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <div className="flex items-center justify-between gap-3">
          <span>Email</span>
          <span className="font-medium text-slate-700">{employee.email}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span>Phone</span>
          <span className="font-medium text-slate-700">{employee.phone}</span>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
