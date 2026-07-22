import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dummyProfileData } from '../assets/assets';
import { CalendarDays, ChevronRight, DollarSign, FileText, LayoutDashboard, Loader2, LogOut, Menu, Settings, User, Users, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

function Sidebar() {
    const { pathname } = useLocation();
    const [userName, setUserName] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

    const {user, loading, logout} = useAuth()

    const role = user?.role;
    const initials = `${userName}`
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        role === 'ADMIN'
            ? { name: 'Employees', href: '/employees', icon: Users }
            : { name: 'Attendance', href: '/attendance', icon: CalendarDays },
        { name: 'Leave', href: '/leave', icon: FileText },
        { name: 'Payslips', href: '/payslips', icon: DollarSign },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    useEffect(() => {
        api.get("profile").then(({data})=>{
            if(data.firstName) setUserName(`${data.firstName} ${data.lastName || ""}`.trim());
        })
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        logout()
        window.location.href = '/login';
    };

    const displayName = userName || 'Employee';
    const roleLabel = role === 'ADMIN' ? 'Administrator' : 'Employee';

    const sidebarContent = (
        <div className="sidebar-shell">
            <div className="sidebar-brand">
                <div className="sidebar-brand-badge rounded-3xl bg-white text-lg font-semibold text-slate-700">
                    <User size={20} />
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-700">{displayName}</p>
                    <p className="truncate text-xs text-slate-500">{roleLabel}</p>
                </div>
                <button
                    className="ml-auto rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 md:hidden"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close sidebar"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 px-4 py-4">
                {userName && (
                    <div className="sidebar-user-card">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">Signed in as</p>
                        <p className="mt-2 text-sm font-semibold text-slate-700">{userName}</p>
                        <p className="text-xs text-slate-500">{roleLabel}</p>
                    </div>
                )}

                <div className="mt-6 space-y-1">
                    {loading ? (
                        <div>
                            <Loader2 />
                            <span >Loadin...</span>
                        </div>
                    ) : (

                    
                    navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                <Icon size={18} />
                                <span>{item.name}</span>
                                {isActive && <ChevronRight size={16} className="ml-auto" />}
                            </Link>
                        );
                    }))}
                </div>
            </div>

            <div className="border-t border-slate-200 p-4">
                <button
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            <button
                className="fixed left-4 top-4 z-40 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
            >
                <Menu size={18} />
            </button>

            {mobileOpen && <div className="fixed inset-0 z-30 bg-slate-900/40 md:hidden" onClick={() => setMobileOpen(false)} />}

            <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-slate-200/80 bg-white/95 shadow-[12px_0_30px_-20px_rgba(15,23,42,0.15)] backdrop-blur md:flex">
                {sidebarContent}
            </aside>

            <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-200/80 bg-white/95 shadow-xl backdrop-blur transition-transform duration-300 md:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {sidebarContent}
            </aside>
        </>
    );
}

export default Sidebar
