import React from 'react'

function LoginLeftSide() {
  return (
    <div className="min-h-screen w-full lg:w-[45%] bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 text-white flex items-center justify-center px-8 py-12 lg:px-12">
      <div className="max-w-md text-center lg:text-left">
        <div className="mb-6 flex justify-center lg:justify-start">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur-sm shadow-lg shadow-orange-900/20">
            <span className="text-2xl font-semibold">E</span>
          </div>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Employee Management System</h1>
        <p className="mt-3 text-sm sm:text-base text-orange-50/90">
          Manage employees, attendance, leaves, and payroll from one secure platform.
        </p>
      </div>
    </div>
  )
}

export default LoginLeftSide
