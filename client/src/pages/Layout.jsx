import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'

function Layout() {
  const { user, loading } = useAuth()
  if(loading)  return <Loading />
  if(!user) return <Navigate to="/login" />
  return (
    <div className='min-h-screen bg-slate-100'>
      <Sidebar />

      <main className='min-h-screen overflow-y-auto bg-slate-50 p-4 pt-16 md:ml-72 md:p-8 lg:p-10'>
        <div className='mx-auto max-w-7xl'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
