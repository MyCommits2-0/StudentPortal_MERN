import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { registerToCourse, getCourseInfo } from '../Services/studentServices'
import { toast } from 'react-toastify'
import Navbar from '../component/Navbar'

export default function Register() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [mobileNo, SetMobileNo] = useState('')

    useEffect(() => {
        getCourse()
    }, [id])

    const getCourse = async () => {
        const result = await getCourseInfo(id)
        if (result.status === 'success') {
            setCourse(result.data[0])
        }
    }

    const register = async (e) => {
        e.preventDefault()
        if (!name.trim()) return toast.warn('Name is required')
        if (!email.trim()) return toast.warn('Email is required')
        if (!mobileNo.trim()) return toast.warn('Mobile Num is required')

        const result = await registerToCourse(name, email, id, mobileNo)
        console.log(result);
        if (result.status == 'success') {
            toast.success('Registration Successful')
            navigate('/MyregisterCourse')
        } else {
            toast.error('user already exists')
        }

    }
        if (!course) return null;


    return (
         <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          
          {/* LEFT PANEL: COURSE SUMMARY */}
          <div className="md:w-1/3 bg-slate-900 p-8 text-white flex flex-col justify-between">
            <div>
              <span className="text-sky-400 font-bold text-xs uppercase tracking-widest">Enrollment Details</span>
              <h2 className="text-2xl font-bold mt-2 mb-6">{course.course_name}</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-slate-400 text-sm">Course Fee</span>
                  <span className="text-xl font-bold text-emerald-400">₹{course.fees}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-slate-400 text-sm">Validity</span>
                  <span className="text-sm font-medium">{course.video_expire_days} Days Access</span>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-slate-800 rounded-2xl border border-slate-700">
              <p className="text-xs text-slate-400 leading-relaxed italic">
                * By registering, you get immediate access to all course materials and video lectures starting from the commencement date.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: REGISTRATION FORM */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Student Information</h3>
            <p className="text-slate-500 mb-8 text-sm">Please fill in your details to secure your seat.</p>

            <form onSubmit={register} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="+91 00000 00000"
                  onChange={(e) => SetMobileNo(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 focus:outline-none transition-all"
                />
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl
                           shadow-lg shadow-blue-100 transition-all active:scale-[0.98]
                           flex items-center justify-center gap-2"
                >
                  Complete Registration
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <p className="text-center text-slate-400 text-xs mt-4">
                  Secure Payment Processing • Instant Activation
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
    );
}