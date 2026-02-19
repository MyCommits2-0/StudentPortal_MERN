import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar'
import { getAllActiveCourses } from '../Services/userServices'

export default function Home() {
    const navigate = useNavigate()
    const [ courses, setCourses ] = useState([])


    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        const result = await getAllActiveCourses()
        if(result.status === 'success') {
            setCourses(result.data)
        }
    };

      const courseImages = {
    "MERN": "https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png",
    "Artificial Intellegence": "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    "Android Development": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg",
    "Python Programming": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    "Java Programming": "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    "Web Development": "https://cdn-icons-png.flaticon.com/512/2210/2210153.png"
  };

  return (
     <div className="min-h-screen bg-slate-50" >
      <Navbar />

      {/* HERO SECTION */}
      <header className="bg-gradient-to-r from-sky-600 to-blue-800 py-16 px-6 text-center text-white" >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Future of Tech
        </h1>
        <p className="text-lg text-sky-100 max-w-2xl mx-auto">
          Explore our industry-standard courses designed to take you from beginner to pro.
        </p>
      </header>

      {/* MAIN CONTENT */}
      < main className="max-w-7xl mx-auto px-6 -mt-10 pb-20" >

        {/* SECTION HEADER */}
        <div div className="flex items-center justify-between mb-8 bg-white p-6 rounded-2xl shadow-sm" >
          <h2 className="text-2xl font-bold text-gray-800">
            Available Courses <span className="text-blue-600">({courses.length})</span>
          </h2>
          <div className="hidden md:block text-sm text-gray-500">
            Showing all active enrollments for 2025
          </div>
        </div >

        {/* COURSES GRID */}
        {
          courses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-inner">
              <p className="text-xl text-gray-400 font-medium">No courses available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.course_id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                >
                  {/* IMAGE CONTAINER */}
                  {/* Inside courses.map((course) => ( ... */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      // Use the mapping object. If the name isn't found, show a default placeholder
                      src={courseImages[course.course_name] || "https://cdn-icons-png.flaticon.com/512/2436/2436636.png"}
                      alt={course.course_name}
                      className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Live Now
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.course_name}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Starts: {new Date(course.start_date).toLocaleDateString("en-GB")}</span>
                    </div>

                    {/* ACTION */}
                    <div className="mt-auto">
                      <button
                        onClick={() => navigate(`/courses/${course.course_id}`)}
                        className="w-full py-3 px-6 rounded-xl bg-gray-900 text-white font-bold 
                                 hover:bg-blue-600 active:scale-95 transition-all duration-200 
                                 flex items-center justify-center gap-2 group/btn"
                      >
                        View Course Details
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </main >
    </div >
  );
}

