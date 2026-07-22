import React, { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import { Plus, Search, XIcon } from "lucide-react";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";
import api from "../api/axios";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDpt, setSelectedDpt] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const url = selectedDpt ? `/employees?department=${selectedDpt}` :
      "/employees";
      const res = await api.get(url)
      setEmployees(res.data)
    } catch (error) {
      console.log("Failed to fetch employees")
    } finally{
      setTimeout(() => {
      setLoading(false);
    }, 600);
    }
    
  }, [selectedDpt]);

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="page-header mb-0">
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team members</p>
        </div>
        <button
          className="btn-primary inline-flex items-center gap-2 self-start"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="h-4 w-4" /> Add Employee
        </button>
      </div>

      <div className="card flex flex-col gap-4 p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            className="pl-10"
            placeholder="Search employees..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <select
          className="lg:max-w-xs"
          value={selectedDpt}
          onChange={(e) => setSelectedDpt(e.target.value)}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((deptName) => (
            <option key={deptName} value={deptName}>
              {deptName}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="card p-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-40 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-lg font-semibold text-slate-800">No employees found</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a different search or department filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((emp) => (
                <EmployeeCard
                  key={emp.id}
                  employee={emp}
                  onDelete={fetchEmployees}
                  onEdit={(employee) => setEditEmployee(employee)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-0 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Add New Employee</h2>
                <p className="mt-1 text-sm text-slate-500">Create a user account and employee profile</p>
              </div>
              <button
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                onClick={() => setShowCreateModal(false)}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <EmployeeForm
                onSuccess={() => {
                  setShowCreateModal(false);
                  fetchEmployees();
                }}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {editEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => setEditEmployee(null)}
        >
          <div
            className="card w-full max-w-3xl max-h-[90vh] overflow-y-auto p-0 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Edit Employee</h2>
                <p className="mt-1 text-sm text-slate-500">Update employee details</p>
              </div>
              <button
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                onClick={() => setEditEmployee(null)}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <EmployeeForm
                initailData={editEmployee}
                onSuccess={() => {
                  setEditEmployee(null);
                  fetchEmployees();
                }}
                onCancel={() => setEditEmployee(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
