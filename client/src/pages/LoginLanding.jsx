import React from 'react'
import { ArrowRightIcon, ShieldIcon, UserIcon } from "lucide-react"
import LoginLeftSide from '../components/LoginLeftSide'
import { Link } from 'react-router-dom'

function LoginLanding() {
    const portalOptions = [
        {
            to: "/login/admin",
            title: "Admin Portal",
            description: "Manage employees, departments, payroll, and system configuration.",
            icon: ShieldIcon
        },
        {
            to: "/login/employee",
            title: "Employee Portal",
            description: "View your profile, track attendance, request time off, and access payslips.",
            icon: UserIcon
        }
    ]

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <LoginLeftSide />

            <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12 lg:px-10">
                <div className="w-full max-w-md">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-semibold text-slate-900">Welcome Back</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Select your portal to securely access the system.
                        </p>
                    </div>

                    <div className="mt-8 space-y-3">
                        {portalOptions.map((portal) => {
                            const Icon = portal.icon

                            return (
                                <Link key={portal.to} to={portal.to} className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                                <Icon size={18} />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-slate-900">{portal.title}</h3>
                                                <p className="text-sm text-slate-500">{portal.description}</p>
                                            </div>
                                        </div>
                                        <ArrowRightIcon className="text-slate-400" size={18} />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div className="mt-8 border-t border-slate-200 pt-4 text-center lg:text-left">
                        <p className="text-sm text-slate-500">
                            © {new Date().getFullYear()} PixelVerse. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginLanding
