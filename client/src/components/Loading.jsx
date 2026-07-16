import React from 'react'

function Loading() {
  return (
    <div className="flex min-h-[90vh] items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
        <p className="text-sm font-medium text-slate-600">Loading...</p>
      </div>
    </div>
  )
}

export default Loading
