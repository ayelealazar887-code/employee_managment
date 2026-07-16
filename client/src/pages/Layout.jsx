import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      {/* Sidebar - fixed width */}
      <aside className='w-64 flex-shrink-0 border-r border-gray-200 p-4'>
        <p>Sidebar</p>
      </aside>
      
      {/* Main Content Area */}
      <main className='flex-1 h-full overflow-y-auto bg-gray-50 p-6'>
        <div className='max-w-7xl mx-auto'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout
