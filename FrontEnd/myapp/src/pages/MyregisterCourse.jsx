import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router'
import { getMyCourses } from '../Services/studentServices'

function MyregisterCourse() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        const token = localStorage.getItem('token')
        const result = await getMyCourses(token)
        console.log('result is ', result.data);
        if (result.status === 'success') {
            setCourses(result.data)
        }

    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* HEADER SECTION */}
            <header className="bg-slate-900 py-12 px-6 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
                        Your Learning Dashboard
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Welcome back! You are currently enrolled in {courses.length} courses.
                    </p>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-6 -mt-8 pb-20">
                {courses.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-xl p-20 text-center border border-slate-100">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-bold text-slate-800">No courses found</h3>
                        <p className="text-slate-500 mt-2 mb-8">You haven't registered for any courses yet.</p>
                        <button
                            onClick={() => navigate('/home')}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                        >
                            Browse Available Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <div
                                key={course.course_id}
                                className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col"
                            >
                                {/* CARD HEADER ACCENT */}
                                <div className="h-2 bg-gradient-to-r from-blue-500 to-sky-400"></div>

                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-blue-50 p-4 rounded-2xl text-4xl">
                                            📘
                                        </div>
                                        <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            Active
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                        {course.course_name}
                                    </h3>

                                    <p className="text-sm text-slate-500 mb-6">
                                        Continue where you left off and complete your certification.
                                    </p>

                                    {/* DUMMY PROGRESS BAR FOR UI LOOK */}
                                    <div className="w-full bg-slate-100 h-2 rounded-full mb-8">
                                        <div className="bg-blue-600 h-2 rounded-full w-1/6"></div>
                                        <div className="flex justify-between mt-2">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Progress</span>
                                            <span className="text-[10px] font-bold text-blue-600 uppercase">Started</span>
                                        </div>
                                    </div>

                  // Change the navigation to pass the course_id to a new route
                                    // Inside MyregisterCourse.jsx
                                    // Inside MyregisterCourse.jsx
                                    <button
                                        onClick={() => navigate(`/course-content/${course.course_id}`, { state: { name: course.course_name } })}
                                        className="..."
                                    >
                                        Watch Videos
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )


}
export default MyregisterCourse