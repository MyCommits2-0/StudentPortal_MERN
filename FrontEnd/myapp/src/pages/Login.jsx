import React, { usecontext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../Services/userServices'
import { LoginContext } from '../App'
import { Navbar } from '../component/Navbar'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { setLoginStatus } = usecontext(LoginContext)

    const signin = async (e) => {
        e.preventDefault()

        if (email.trim() == '') {
            toast.warn('Email must be entered')
        } else if (password.trim() == '') {
            toast.warn('password must be entered')
        } else {
            const result = await loginUser(email, password)
            if (result.status === 'success') {
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('email', result.data.email)
                setLoginStatus(true)
                toast.success('login successfull bro')
                console.log('logge in user role', result.data.role);
                (result.data.role == 'admin') ? navigate('/AdminHome') : navigate('/home')
            } else {
                toast.error('Invalid Credentials')
            }
        }
    };

    return (

        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* CARD CONTAINER */}
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

                        {/* TOP ACCENT BAR */}
                        <div className="h-2 bg-gradient-to-r from-blue-600 to-sky-400"></div>

                        <div className="p-8 md:p-10">
                            {/* HEADER */}
                            <div className="mb-10">
                                <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                    Welcome Back
                                </h3>
                                <p className="text-slate-500 mt-2 font-medium">
                                    Sign in to continue your learning journey
                                </p>
                            </div>

                            <form onSubmit={signin} className="space-y-6">
                                {/* EMAIL FIELD */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </span>
                                        <input
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* PASSWORD FIELD */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </span>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* SIGN IN BUTTON */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl
                                                 shadow-lg shadow-slate-200 transition-all duration-300 active:scale-[0.98]
                                                 flex items-center justify-center gap-2"
                                    >
                                        Sign In to Portal
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                    </button>
                                </div>
                            </form>

                            {/* FOOTER */}
                            <div className="text-center mt-8">
                                <p className="text-slate-500 text-sm">
                                    Forgot your password?
                                    <button
                                        onClick={() => navigate('/ResetPassword')}
                                        className="text-blue-600 font-bold ml-1 hover:underline decoration-2 cursor-pointer bg-transparent border-none p-0"
                                    >
                                        Reset here
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* HELP TEXT */}
                    <p className="text-center mt-8 text-slate-400 text-xs">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );

};

export default LoginForm;