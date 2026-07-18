import React, { useEffect, useState } from 'react'
import { dummyProfileData } from '../assets/assets'
import Loading from '../components/Loading'
import { Lock } from 'lucide-react'
import ProfileForm from '../components/ProfileForm'
import ChangePasswordModal from '../components/ChangePasswordModal'

function Settings() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const fetchProfile = async () => {
    setProfile(dummyProfileData)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500">Manage your account and preferences</p>
        </div>
      </div>

      {profile && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <ProfileForm initialData={profile} onSuccess={fetchProfile} />
        </div>
      )}

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
              <Lock size={18} />
            </div>
            <div>
              <p className="font-medium text-slate-900">Password</p>
              <p className="text-sm text-slate-500">Update your account password</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Change
          </button>
        </div>
      </div>
      <ChangePasswordModal open={showPasswordModal} onClose={()=>setShowPasswordModal(false)} />
    </div>
  )
}

export default Settings
