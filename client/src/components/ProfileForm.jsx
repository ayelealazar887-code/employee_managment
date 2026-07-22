import { Loader2, Save, User } from 'lucide-react'
import React, { useState } from 'react'
import api from '../api/axios'

function ProfileForm({ initialData, initailData, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const profile = initialData || initailData

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")
    const formData = new FormData(e.currentTarget)
    try {
      await api.get('/profile',formData)
      setMessage("Updated successfully")
      onSuccess?.()
    } catch (error) {
      setError(error.response?.data?.error || error?.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
          <User size={18} />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Public Profile</h2>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
          {message}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input
                disabled
                value={`${profile.firstName} ${profile.lastName}`}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                disabled
                value={profile.email}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Position</label>
            <input
              disabled
              value={profile.Position}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-600"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label className="text-sm font-medium text-slate-700">Bio</label>
          <textarea
            disabled={profile.isDeleted}
            name="bio"
            defaultValue={profile.bio || ''}
            placeholder="Write a brief bio"
            className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-slate-400"
          />
          <p className="mt-2 text-xs text-slate-500">This will be displayed on your profile.</p>
        </div>
      </div>

      {profile.isDeleted ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="font-medium text-slate-900">Account Deactivated</p>
          <p className="mt-1 text-sm text-slate-500">You can no longer update your profile.</p>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Changes
          </button>
        </div>
      )}
    </form>
  )
}

export default ProfileForm
