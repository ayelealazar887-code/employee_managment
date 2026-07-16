import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function Layout() {
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
