import React, { useState } from 'react'
import LoginLeftSide from './LoginLeftSide'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

function LoginForm({ role, title, subtitle }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await login(email, password, role)
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "Login failed")
        } finally { setTimeout(() => {
            setLoading(false)
        }, 600)}
       
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <LoginLeftSide />

            <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-12 lg:px-10">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-orange-600">
                        <ArrowLeftIcon size={16} />
                        Back to Portals
                    </Link>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
                        <p className="text-sm text-slate-600">{subtitle}</p>
                    </div>

                    {error && (
                        <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="gordon@example.com"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? 'Signing in...' : `Sign in as ${role}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
