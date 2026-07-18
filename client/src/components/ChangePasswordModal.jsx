import { Loader2, Lock, ShieldCheck, X } from 'lucide-react'
import React, { useState } from 'react'

function ChangePasswordModal({ open, onClose }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setMessage({ type: 'success', text: 'Password updated successfully.' })
    }, 600)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Change Password</h2>
              <p className="mt-1 text-sm text-slate-500">Update your account password securely</p>
            </div>
          </div>
          <button type="button" className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-5 p-6" onSubmit={handleSubmit}>
          {message.text && (
            <div className={`rounded-xl border px-4 py-3 text-sm ${message.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
              {message.text}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Current Password</label>
            <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">New Password</label>
            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary inline-flex items-center gap-2" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal
