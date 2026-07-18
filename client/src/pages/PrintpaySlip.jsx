import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Printer, Receipt } from 'lucide-react'
import { dummyPayslipData } from '../assets/assets'
import Loading from '../components/Loading'

function PrintpaySlip() {
  const { id } = useParams()
  const [payslip, setPayslip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPayslip(dummyPayslipData.find((slip) => slip._id === id))
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) return <Loading />
  if (!payslip) return <p className="p-6 text-sm text-slate-500">Payslip not found</p>

  const period = format(new Date(payslip.year, payslip.month - 1), 'MMMM yyyy')

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600">
              <Receipt className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Payslip</h1>
              <p className="mt-1 text-sm text-slate-500">{period}</p>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary print:hidden inline-flex items-center gap-2 self-start"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" />
            Print Payslip
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Employee Name</p>
            <p className="mt-1 font-semibold text-slate-900">{payslip.employee?.firstName} {payslip.employee?.lastName}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Position</p>
            <p className="mt-1 font-semibold text-slate-900">{payslip.employee?.position || payslip.employee?.Position}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="mt-1 font-semibold text-slate-900">{payslip.employee?.email}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Period</p>
            <p className="mt-1 font-semibold text-slate-900">{period}</p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
          <table className="table-modern w-full">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic Salary</td>
                <td>${payslip.basicSalary?.toLocaleString() || '0'}</td>
              </tr>
              <tr>
                <td>Allowances</td>
                <td>${payslip.allowances?.toLocaleString() || '0'}</td>
              </tr>
              <tr>
                <td>Deductions</td>
                <td>${payslip.deductions?.toLocaleString() || '0'}</td>
              </tr>
              <tr>
                <td className="font-semibold text-slate-900">Net Salary</td>
                <td className="font-semibold text-slate-900">${payslip.netSalary?.toLocaleString() || '0'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
          <p className="font-medium">Payment summary</p>
          <p className="mt-1">This payslip is ready to print or share with the employee.</p>
        </div>
      </div>
    </div>
  )
}

export default PrintpaySlip
