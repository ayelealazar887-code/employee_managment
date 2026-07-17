import React, { useEffect, useState } from 'react'
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from '../assets/assets';
import Loading from '../components/Loading';
import EmployeeDashboard from '../components/EmployeeDashboard';
import AdminDashboard from '../components/AdminDashboard';

function Dashboard() {
  const [ data, setData ] = useState(null);
   const [ loading, setLoading ] = useState(true);

   useEffect(() => {
    setData(dummyAdminDashboardData);
    setTimeout(() => {
      setLoading(false)
    },1000)
   },[])

   if(loading) return <Loading />
   if(!data) return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm">
      <p className="text-lg font-semibold text-slate-800">Failed to load dashboard</p>
      <p className="mt-2 text-sm text-slate-500">Please refresh the page and try again.</p>
    </div>
   )
   if(data.role === "ADMIN") {
    return <AdminDashboard data={data} />
   } else {
    return <EmployeeDashboard data={data} />
   }
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
      <p className="text-lg font-semibold text-slate-800">Dashboard</p>
      <p className="mt-2 text-sm text-slate-500">No dashboard data available.</p>
    </div>
  )
}

export default Dashboard
