import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, DollarSign, FileText } from 'lucide-react'

function EmployeeDashboard({ data }) {
    const employee = data?.employee;
    const cards = [
        {
            icon: CalendarDays,
            value: data?.currentMonthAttendance ?? 0,
            title: 'Days Present',
            subtitle: 'This month'
        },
        {
            icon: FileText,
            value: data?.pendingLeaves ?? 0,
            title: 'Pending Leaves',
            subtitle: 'Awaiting approval'
        },
        {
            icon: DollarSign,
            value: data?.latestPayslip?.netSalary ? `$${data.latestPayslip.netSalary.toLocaleString()}` : 'N/A',
            title: 'Latest Payslip',
            subtitle: 'Most recent payout'
        },
    ];

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200/80 bg-linear-to-br from-orange-50 via-white to-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-600">Employee Dashboard</p>
                        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Welcome, {employee?.firstName || 'there'}!</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            {employee?.position || 'Team Member'} - {employee?.department || 'No Department'}
                        </p>
                    </div>
                    <div className="rounded-xl border border-orange-100 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                        <p className="font-medium text-slate-800">Today's overview</p>
                        <p className="mt-1 text-slate-500">Stay on top of attendance, leave, and payslips.</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {cards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                        <div key={index} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{card.title}</p>
                                    <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
                                    <p className="mt-1 text-sm text-slate-500">{card.subtitle}</p>
                                </div>
                                <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                                    <Icon size={18} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Link to="/attendance" className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:bg-orange-50">
                    <div>
                        <p className="text-base font-semibold text-slate-800">Mark Attendance</p>
                        <p className="mt-1 text-sm text-slate-500">Record your attendance for today.</p>
                    </div>
                    <ArrowRight size={18} className="text-orange-600" />
                </Link>

                <Link to="/leave" className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:bg-orange-50">
                    <div>
                        <p className="text-base font-semibold text-slate-800">Apply for Leave</p>
                        <p className="mt-1 text-sm text-slate-500">Submit a leave request quickly.</p>
                    </div>
                    <ArrowRight size={18} className="text-orange-600" />
                </Link>
            </div>
        </div>
    )
}

export default EmployeeDashboard
