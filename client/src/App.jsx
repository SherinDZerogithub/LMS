
import { Route, Routes, useMatch } from 'react-router-dom'
import './App.css'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CourseDetailsPage from './pages/student/CourseDetailsPage'
import MyEnrollments from './pages/student/MyEnrollments'
import Player from './pages/student/Player'
import Loading from './components/student/Loading'

import './index.css'; // or './App.css' if that's where Tailwind is declared
import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import MyCourses from './pages/educator/MyCourses'
import AddCourse from './pages/educator/AddCourse'
import StudentEnrolled from './pages/educator/StudentEnrolled'
import Navbar from './components/student/Navbar'
import "quill/dist/quill.snow.css";
//return the routes inside div
function App() {
 

  //hide the student navbar from the educator
  const isEducator = useMatch('/educator/*');
  return (
    <div className='text-default min-h-screen bg-white'>
      {/* if the rout is not educator then we can see the studetnt navbar */}
      
      {!isEducator && <Navbar/>}
      
      <Routes>
        
        <Route path='/' element= {<Home/> } />
        <Route path='/course-list' element= {<CoursesList/> } />
        <Route path='/course-list/:input' element= {<CoursesList/> } />
        <Route path='/course/:id' element= {<CourseDetailsPage/> } />
        <Route path='/myenrollments' element= {<MyEnrollments/> } />
        <Route path='/player/:courseId' element={<Player/> } />

        <Route path='/loading/:path' element= {<Loading/> } />
       {/* Educator Routes */}
       <Route path="/educator" element={<Educator/>}>
          <Route index element={<Dashboard/>} /> {/* Default route for /educator */}
          <Route path="mycourses" element={<MyCourses/>} />
          <Route path="add-courses" element={<AddCourse/>} />
          <Route path="student-enrolled" element={<StudentEnrolled/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
